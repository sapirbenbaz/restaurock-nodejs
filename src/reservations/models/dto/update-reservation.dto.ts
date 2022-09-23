import { IsBoolean, IsDate, IsEmail, IsNumber, IsUUID } from 'class-validator';

export class UpdateReservationDto {
  @IsUUID()
  reservationId: string;

  @IsBoolean()
  isTaken: boolean;

  @IsEmail()
  takerEmail: string;

  @IsNumber()
  numberOfGuests: number;

  @IsDate()
  date: Date;
}
