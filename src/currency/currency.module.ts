import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CurrencyController } from './currency.controller';
import { CurrencyService } from './currency.service';
import { RateSchema } from './schema/rates.schema';

@Module({imports: [MongooseModule.forFeature([{ name: "rate", schema: RateSchema }])],
  controllers: [ CurrencyController, ],
  providers: [ CurrencyService, ],
 exports:[CurrencyService]
})
export class CurrencyModule {}
