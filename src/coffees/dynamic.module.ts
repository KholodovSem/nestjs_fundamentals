import { DynamicModule, Module, Global } from "@nestjs/common";
import { ConfigService } from "./config.service";

/* 
    We can create dynamic modules for our application.
    it means that we can use some arguments in runtime.
*/

//* For dynamic modules we can define methods:
//* "register" or "forRoot" by convention

/* 
  !Nest, however, encapsulates providers inside the module scope.
  !You aren't able to use a module's providers elsewhere without
  !first importing the encapsulating module.

  !When you want to provide a set of providers which should be available
  !everywhere out-of-the-box (e.g., helpers, database connections, etc.),
  !make the module global with the @Global() decorator.
*/

@Global()
@Module({})
export class ConfigModule {
  static forRoot(options: any): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: "CONFIG_OPTIONS",
          useValue: options
        },
        ConfigService
      ],
      exports: [ConfigService]
    };
  }
}
