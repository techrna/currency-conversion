import { Controller, Get, HttpStatus, Param, Query, Res } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';
import { CurrencyService } from './currency.service';
import { Rate } from './schema/rates.schema';

@Controller('currency')
export class CurrencyController {
    constructor(private currencyService:CurrencyService){}
    @Get('base')
    @ApiOperation({"summary":"Get all base symbols"})
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
    @ApiOperation({"summary":"Get latest rates for given base symbol"})
    getBaseAllRates(@Param('base') base:string):Promise<Rate[]>{
        return this.currencyService.getBaseAllRates(base);
    }

    @Get('convert')
    @ApiOperation({"summary":"Convert the amount value from Symbol to Symbol"})

    async convertRate(@Query('base') base:string,@Query('to') to:string,@Query('amount') amount:string,@Res() resp:Response):Promise<Response>{
        const data=await this.currencyService.getBaseAllRates(base);
        if(base==to)
        {
            return  resp.status(HttpStatus.OK).json({"amount":amount});
        }
       if(!data[0])
       {
        return  resp.status(HttpStatus.BAD_REQUEST).json({"error":"provide valid data"});
       }
        if (data[0]["rates"][to]){
        const result=parseFloat(data[0]["rates"][to])*parseFloat(amount)
        return  resp.status(HttpStatus.OK).json({"amount":result});
        }  else{
            return  resp.status(HttpStatus.BAD_REQUEST).json({"error":"provide valid data"});
        }
        
    }
}
