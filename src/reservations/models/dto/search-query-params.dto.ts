import { Type } from 'class-transformer';

import {
  IsDateString,
  IsInt,
  IsOptional,
  IsUUID,
  Max,
  Min,
} from 'class-validator';
export class SearchUserQueryParams {
  @IsOptional()
  @IsUUID()
  _restaurantId?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(20)
  @Type(() => Number)
  _numberOfGuests?: number;

  @IsOptional()
  @IsDateString()
  @Type(() => Date)
  _date?: Date;
}
