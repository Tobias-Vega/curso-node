

export class CreateProductDto {

  private constructor(
    public readonly name: string,
    public readonly available: boolean,
    public readonly price: number,
    public readonly description: string,
    public readonly user: string,
    public readonly category: string,
  ) {}

  static create(object: { [key:string]: any }): [string?, CreateProductDto?] {

    const { name, available, price, description, user, category } = object;

    let availableBoolean;

    if (!name) return ['Missing name'];
    if (!user) return ['Missing name'];
    if (!category) return ['Missing name'];

    return [undefined, new CreateProductDto(name, !!available, price, description, user, category)];

  }


}