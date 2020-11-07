import { HomestayDto } from './dto/homestay.dto';
import { HomestaysService } from './homestays.service';
import {
  Controller,
  Get,
  Body,
  Post,
  UseInterceptors,
  Param,
  UploadedFiles,
  Delete,
  Put,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express/multer/interceptors/file-fields.interceptor';

@Controller('homestays')
export class HomestaysController {
  constructor(private readonly homestayService: HomestaysService) {}
  @Get()
  get() {
    return this.homestayService.homestayList();
  }

  @Get(':id')
async findOne(@Param() params) {
    return await this.homestayService.findOne(params.id);
}

  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'image' }]))
  async post(@UploadedFiles() file, @Body() dto: HomestayDto) {
    //rename image
    file.image[0].originalname = new Date().getTime()+"_"+file.image[0].originalname;
    //save image
    
    //save database
    console.log(dto);
    return await this.homestayService.create(dto);
  }

  @Put()
  async updateHomestay(@Body() payload){
    return await this.homestayService.update(payload)
  }
  

  @Delete(':id')
  async delete(@Param() params){
    return await this.homestayService.deleteThis(params.id);
  }
}
