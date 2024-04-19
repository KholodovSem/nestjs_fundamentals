import { IsNumber, IsOptional, IsPositive } from "class-validator";
import { Transform } from "class-transformer";

export class PaginationQueryDTO {
  @Transform((value) => parseInt(value.value))
  @IsOptional()
  @IsNumber()
  @IsPositive()
  limit?: number;

  @Transform((value) => parseInt(value.value))
  @IsOptional()
  @IsNumber()
  @IsPositive()
  offset?: number;
}
