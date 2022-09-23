import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateReservationDto {
  @IsString()
  giverEmail: string;

  @IsString()
  restaurantId: string;

  @IsString()
  nameOnReservation: string;

  @IsBoolean()
  isTaken: boolean;

  @IsNumber()
  @Min(1)
  @Max(20)
  numberOfGuests: number;

  @IsDate()
  date: Date;

  @IsString()
  comments: string;
}
