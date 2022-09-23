import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateRestaurantDto } from './models/dto/create-restaurant.dto';
import { RestaurantModel } from './models/restaurant.model';
import { Model } from 'mongoose';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectModel('Restaurant')
    private readonly restaurantModel: Model<RestaurantModel>,
  ) {}

  async createRestaurant(model: CreateRestaurantDto) {
    const newRestaurant = new this.restaurantModel({
      name: model.name,
      phoneNumber: model.phoneNumber,
      address: model.address,
      city: model.city,
      website: model.website,
    });
    const result = await newRestaurant.save();

    return result.id as string;
  }

  async getRestaurants() {
    let restaurants = await this.restaurantModel.find().exec();

    restaurants.sort(function (a, b) {
      return a.name.localeCompare(b.name);
    });

    return restaurants.map((restaurant) => ({
      restaurantId: restaurant.id,
      name: restaurant.name,
      phoneNumber: restaurant.phoneNumber,
      address: restaurant.address,
      city: restaurant.city,
      website: restaurant.website,
    }));
  }

  async getSingleRestaurant(restaurantId: string) {
    const restaurant = await this.restaurantModel.findById(restaurantId);

    return {
      restaurantId: restaurant.id,
      name: restaurant.name,
      phoneNumber: restaurant.phoneNumber,
      address: restaurant.address,
      city: restaurant.city,
      website: restaurant.website,
    };
  }
}
