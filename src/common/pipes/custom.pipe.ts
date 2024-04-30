import { ArgumentMetadata, PipeTransform } from '@nestjs/common';

export class CustomPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log(`Pipe | value metadata: ${JSON.stringify(metadata)}`);
    console.log(`Pipe | value: ${value}`);
    return value;
  }
}
