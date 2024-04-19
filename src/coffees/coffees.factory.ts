import { FactoryProvider, Injectable } from "@nestjs/common";

interface ExpectedConfig {
  isDev: boolean;
  other: string;
}

@Injectable()
export class ConfigProvider {
  getConfig(): ExpectedConfig {
    return {
      isDev: true,
      other: "Bomb!"
    };
  }
}

// ----

export class TestFactoryClass {
  constructor(private config: ExpectedConfig) {}

  log() {
    this.config.isDev
      ? console.log(this.config.other)
      : console.log("Nothing...");
  }
}

export const testProvider: FactoryProvider = {
  provide: "test_provider",
  useFactory(configProvider: ConfigProvider) {
    const config = configProvider.getConfig();

    return new TestFactoryClass(config);
  },
  inject: [ConfigProvider]
};
