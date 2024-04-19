import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query
} from "@nestjs/common";
import { CoffeesService } from "./coffees.service";
import { CreateCoffeeDTO } from "./dto/create-coffee.dto";
import { UpdateCoffeeDTO } from "./dto/update-coffee.dto";
import { PaginationQueryDTO } from "../common/dtos/pagination-query.dto";

//* Link: https://docs.nestjs.com/controllers

/* 
    *Promises
    Technically, NestJS handle promises automatically.
    But if method returns a promise, good practice is 
    mark it as async.
*/

@Controller("coffees")
export class CoffeesController {
  constructor(private readonly coffeeService: CoffeesService) {}

  @Get()
  findAll(@Query() pagination: PaginationQueryDTO) {
    return this.coffeeService.findAll(pagination);
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.coffeeService.findOne(id);
  }

  @Post()
  createOne(@Body() createCoffeeDTO: CreateCoffeeDTO) {
    return this.coffeeService.create(createCoffeeDTO);
  }

  @Patch(":id")
  update(@Param("id") id: number, @Body() updateCoffeeDTO: UpdateCoffeeDTO) {
    return this.coffeeService.update(id, updateCoffeeDTO);
  }

  @Delete(":id")
  delete(@Param("id") id: number) {
    return this.coffeeService.delete(id);
  }
}
