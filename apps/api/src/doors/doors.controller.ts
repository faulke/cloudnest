import { Controller } from '@nestjs/common'
import { DoorsService } from './doors.service'
@Controller('doors')
export class DoorsController {
  constructor(private readonly doorsService: DoorsService) {}
}
