export abstract class AbstractClass {
  abstract print(): void;
}

export class DevImplAbstractClass implements AbstractClass {
  print(): void {
    console.log("It's a dev class implementation");
  }
}

export class ProdImplAbstractClass implements AbstractClass {
  print(): void {
    console.log("It's a prod class implementation");
  }
}
