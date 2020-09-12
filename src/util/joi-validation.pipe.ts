import { Schema } from 'joi';
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { JoiValidationException } from './joi-validation.exception';

@Injectable()
export class ValidationPipe implements PipeTransform {
  constructor(private readonly schema: Schema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value);
    if (error) {
      throw new JoiValidationException(error);
    }
    return value;
  }
}
