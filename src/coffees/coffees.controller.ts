import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  SetMetadata,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDTO } from './dto/create-coffee.dto';
import { UpdateCoffeeDTO } from './dto/update-coffee.dto';
import { PaginationQueryDTO } from '../common/dtos/pagination-query.dto';
import { CustomPipe } from '../common/pipes/custom.pipe';
import { Roles } from '../common/decorators/roles.decorator';
import { RoleGuard } from '../common/guards/role.guard';
import { CustomInterceptor } from '../common/interceptors/custom.interceptor';
import { GetUser } from '../common/decorators/param.decorator';
import { Public } from '../common/decorators/public.decorator';
import { Protocol } from '../common/decorators/protocol.decorator';
import { ApiTags } from '@nestjs/swagger';

//* Link: https://docs.nestjs.com/controllers

/* 
    *Promises
    Technically, NestJS handle promises automatically.
    But if method returns a promise, good practice is 
    mark it as async.
*/
@ApiTags('coffees')
@Controller('coffees')
@UseInterceptors(CustomInterceptor)
@UsePipes(CustomPipe)
export class CoffeesController {
  constructor(private readonly coffeeService: CoffeesService) {}

  @Get()
  @Public()
  @Roles('user')
  @UseGuards(RoleGuard)
  findAll(
    @Query() pagination: PaginationQueryDTO,
    @Protocol() protocol: unknown,
  ) {
    return this.coffeeService.findAll(pagination);
  }

  @Get(':id')
  @UsePipes(CustomPipe)
  @Public()
  findOne(@Param('id') id: number, @GetUser() user: any) {
    return this.coffeeService.findOne(id);
  }

  @Post()
  createOne(@Body() createCoffeeDTO: CreateCoffeeDTO) {
    return this.coffeeService.create(createCoffeeDTO);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCoffeeDTO: UpdateCoffeeDTO) {
    return this.coffeeService.update(id, updateCoffeeDTO);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.coffeeService.delete(id);
  }
}
