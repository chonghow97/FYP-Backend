import { HomestaysServices } from './homestays.service';
import { Controller } from '@nestjs/common';

@Controller('homestay')
export class HomestaysController {
  constructor(private homestaysService: HomestaysServices) {}
}
