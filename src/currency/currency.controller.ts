import { Controller, Get } from '@nestjs/common';

@Controller('currency')
export class CurrencyController {
    @Get()
    getCurrencyData():string{
        return "Test Data"
    }
}
