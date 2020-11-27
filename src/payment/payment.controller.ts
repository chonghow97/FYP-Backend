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

@Controller('payment')
export class PaymentController {
    constructor(private readonly services: PaymentService) {}
    @Get()
    async get() {
        return await this.services.get();
    }
    @Post()
    async post() {
        // console.log(await this.services.post());
        return await this.services.post();
    }
    @Put()
    async update(@Body() payload) {
        // console.log(await this.services.update(payload),"=>");
        return await this.services.update(payload);
    }
    @Get('detail')
    @Redirect('https://docs.nestjs.com', 302)
    async detail(@Query() query) {
        return await this.services.detail(query);
    }
}
