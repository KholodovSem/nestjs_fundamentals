import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';

import { DataSource, Repository } from 'typeorm';

import { Coffee } from './entity/coffee.entity';
import { Flavor } from './entity/flavor.entity';
import { CreateCoffeeDTO } from './dto/create-coffee.dto';
import { UpdateCoffeeDTO } from './dto/update-coffee.dto';
import { PaginationQueryDTO } from '../common/dtos/pagination-query.dto';
import { Event } from '../events/entity/event.entity';
import { COFFEE_BRANDS_MARK } from './coffees.constants';
import { AbstractClass } from './coffees.abstract';
import { TestFactoryClass } from './coffees.factory';
import coffeesConfig from './config/coffees.config';

//* Link: https://docs.nestjs.com/providers

//* One of the provider's representatives

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
    private readonly dataSource: DataSource,
    @Inject(COFFEE_BRANDS_MARK) private readonly famousBrands: string[],
    private readonly abstractClass: AbstractClass,
    @Inject('test_provider') private readonly testProvider: TestFactoryClass,

    // We can pass partial configuration (coffees configuration) directly, with types of
    @Inject(coffeesConfig.KEY)
    private readonly coffeesConfiguration: ConfigType<typeof coffeesConfig>,
  ) {}

  findAll(pagination: PaginationQueryDTO) {
    console.log('Constant value: ', this.famousBrands);
    console.log('Abstract class: ');
    this.abstractClass.print();
    this.testProvider.log();

    console.log(this.coffeesConfiguration.foo);

    const { limit, offset } = pagination;

    return this.coffeeRepository.find({
      relations: { flavors: true },
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: number) {
    const coffee = await this.coffeeRepository.findOne({
      relations: { flavors: true },
      where: {
        id,
      },
    });

    if (!coffee) {
      throw new NotFoundException(`Coffee with id:${id} not found!`);
    }

    return coffee;
  }

  async create(createCoffeeDto: CreateCoffeeDTO) {
    const flavors: Flavor[] = await Promise.all(
      createCoffeeDto.flavors.map((flavorName) =>
        this.preloadFlavorByName(flavorName),
      ),
    );

    const coffee = this.coffeeRepository.create({
      ...createCoffeeDto,
      flavors,
    });

    return this.coffeeRepository.save(coffee);
  }

  async update(id: number, updateCoffeeDto: UpdateCoffeeDTO) {
    const flavors =
      updateCoffeeDto.flavors &&
      (await Promise.all(
        updateCoffeeDto.flavors.map((flavorName) =>
          this.preloadFlavorByName(flavorName),
        ),
      ));

    const coffee = await this.coffeeRepository.preload({
      id,
      ...updateCoffeeDto,
      flavors,
    });

    if (!coffee) {
      throw new NotFoundException(`Coffee with id:${id} not found!`);
    }

    return this.coffeeRepository.save(coffee);
  }

  async delete(id: number) {
    const coffee = await this.coffeeRepository.findOne({
      where: {
        id,
      },
    });

    if (!coffee) {
      throw new NotFoundException(`Coffee with id:${id} not found!`);
    }

    return this.coffeeRepository.delete({ id });
  }

  async recommendCoffee(coffee: Coffee) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      coffee.recommendations += 1;

      const recommendationEvent = new Event();
      recommendationEvent.name = 'recommend_coffee';
      recommendationEvent.type = 'coffee';
      recommendationEvent.payload = { coffeeId: coffee.id };

      await queryRunner.manager.save(coffee);
      await queryRunner.manager.save(recommendationEvent);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      // Close query runner connection
      await queryRunner.release();
    }
  }

  private async preloadFlavorByName(name: string): Promise<Flavor> {
    const flavor = await this.flavorRepository.findOne({ where: { name } });

    if (flavor) {
      return flavor;
    }

    return this.flavorRepository.create({ name: name });
  }
}

/* 
    *TypeORM: DataSource | EntityManager | QueryRunner

    DataSource - representing connection to database
  
    QueryRunner - is an object that provide opportunity to execute raw SQL queries or
    manage transactions programmatically. 

    EntityManager - is an object responsible for managing entities (tables).
    Provides methods (CRUD)
*/

/* 
    *Database indexing


*/

/* 
    *ACID (Atomicity, consistency, isolation, durability)
    Атомарность, Согласованость, Изоляция, Устойчивость

    --------------------------------------

    *ROLLBACK
    Оператор языка SQL, который позволяет:

    - откатить все изменения с начала транзакции
    - очистить все точки сохранения данной транзакции
    - завершить транзакцию
    - освободить все блокировки данной транзакции

    *COMMIT
    Оператор управления транзакциями языка SQL для успешного
    завершения транзакции. При применении этого оператора 
    все изменения фиксируются в базе.

    Оба оператора явно завершают транзакцию

    --------------------------------------

    Атомарность - атомарность гарантирует, что никакая транзакция не будет
    зафиксирована в системе частично.

    Согласованость - каждая успешная транзакция по определению фиксирует только
    допустимые результаты.
    
    Изоляция - во время выполнения транзакции параллеьные транзакции не должны
    оказывать влияния на её результат.

    Устойчивость - независимо от проблем на нижних уровнях изменения, сделанные 
    в успешно завершенной транзакции, должны остаться сохранёнными после 
    возвращения системы в работу.
*/

/* 
  *Database transaction (TX)

  Unit of work.

  Allows complete different work in different rows, tables 
  in a single operation.

  !Important thing about transaction
  Our operations must succeed of fail together
  *Look at ACID above
*/
