import { IsEmail, IsNotEmpty, IsObject, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email format' })
  email!: string;

  @IsObject({ message: 'Marketing data must be an object' })
  readonly marketingData!: object;
}
