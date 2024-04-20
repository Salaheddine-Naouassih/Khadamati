import { NextFunction, Request, Response } from "express";
import * as Joi from "joi";

const joiBodyValidator = (schema: Joi.ObjectSchema<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");
      console.log("error", message);
      res.status(404).json({ error: message });
    }
  };
};

const joiSignupSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const joiLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const joiBuisnessUserSchema = Joi.object({
  contactNumber: Joi.string().required(),
  address: Joi.string().required(),
});

const joiServiceSchema = Joi.object({
  name: Joi.string().min(6).required(),
  description: Joi.string().min(12).required(),
  price: Joi.number(),
  city_id: Joi.number().required(),
});
const joiRefreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required(),
});
export {
  joiBodyValidator,
  joiSignupSchema,
  joiLoginSchema,
  joiRefreshTokenSchema,
  joiServiceSchema,
  joiBuisnessUserSchema,
};
