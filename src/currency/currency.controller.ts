import { Controller, Get, HttpStatus, Param, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { CurrencyService } from './currency.service';
import { Rate } from './schema/rates.schema';

@Controller('currency')
export class CurrencyController {
    constructor(private currencyService:CurrencyService){}
    @Get('base')
    async getAllBase(){
         
        const data=await this.currencyService.getAllBase().then((data)=>{
            return data.map(value=>{ 
                console.log(value['_id']['base'])
                let locObj={}
                locObj[value['_id']['base']]=value['_id']['desc']
                console.log()
                return locObj
            })
        });
        return data
    }
    @Get('rates/:base')
    getBaseAllRates(@Param('base') base:string):Promise<Rate[]>{
        return this.currencyService.getBaseAllRates(base);
    }

    @Get('convert')
    async convertRate(@Query('base') base:string,@Query('to') to:string,@Query('amount') amount:string,@Res() resp:Response):Promise<Response>{
        const data=await this.currencyService.getBaseAllRates(base);
        const result=parseFloat(data["rates"][to])*parseFloat(amount)
        return  resp.status(HttpStatus.OK).json({"amount":result});
        
    }
}
