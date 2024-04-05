import * as Joi from 'joi';
export default () => ({
  NODE_ENV: Joi.string().required().valid('development', 'production', 'test', 'provision').default('development'),
  PORT: Joi.number().port().required().default(5000),
  DATABASE_URL: Joi.string().required().default('mongodb://localhost:27017/Xplore'),
  E_AUTH_URI: Joi.string().required().default('http://localhost:3000'),
  VC_URL: Joi.string().required().default('http://localhost:4000'),
  USER_SERVICE_URL: Joi.string().required().default('http://localhost:6000'),
});
