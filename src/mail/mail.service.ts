import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ReservationModel } from 'src/reservations/models/reservation.model';
import { RestaurantsService } from 'src/restaurants/restaurants.service';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly restaurantsService: RestaurantsService,
  ) {}

  async sendGiveawayReservationToGiver(
    reservation: ReservationModel,
    giverEmail: string,
    takerEmail: string,
    token: string,
  ) {
    const url = `http://localhost:8000/reservations/takeaway/${reservation.id}?token=${token}`;
    const restaurant = await this.restaurantsService.getSingleRestaurant(
      reservation.restaurantId,
    );

    await this.mailerService.sendMail({
      to: giverEmail,
      subject: 'Someone is interested in your reservation!',
      html: `<html>
      <div class="preheader"
        style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
        Hello! Here is your verification code</div>
      <head>
        <meta name="viewport" content="width=device-width, initial scale=1.0"/>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="color-scheme" content="light dark">
        <meta name="supported-color-schemes" content="light dark">
        <title>frontEgg</title>
      </head>
      <body class="bg" marginheight="0" bgcolor="#dddddd" marginwidth="0" leftmargin="0" topmargin="0"  style="min-width:320px; ">
        <table class="bg" width="100%" bgcolor="#dddddd" class="body" cellspacing="0" cellpadding="0" border="0" style="color:#7c7474; background-color: #dddddd;  font:14px/20px  Arial, Helvetica, sans-serif;">
          <tr>
            <td height="1"  style="padding:0; line-height: 0;">
              <style type="text/css">
                @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@500;700;800&display=swap');
    
                :root {
                  color-scheme: light dark;
                  supported-color-schemes: light dark;
                }
    
                html { -webkit-text-size-adjust:none;
                 -ms-text-size-adjust: none;
                 -webkit-text-resize: 100%;
                  text-resize: 100%;}
                *{outline:none;}
                .btn {
                  font-family: 'Manrope', Arial, Helvetica, sans-serif;
                  font-weight: 700;
                }
    
                .main-title {
                  font-family: 'Manrope', Arial, Helvetica, sans-serif;
                  font-weight: 800;
                }
                .text {
                  font-family: 'Manrope', Arial, Helvetica, sans-serif;
                  font-weight: 400;
                }
                 @media (prefers-color-scheme: dark) {
                    .btn {
                    color: #ffffff !important; 
                  }
                  .title {
                    color: #ffffff !important; 
                  }
                  .bg {
                    background: #dddddd !important; 
                  }
                  .mainbg {
                    background: #ffffff!important; 
                  }
                  .main-title {
                    color: #000000 !important; 
                  }
                  .text {
                    color: #000000 !important; 
                  }
                }
              </style>
            </td>
          </tr>
          <tr>
            <td class="bg" align="center" style="padding:0; line-height:0; font-size:0;">
              <table class="bg" bgcolor="#dddddd" class="body" cellspacing="0" cellpadding="0" border="0" style=" max-width:650px; background-color: #dddddd;">
                <tr>
                  <td colspan="3" height="30" style="padding:0;"></td>
                </tr>
                <tr>
                  <td width="15" valign="top" style="padding:0;"></td>
                  <td style="padding:0;">
                    <table  width="100%" cellspacing="0" cellpadding="0" border="0" style=" max-width:600px;">
                      <tr>
                        <td height="25" style="padding:0;"></td>
                      </tr>
                      <tr>
                        <td height="32" style="padding:0;"></td>
                      </tr>
                    </table>
                  </td>
                  <td width="15" valign="top" style="padding:0;"></td>
                </tr>
                <tr>
                  <td width="15" valign="top" style="padding:0;"></td>
                  <td style="padding: 0">
                    <table class="mainbg"  bgcolor="#ffffff" width="100%" cellspacing="0" cellpadding="0" border="0" style=" max-width:600px; background-color: #ffffff; border-radius: 10px;">
                      <tr>
                        <td valign="top" style="padding:0;">
                          <table class="mainbg" bgcolor="#ffffff" class="body"  width="100%" cellspacing="0" cellpadding="0" border="0" style=" max-width:600px; border-radius: 10px">
                            <tr>
                              <td height="23" style="padding:0;"></td>
                            </tr>
                            
                            <tr>
                              <td align="center" style="padding:0; line-height:0; font-size:0;">
                                <table  width="100%" cellspacing="0" cellpadding="0" border="0" style=" max-width:600px;">
                                  <tr>
                                    <td width="30" style="padding:0;"></td>
                                    <td style="padding:0;">
                                      <table cellspacing="0" cellpadding="0" border="0">
                                        <tr>
                                          <td valign="top" style="padding:0; line-height: 22px;">
                                            <font class="text" color="#4D5062" face="Arial, Helvetica, sans-serif" size="3" style="font-size:14px; line-height:22px;  letter-spacing: -0.005em;">${takerEmail} is interested in your reservation for ${restaurant.name}<br/>
    on the ${reservation.date}<br/><br/>If you wish to giveaway your reservation, please click on the button below</font>
                                          </td>
                                        </tr>
                                                                          <tr>
                                          <td height="32" style="padding:0;"></td>
                                        </tr>
                                        <tr>
                                          <td valign="top" style="padding:0; line-height: 22px;text-align:center;">
                                            <font class="text"  color="#4D5062" face="Arial, Helvetica, sans-serif" size="3" style="font-size:14px; line-height:22px;  letter-spacing: -0.005em;"><a href=${url}
                                            class="btn"
                                            target="_blank"
                                            style="min-width: 145px; background:#6F7DFF; display:inline-block; text-align: center;  text-decoration:none; color: #ffffff; font-weight:normal; vertical-align:middle; line-height:46px; border-radius: 4px;  padding: 6px 12px">
                                            &nbsp;Giveaway
                                            your
                                            reservation
                                            &nbsp;<i
                                                style="vertical-align:middle;">
                                                <img style="max-width:12px; height: auto;"
                                                    border="0"
                                                    src="https://frontegg.com/wp-content/themes/frontegg/newsletter-images/arr.png"
                                                    width="auto"
                                                    height="auto"
                                                    alt="">
                                            </i>
                                        </a></font>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td height="28" style="padding:0;"></td>
                                        </tr>
    
                                        <tr>
                                          <td valign="top" style="padding:0; line-height: 22px;">
                                            <font class="text"  color="#4D5062" face="Arial, Helvetica, sans-serif" size="3" style="font-size:14px; line-height:22px;letter-spacing: 0em;">Cheers,<br>The Restaurock Team</font>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                    <td width="30" style="padding:0;"></td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td  height="35" style="padding:0;"></td>
                            </tr>
                            <tr>
                              <td valign="top" height="1" style="padding:0; line-height: 0px;">
    
                              </td>
                          
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
    
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>`,
    });
  }

  async sendGiveawayReservationToTaker(
    reservation: ReservationModel,
    takerEmail: string,
  ) {
    const restaurant = await this.restaurantsService.getSingleRestaurant(
      reservation.restaurantId,
    );

    await this.mailerService.sendMail({
      to: takerEmail,
      subject: 'The reservation is now yours!',
      html: `<html>
      <div class="preheader"
        style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
        Hello! Here is your verification code</div>
      <head>
        <meta name="viewport" content="width=device-width, initial scale=1.0"/>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="color-scheme" content="light dark">
        <meta name="supported-color-schemes" content="light dark">
        <title>frontEgg</title>
      </head>
      <body class="bg" marginheight="0" bgcolor="#dddddd" marginwidth="0" leftmargin="0" topmargin="0"  style="min-width:320px; ">
        <table class="bg" width="100%" bgcolor="#dddddd" class="body" cellspacing="0" cellpadding="0" border="0" style="color:#7c7474; background-color: #dddddd;  font:14px/20px  Arial, Helvetica, sans-serif;">
          <tr>
            <td height="1"  style="padding:0; line-height: 0;">
              <style type="text/css">
                @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@500;700;800&display=swap');
    
                :root {
                  color-scheme: light dark;
                  supported-color-schemes: light dark;
                }
    
                html { -webkit-text-size-adjust:none;
                 -ms-text-size-adjust: none;
                 -webkit-text-resize: 100%;
                  text-resize: 100%;}
                *{outline:none;}
                .btn {
                  font-family: 'Manrope', Arial, Helvetica, sans-serif;
                  font-weight: 700;
                }
    
                .main-title {
                  font-family: 'Manrope', Arial, Helvetica, sans-serif;
                  font-weight: 800;
                }
                .text {
                  font-family: 'Manrope', Arial, Helvetica, sans-serif;
                  font-weight: 400;
                }
                 @media (prefers-color-scheme: dark) {
                    .btn {
                    color: #ffffff !important; 
                  }
                  .title {
                    color: #ffffff !important; 
                  }
                  .bg {
                    background: #dddddd !important; 
                  }
                  .mainbg {
                    background: #ffffff!important; 
                  }
                  .main-title {
                    color: #000000 !important; 
                  }
                  .text {
                    color: #000000 !important; 
                  }
                }
              </style>
            </td>
          </tr>
          <tr>
            <td class="bg" align="center" style="padding:0; line-height:0; font-size:0;">
              <table class="bg" bgcolor="#dddddd" class="body" cellspacing="0" cellpadding="0" border="0" style=" max-width:650px; background-color: #dddddd;">
                <tr>
                  <td colspan="3" height="30" style="padding:0;"></td>
                </tr>
                <tr>
                  <td width="15" valign="top" style="padding:0;"></td>
                  <td style="padding:0;">
                    <table  width="100%" cellspacing="0" cellpadding="0" border="0" style=" max-width:600px;">
                      <tr>
                        <td height="25" style="padding:0;"></td>
                      </tr>
                      <tr>
                        <td height="32" style="padding:0;"></td>
                      </tr>
                    </table>
                  </td>
                  <td width="15" valign="top" style="padding:0;"></td>
                </tr>
                <tr>
                  <td width="15" valign="top" style="padding:0;"></td>
                  <td style="padding: 0">
                    <table class="mainbg"  bgcolor="#ffffff" width="100%" cellspacing="0" cellpadding="0" border="0" style=" max-width:600px; background-color: #ffffff; border-radius: 10px;">
                      <tr>
                        <td valign="top" style="padding:0;">
                          <table class="mainbg" bgcolor="#ffffff" class="body"  width="100%" cellspacing="0" cellpadding="0" border="0" style=" max-width:600px; border-radius: 10px">
                            <tr>
                              <td height="23" style="padding:0;"></td>
                            </tr>
                            
                            <tr>
                              <td align="center" style="padding:0; line-height:0; font-size:0;">
                                <table  width="100%" cellspacing="0" cellpadding="0" border="0" style=" max-width:600px;">
                                  <tr>
                                    <td width="30" style="padding:0;"></td>
                                    <td style="padding:0;">
                                      <table cellspacing="0" cellpadding="0" border="0">
                                        <tr>
                                          <td valign="top" style="padding:0; line-height: 22px;">
                                            <font class="text" color="#4D5062" face="Arial, Helvetica, sans-serif" size="3" style="font-size:14px; line-height:22px;  letter-spacing: -0.005em;">The reservation for ${restaurant.name} on the ${reservation.date} for ${reservation.numberOfGuests} is now yours!
                                            <br/>The name on the reservation is ${reservation.nameOnReservation}<br/><br/>You're so lucky! Enjoy yourself</font>
                                          </td>
                                        </tr>
                                                                          <tr>
                                          <td height="32" style="padding:0;"></td>
                                        </tr>
                                        <tr>
                                          <td valign="top" style="padding:0; line-height: 22px;text-align:center;">
                                            <font class="text"  color="#4D5062" face="Arial, Helvetica, sans-serif" size="3" style="font-size:14px; line-height:22px;  letter-spacing: -0.005em;"></font>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td height="28" style="padding:0;"></td>
                                        </tr>
    
                                        <tr>
                                          <td valign="top" style="padding:0; line-height: 22px;">
                                            <font class="text"  color="#4D5062" face="Arial, Helvetica, sans-serif" size="3" style="font-size:14px; line-height:22px;letter-spacing: 0em;">Cheers,<br>The Restaurock Team</font>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                    <td width="30" style="padding:0;"></td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td  height="35" style="padding:0;"></td>
                            </tr>
                            <tr>
                              <td valign="top" height="1" style="padding:0; line-height: 0px;">
    
                              </td>
                          
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
    
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>`,
    });
  }
}
