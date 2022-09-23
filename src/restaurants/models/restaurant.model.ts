import * as mongoose from 'mongoose';

export const RestaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    website: { type: String, required: false },
  },
  { timestamps: true },
);

export interface RestaurantModel extends mongoose.Document {
  restaurantId: string;
  name: string;
  phoneNumber: string;
  address: string;
  city: string;
  website: string;
}
