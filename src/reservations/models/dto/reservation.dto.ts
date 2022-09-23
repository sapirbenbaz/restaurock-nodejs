import { ReservationModel } from '../reservation.model';

export class ReservationDto {
  constructor(reservationModel: ReservationModel) {
    this.id = reservationModel.id;
    this.giverEmail = reservationModel.giverEmail;
    this.takerEmail = reservationModel.takerEmail;
    this.isTaken = reservationModel.isTaken;
    this.restaurantId = reservationModel.restaurantId;
    this.numberOfGuests = reservationModel.numberOfGuests;
    this.date = reservationModel.date;
  }

  id: string;
  giverEmail: string;
  takerEmail: string;
  isTaken: boolean;
  restaurantId: string;
  numberOfGuests: number;
  date: Date;
}
