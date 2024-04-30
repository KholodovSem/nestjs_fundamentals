import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE, APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CoffeesModule } from './coffees/coffees.module';

import { CommonModule } from './common/common.module';
import { MongooseModule } from '@nestjs/mongoose';

/* 
  * Config validation

  Config module accept validation schema 
  that "Joi" lib can provide

    validationSchema: Joi.object(
    {
      DATABASE_NAME: Joi.string().default('nest_fundamentals'),
      DATABASE_PORT: Joi.number().default(5432),
      DATABASE_USERNAME: Joi.string().default('admin'),
      DATABASE_PASSWORD: Joi.string().default('root'),
      DATABASE_HOST: Joi.string().default('localhost')
    }
    ),
*/

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [CoffeesModule],
      useFactory() {
        return {
          type: 'postgres',
          host: process.env.DATABASE_HOST,
          port: parseInt(process.env.DATABASE_PORT || ''),
          username: process.env.DATABASE_USERNAME,
          password: process.env.DATABASE_PASSWORD,
          database: process.env.DATABASE_NAME,
          autoLoadEntities: true,
          synchronize: true,
        };
      },
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/nest-course'),
    CommonModule,
    CoffeesModule,
  ],
  /* 
    * Register global: 
        - Pipes
        - Filters
        - Guards
        - Interceptors  

     We can register anything above globally in another manner.
     Instead app <-- NestFactory.create(rootModule).useGlobal[Someone](...);
     
     We can provide it in root module.

     Nest provide tokens for it: 
      - APP_FILTER 
      - APP_GUARD
      - APP_PIPE
      - APP_INTERCEPTOR

     Here's example:
  */
  providers: [
    {
      provide: APP_PIPE,
      useFactory() {
        return new ValidationPipe({
          whitelist: true,
          transform: true,
        });
      },
    },
  ],
})
export class AppModule {}

/* 
  Module providers allowed types: [Provider1, Provider2] or [{opts}, {opts}]
  Where opts - more complex and more complete provider defining 
*/
