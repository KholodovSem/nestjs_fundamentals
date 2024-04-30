import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

/* 
    DTO (Data Transfer Object)


    Используется как прослойка между двумя слоями данных.
    В нашем случае:

    Client  ----- 
                 Presentation Layer
                    DTO (Between these layers)
                 Domain Layer   
    Server  -----

    *Properties:

    * - (Transfer data between layers)
    Позволяет легко и удобно переводить данные из одного слоя,
    в другой.

    ! - (Validation) For NestJS with Validation Pipe

    * - (Not contain any business logic)
    Это просто набор данных

*/

//! Good practice
//* Mark all fields as readonly

export class CreateCoffeeDTO {
  @ApiProperty({ description: 'The name of a coffee' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'The brand of a coffee' })
  @IsString()
  readonly brand: string;

  @ApiProperty({ description: 'Flavors of a coffee', example: [] })
  @IsString({ each: true })
  readonly flavors: string[];
}

// Easy validation with Validation Pipe and "class-validator" package!
