import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ReservationsModule } from './reservations/reservations.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ReservationsModule,
    RestaurantsModule,
    MongooseModule.forRoot(
      'mongodb+srv://restaurock-admin:0JWVcfSqtK0DQ0ua@cluster0.qzuwv.mongodb.net/restaurock?retryWrites=true&w=majority',
    ),
    MailModule,
  ],
})
export class AppModule {}
