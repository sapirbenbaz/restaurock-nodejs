import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { RestaurantsModule } from 'src/restaurants/restaurants.module';
import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        service: 'SendinBlue',
        port: 587,
        auth: {
          user: 'sapirbn@mta.ac.il',
          pass: 'TaEPJwDjq42k8yHL',
        },
      },
      defaults: {
        from: '"No Reply" <noreply@restaurock.com>',
      },
    }),
    RestaurantsModule,
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
