import * as Joi from 'joi';
import { object } from 'joi';
export class CreateAccountDto {
  readonly fName: string;
  readonly lName: string;
  readonly email: string;
  readonly phone: number;
  readonly code: string;
}

export const CreateAccountSchema = Joi.object({
  fName: Joi.string().required(),
  lName: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.number().required(),
  code: Joi.number().required(),
});
