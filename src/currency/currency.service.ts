import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Rate, RateDocument } from './schema/rates.schema';

@Injectable()
export class CurrencyService {
    constructor(@InjectModel("rate") private rateModel: Model<RateDocument>) {}

    async getAllBase():Promise<Rate[]>
    {
        return this.rateModel.aggregate([
            {"$group":{'_id':{"desc":"$desc","base":"$base"}}}
    ]);
    }
    async getBaseAllRates(base:string):Promise<Rate[]>
    {
        return this.rateModel.find({"base":base},{rates:1,date:1,_id:0}).sort({'date':-1}).limit(1);
    }
    
}
