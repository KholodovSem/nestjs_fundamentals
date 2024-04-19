import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CoffeesModule } from './coffees/coffees.module';

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
    CoffeesModule,
  ],
})
export class AppModule {}

/* 
  Module providers allowed types: [Provider1, Provider2] or [{opts}, {opts}]
  Where opts - more complex and more complete provider defining 
*/
