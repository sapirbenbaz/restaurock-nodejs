import * as mongoose from 'mongoose';

export const ReservationSchema = new mongoose.Schema(
  {
    giverEmail: { type: String, required: true },
    takerEmail: { type: String, required: false },
    isTaken: { type: Boolean, required: true },
    restaurantId: { type: String, required: true },
    nameOnReservation: { type: String, required: true },
    numberOfGuests: { type: Number, min: 1, max: 20, required: true },
    date: { type: Date, required: true },
    comments: { type: String, required: false },
    token: { type: String, required: false },
  },
  { timestamps: true },
);

export interface ReservationModel extends mongoose.Document {
  id: string;
  giverEmail: string;
  takerEmail: string;
  nameOnReservation: string;
  isTaken: boolean;
  restaurantId: string;
  numberOfGuests: number;
  date: Date;
  comments: string;
  token: string;
}
