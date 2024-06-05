import Joi from "joi";

export const urlSchema = Joi.object({
  longUrl: Joi.string().uri().required(),
});
