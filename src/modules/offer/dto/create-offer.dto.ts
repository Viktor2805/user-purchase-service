import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateOfferDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsInt()
  @IsNotEmpty()
  price!: number;
}
