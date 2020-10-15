import * as Joi from 'joi';
export class CreateAccountDto {
  readonly fName: string;
  readonly lName: string;
  readonly email: string;
  readonly phone: number;
  readonly code: string;
  password: string;
}

export const CreateAccountSchema = Joi.object({
  fName: Joi.string()
    .required()
    .max(30),
  lName: Joi.string()
    .required()
    .max(30),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  password: Joi.string().required().min(8),
});
