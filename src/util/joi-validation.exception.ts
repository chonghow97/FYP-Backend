import { HttpException, HttpStatus } from '@nestjs/common';
import * as Joi from 'joi';

export class JoiValidationException extends HttpException {
  constructor(error: Joi.ValidationError) {
    super(error, HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
