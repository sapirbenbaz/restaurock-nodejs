import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateReservationDto } from './models/dto/create-reservation.dto';
import { UpdateReservationDto } from './models/dto/update-reservation.dto';
import { ReservationModel } from './models/reservation.model';
import { Model } from 'mongoose';
import { MailService } from 'src/mail/mail.service';
import { SearchUserQueryParams } from './models/dto/search-query-params.dto';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectModel('Reservation')
    private readonly reservationModel: Model<ReservationModel>,
    private readonly mailService: MailService,
  ) {}

  async createReservation(model: CreateReservationDto) {
    const newReservation = new this.reservationModel({
      restaurantId: model.restaurantId,
      giverEmail: model.giverEmail,
      isTaken: model.isTaken,
      nameOnReservation: model.nameOnReservation,
      numberOfGuests: model.numberOfGuests,
      date: model.date,
      comments: model.comments,
    });
    const result = await newReservation.save();

    return result.id as string;
  }

  async getReservations(queryParams?: SearchUserQueryParams) {
    let query: any = {
      isTaken: false,
      date: { $gte: new Date().toISOString() },
    };

    if (queryParams?._date) {
      const startDate = new Date(new Date(queryParams?._date).toDateString());
      const endDate = new Date(startDate.getTime() + 60 * 60 * 24 * 1000);

      query.date = { $gte: startDate, $lte: endDate };
    }

    if (queryParams?._numberOfGuests) {
      query.numberOfGuests = queryParams._numberOfGuests;
    }

    if (queryParams?._restaurantId) {
      query.restaurantId = queryParams._restaurantId;
    }

    const reservations = await this.reservationModel
      .find(query)
      .sort({ date: 1 })
      .exec();

    return reservations.map((reservation) => ({
      id: reservation.id,
      giverEmail: reservation.giverEmail,
      takerEmail: reservation.takerEmail,
      isTaken: reservation.isTaken,
      restaurantId: reservation.restaurantId,
      numberOfGuests: reservation.numberOfGuests,
      nameOnReservation: reservation.nameOnReservation,
      date: reservation.date,
      comments: reservation.comments,
    }));
  }

  async getSingleReservation(reservationId: string) {
    const reservation = await this.findReservation(reservationId);

    return {
      id: reservation.id,
      giverEmail: reservation.giverEmail,
      takerEmail: reservation.takerEmail,
      isTaken: reservation.isTaken,
      restaurantId: reservation.restaurantId,
      numberOfGuests: reservation.numberOfGuests,
      date: reservation.date,
    };
  }

  async updateReservation(reservationId: string, model: UpdateReservationDto) {
    const updatedReservation = await this.findReservation(reservationId);

    updatedReservation.isTaken = model.isTaken ?? updatedReservation.isTaken;
    updatedReservation.date = model.date ?? updatedReservation.date;
    updatedReservation.numberOfGuests =
      model.numberOfGuests ?? updatedReservation.numberOfGuests;

    if (model.takerEmail) {
      const token = Math.floor(1000 + Math.random() * 9000).toString();
      updatedReservation.takerEmail =
        model.takerEmail ?? updatedReservation.takerEmail;
      updatedReservation.token = token;

      await this.sendEmailToGiver(
        updatedReservation,
        updatedReservation.giverEmail,
        model.takerEmail,
        token,
      );
    }

    if (model.isTaken) {
      await this.sendEmailToTaker(
        updatedReservation,
        updatedReservation.takerEmail,
      );
    }

    updatedReservation.save();
  }

  private async sendEmailToGiver(
    reservation: ReservationModel,
    giverEmail: string,
    takerEmail: string,
    token: string,
  ) {
    await this.mailService.sendGiveawayReservationToGiver(
      reservation,
      giverEmail,
      takerEmail,
      token,
    );
  }

  private async sendEmailToTaker(
    reservation: ReservationModel,
    takerEmail: string,
  ) {
    await this.mailService.sendGiveawayReservationToTaker(
      reservation,
      takerEmail,
    );
  }

  private async findReservation(
    reservationId: string,
  ): Promise<ReservationModel> {
    let reservation;

    try {
      reservation = await this.reservationModel.findById(reservationId);
    } catch (error) {
      throw new NotFoundException('Could not find reservation');
    }

    if (!reservation) {
      throw new NotFoundException('Could not find reservation');
    }

    return reservation;
  }

  async deleteReservation(reservationId: string) {
    const result = await this.reservationModel
      .deleteOne({ _id: reservationId })
      .exec();

    if (result.deletedCount === 0) {
      throw new NotFoundException('Could not find reservation');
    }
  }

  async verifyToken(reservationId: string, token: string) {
    const reservation = await this.findReservation(reservationId);

    return reservation.token === token;
  }
}
