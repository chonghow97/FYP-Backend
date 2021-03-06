import { Injectable, PipeTransform, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class FilePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return value[0];
  }
}
