import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseintPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const valueToReturn = parseInt(value, 10);

    if (Number.isNaN(valueToReturn)) {
      throw new BadRequestException(
        `Validation failed. ${valueToReturn} is not an integer`,
      );
    }

    return valueToReturn;
  }
}
