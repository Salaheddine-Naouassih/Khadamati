import { Response, Request } from "express";
import { Repository } from "typeorm";
import { User, BuisnessUser } from "../entity/User";
import * as bcrypt from "bcryptjs";
import { RefreshToken } from "../entity/RefreshToken";
import * as jwt from "jsonwebtoken";
import { getConfig } from "../utils/config";
import { CustomRequest } from "../middlewares/authMiddleware";

export class UserController {
  constructor(
    private userRepository: Repository<User>,
    private refreshTokenRepository: Repository<RefreshToken>,
    private buisnessUserRepository: Repository<BuisnessUser>
  ) {
    this.userRepository = userRepository;
    this.refreshTokenRepository = refreshTokenRepository;
    this.buisnessUserRepository = buisnessUserRepository;
  }

  async register(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const userExists = await this.userRepository.findOne({ where: { email } });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });
    await this.userRepository.save(user);
    console.log(user);
    res.json({
      ...(await this.generateAuthTokens(user)),
      message: "User created",
    });
  }

  async registerBuisnsess(req: CustomRequest, res: Response) {
    const user = req.user;

    const buisnessUserExists = await this.buisnessUserRepository.findOne({
      where: { user },
    });
    if (buisnessUserExists)
      return res
        .status(400)
        .json({ message: "Account already registered as a buisness" });
    await this.buisnessUserRepository.insert({
      contactNumber: req.body.contactNumber,
      address: req.body.address,
      user,
    });
    res.json({ message: "Account registered as a buisness" });
  }

  async removeBuisness(req: CustomRequest, res: Response) {
    const id = req.user.id;
    await this.buisnessUserRepository.delete({ user: { id } });
    res.json({ message: "Buisness account removed" });
  }

  async refreshToken(req: Request, res: Response) {
    const refreshToken = req.body.refreshToken;
    if (refreshToken == null) return res.sendStatus(401);
    const tokenExists = await this.refreshTokenRepository.findOne({
      where: { token: refreshToken },
    });
    if (!tokenExists) return res.sendStatus(403);
    jwt.verify(
      refreshToken,
      getConfig().REFRESH_TOKEN_SECRET,
      (err: any, user: any) => {
        if (err) return res.sendStatus(403);
        const accessToken = jwt.sign(
          { user },
          getConfig().ACCESS_TOKEN_SECRET,
          { expiresIn: "15m" }
        );
        res.json({ accessToken: accessToken });
      }
    );
  }

  private async generateAuthTokens(user: User) {
    const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = getConfig();
    const refreshToken = jwt.sign({ user }, REFRESH_TOKEN_SECRET);
    await this.refreshTokenRepository.save({ token: refreshToken });
    const accessToken = jwt.sign({ user }, ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });
    return { accessToken, refreshToken };
  }

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: "User not found" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ message: "Invalid password" });
    res.json(await this.generateAuthTokens(user));
  }

  async logout(req: CustomRequest, res: Response) {
    const tokenExists = await this.refreshTokenRepository.findOne({
      where: { token: req.header("Authorization")?.split(" ")[1] || req.body },
    });
    if (!tokenExists) return res.sendStatus(403);
    await this.refreshTokenRepository.delete({ token: req.body.refreshToken });
    res.json({ message: "User logged out" });
  }
}
