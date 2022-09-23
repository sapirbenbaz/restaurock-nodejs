import { IsString } from 'class-validator';

export class CreateRestaurantDto {
  @IsString()
  name: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  address: string;

  @IsString()
  city: string;

  @IsString()
  website: string;
}
