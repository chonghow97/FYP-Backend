import { FilesInterceptor } from '@nestjs/platform-express/multer/interceptors/files.interceptor';
import { HomestayDto } from './dto/homestay.dto';
import { FilePipe } from './pipe/file.pipe';
import { HomestaysService } from './homestays.service';
import {
  Controller,
  Get,
  Body,
  Post,
  UseInterceptors,
  Param,
  ParseIntPipe,
  UploadedFiles,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express/multer/interceptors/file-fields.interceptor';
import { AnyFilesInterceptor } from '@nestjs/platform-express/multer/interceptors/any-files.interceptor';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';

@Controller('homestays')
export class HomestaysController {
  constructor(private readonly homestayService: HomestaysService) {}
  @Get()
  get() {
    return this.homestayService.homestayList();
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
}
