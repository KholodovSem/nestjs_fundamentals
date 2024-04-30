import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { WrapResponseInterceptor } from './common/interceptors/wrap-response.interceptor';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new WrapResponseInterceptor());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Iluvcoffee')
    .setDescription('Coffee application')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

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
