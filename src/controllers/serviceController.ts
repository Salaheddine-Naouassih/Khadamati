import { Response, Request } from "express";
import { Repository } from "typeorm";
import { Service } from "../entity/Service";

export class ServiceController {
  constructor(private serviceRepository: Repository<Service>) {
    this.serviceRepository = serviceRepository;
  }

  async createService(req: Request, res: Response) {
    const { name, description, price, city_id } = req.body;
    const serviceExists = await this.serviceRepository.findOne({
      where: { name },
    });
    if (serviceExists)
      return res.status(400).json({ message: "Service already exists" });
    const service = this.serviceRepository.create({
      name,
      description,
      price,
      city_id,
    });
    await this.serviceRepository.save(service);

    res.json({
      message: "Service created",
    });
  }

  async updateService(req: Request, res: Response) {
    const { id, name, description, price, city_id } = req.body;
    const service = await this.serviceRepository.findOne({ where: { id } });
    if (!service) return res.status(400).json({ message: "Service not found" });
    service.name = name;
    service.description = description;
    service.price = price;
    service.city_id = city_id;
    await this.serviceRepository.save(service);
  }

  async getService(req: Request, res: Response) {
    const name = String(req.query.name);
    const city_id = req.query.number;
    const services = await this.serviceRepository.find({
      where: { name: name, city_id: city_id as unknown as number },
    });
    res.json(services);
  }
}
