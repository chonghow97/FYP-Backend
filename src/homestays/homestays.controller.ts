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
  post(@UploadedFiles() file, @Body() dto: HomestayDto) {
    //rename image
    file.image[0].originalname = new Date().getTime()+"_"+file.image[0].originalname;
    //save image
    
    //save database
    return this.homestayService.create(dto);
  }

  @Delete(':id')
  async delete(@Param() params){
    return await this.homestayService.deleteThis(params.id);
  }
}
