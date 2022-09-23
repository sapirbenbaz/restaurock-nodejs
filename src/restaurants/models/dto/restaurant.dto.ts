import { RestaurantModel } from '../restaurant.model';

export class RestaurantDto {
  constructor(restaurantModel: RestaurantModel) {
    this.restaurantId = restaurantModel.restaurantId;
    this.name = restaurantModel.name;
    this.phoneNumber = restaurantModel.phoneNumber;
    this.address = restaurantModel.address;
    this.city = restaurantModel.city;
    this.website = restaurantModel.website;
  }

  restaurantId: string;
  name: string;
  phoneNumber: string;
  address: string;
  city: string;
  website: string;
}
