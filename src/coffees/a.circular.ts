import { Inject, Injectable, forwardRef } from "@nestjs/common";
import { BService } from "./b.circular";

/* 
    * Circular dependencies

    !Circular dependencies types: 
     - Circular file imports (Where a.ts import b.ts which imports a.ts)
     - Circular module imports (Where "FooModule" imports "BarModule")
     - Circular constructors (Where "FooService" injects "BarService" which injects "FooService")

    !Barrel files aka index.ts is very common case.

    * Madge is useful package that visualize module dependencies. "pnpm add -d madge"

    * Way to resolve module circular dependencies is inject forwardRef:
        class A {
          constructor(@Inject(forwardRef(() => B)) private readonly b:B)
        }

        class B {
          constructor(@Inject(forwardRef(() => A)) private readonly a:A)
        }
*/

@Injectable()
export class AService {
  constructor(
    @Inject(forwardRef(() => BService)) private readonly bService: BService
  ) {}
}
