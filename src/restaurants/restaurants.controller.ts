import {
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './models/dto/create-restaurant.dto';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Post()
  async createRestaurant(@Body() createRestaurantDto: CreateRestaurantDto) {
    const restaurantId = await this.restaurantsService.createRestaurant(
      createRestaurantDto,
    );
    return { id: restaurantId };
  }

  @Get()
  async getAllRestaurants() {
    const restaurants = await this.restaurantsService.getRestaurants();
    return restaurants;
  }
}
