import * as Joi from 'joi';

export const validationSchema = Joi.object({
  POSTGRES_HOST:     Joi.string().required(),
  POSTGRES_PORT:     Joi.number().default(5432),
  POSTGRES_USER:     Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_DB:       Joi.string().required(),
  ANALYTICS_URL:     Joi.string().uri().required(),
  ASTROLOGY_URL:     Joi.string().uri().required(),
});
