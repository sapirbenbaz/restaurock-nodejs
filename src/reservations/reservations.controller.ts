import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Redirect,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './models/dto/create-reservation.dto';
import { UpdateReservationDto } from './models/dto/update-reservation.dto';
import { SearchUserQueryParams } from './models/dto/search-query-params.dto';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  async createReservation(@Body() createReservationDto: CreateReservationDto) {
    const reservationId = await this.reservationsService.createReservation(
      createReservationDto,
    );
    return { id: reservationId };
  }

  @Get()
  async getReservations(
    @Query() queryParams: SearchUserQueryParams,
  ): Promise<any> {
    const reservations = await this.reservationsService.getReservations(
      queryParams,
    );
    return reservations;
  }

  @Get(':id')
  async getReservation(@Param('id') reservationId: string) {
    const reservation =
      this.reservationsService.getSingleReservation(reservationId);
    return reservation;
  }

  @Patch(':id')
  async updateReservation(
    @Param('id') reservationId: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    await this.reservationsService.updateReservation(
      reservationId,
      updateReservationDto,
    );
    return null;
  }

  @Delete(':id')
  async deleteReservation(@Param('id') reservationId: string) {
    await this.reservationsService.deleteReservation(reservationId);
    return null;
  }

  @Get('takeaway/:id')
  @Redirect('http://localhost:3000/sucessful-giveaway', 301)
  async takeawayReservation(
    @Param('id') reservationId: string,
    @Query('token') token: string,
  ) {
    const verified = await this.reservationsService.verifyToken(
      reservationId,
      token,
    );

    if (verified) {
      await this.reservationsService.updateReservation(reservationId, {
        isTaken: true,
      } as UpdateReservationDto);
    }
    return null;
  }
}
