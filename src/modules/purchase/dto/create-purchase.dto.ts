import {  IsNotEmpty, IsString } from 'class-validator';

export class CreatePurchaseDto {
  @IsString()
  @IsNotEmpty()
  userId!: string;

  @IsString()
  @IsNotEmpty()
  offerId!: string;
}
