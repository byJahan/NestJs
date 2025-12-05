export class CreateItemDto {
  name: string;
  price: number;
}

export class UpdateItemDto implements Partial<CreateItemDto> {
  name?: string;
  price?: number;
}