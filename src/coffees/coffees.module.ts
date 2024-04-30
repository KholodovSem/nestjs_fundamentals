import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CoffeesService } from './coffees.service';
import { CoffeesController } from './coffees.controller';
import { Coffee, CoffeeSchema, MCoffee } from './entity/coffee.entity';
import { Flavor } from './entity/flavor.entity';
import { Event } from '../events/entity/event.entity';
import { COFFEE_BRANDS_MARK, FAMOUS_COFFEE_BRANDS } from './coffees.constants';
import {
  AbstractClass,
  DevImplAbstractClass,
  ProdImplAbstractClass,
} from './coffees.abstract';
import { ConfigProvider, testProvider } from './coffees.factory';
import { AService } from './a.circular';
import { BService } from './b.circular';
import coffeesConfig from './config/coffees.config';
import { MongooseModule } from '@nestjs/mongoose';

const isDev = false;

//* Link: https://docs.nestjs.com/modules

@Module({
  imports: [
    TypeOrmModule.forFeature([Coffee, Flavor, Event]),
    MongooseModule.forFeature([{ name: MCoffee.name, schema: CoffeeSchema }]),
    ConfigModule.forFeature(coffeesConfig),
  ],
  providers: [
    CoffeesService,
    //* Link: https://docs.nestjs.com/fundamentals/custom-providers
    //! Be careful with circular dependencies
    //* Just create separate file for your constants, or custom class providers
    /* 
      *useValue syntax

      We can inject our custom value, for example constants
      In our service in constructor we can provide injected constant via @Inject decorator 
    */
    { provide: COFFEE_BRANDS_MARK, useValue: FAMOUS_COFFEE_BRANDS },
    // -----------------------------------------------------------------------------------
    /* 
      *useClass syntax

      We can also provide dynamic class value, using "useClass"
      *In our service constructor we can get access to our class without @Inject decorator
      *Just specify a type
    */
    {
      provide: AbstractClass,
      useClass: isDev ? DevImplAbstractClass : ProdImplAbstractClass,
    },
    /*
      *useFactory syntax

      One more approach to specify provider.
      This one allows us to use other providers in specified provider :)
      Can be simple or complex. Can return any value, just a string, array or class 

      !useFactory accept callback () =>, it can be async
      !Nest will await resolution of the promise before 
      !instantiating any class that depends on (injects)
      !such a provider
     */
    ConfigProvider,
    testProvider,
    AService,
    BService,
  ],
  controllers: [CoffeesController],
})
export class CoffeesModule {}
