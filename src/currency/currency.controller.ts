import { Controller, Get, HttpStatus, Param, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { CurrencyService } from './currency.service';
import { Rate } from './schema/rates.schema';

@Controller('currency')
export class CurrencyController {
    constructor(private currencyService:CurrencyService){}
    @Get('base')
    getAllBase():Promise<Rate[]>{
        return this.currencyService.getAllBase();
    }
    @Get('rates/:base')
    getBaseAllRates(@Param('base') base:string):Promise<Rate>{
        return this.currencyService.getBaseAllRates(base);
    }

    @Get('convert')
    async convertRate(@Query('base') base:string,@Query('to') to:string,@Query('amount') amount:string,@Res() resp:Response):Promise<Response>{
        const data=await this.currencyService.getBaseAllRates(base);
        const result=parseFloat(data["rates"][to])*parseFloat(amount)
        return  resp.status(HttpStatus.OK).json({"amount":result});
        
    }
}
