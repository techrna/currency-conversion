import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CurrencyController } from './currency/currency.controller';
import { CurrencyService } from './currency/currency.service';
import { CurrencyModule } from './currency/currency.module';
@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.dev.env',
  }),
  MongooseModule.forRoot(process.env.MONGO_URL+process.env.DB_NAME),
  CurrencyModule
],
  controllers: [AppController, CurrencyController, ],
  providers: [AppService, CurrencyService, ],
})
export class AppModule {}
