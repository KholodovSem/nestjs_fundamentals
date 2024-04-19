import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class ConfigService {
  constructor(@Inject("CONFIG_OPTIONS") private readonly options: any) {}

  get(key: string): any {
    return this.options[key];
  }
}
