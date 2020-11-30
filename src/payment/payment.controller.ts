import { Param } from '@nestjs/common/decorators/http/route-params.decorator';
import { PaymentService } from './payment.service';
import {
    Controller,
    Post,
    Get,
    Put,
    Body,
    Query,
    Redirect,
} from '@nestjs/common';
import { query } from 'express';

@Controller('payment')
export class PaymentController {
    constructor(private readonly services: PaymentService) {}
    @Get('detail')
    @Redirect('http://localhost:8080/history', 302)
    async detail(@Query() query) {
        return await this.services.detail(query);
    }
    @Get(':amount')
    async get(@Param() params) {
        return await this.services.get(params.amount);
    }

    @Put()
    async update(@Body() payload) {
        // console.log(await this.services.update(payload), '=>');
        return await this.services.update(payload);
    }
}
