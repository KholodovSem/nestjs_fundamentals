import { Inject, Injectable, forwardRef } from "@nestjs/common";
import { AService } from "./a.circular";

@Injectable()
export class BService {
  constructor(
    @Inject(forwardRef(() => AService)) private readonly aService: AService
  ) {}
}
