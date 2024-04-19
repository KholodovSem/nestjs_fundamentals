import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();

/* 
    * NextJS additional building blocks:

      * - Exception filters
        Responsible for handling in processing unhandled exceptions

      * - Pipes
        Typically used for two things: 
          - Transformation
          - Validation

      * - Guards
        Used to control access to different parts of an application 
        based on certain conditions.

      * - Interceptors
        Used to modify or transform the data returned by controllers
        before sending it to the client.
*/

/* 
    Binding techniques: 

    We can bind one of things described above in three ways:

      - Globally
      - In controller
      - In method
    ! - In param (* Pipes only)
*/

//TODO: Typeorm:migration schema
//TODO: Look at @Module decorator definition
//TODO: Module provider
