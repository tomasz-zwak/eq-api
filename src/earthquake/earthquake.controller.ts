import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Earthquake } from './earthquake.entity';

@ApiTags('earthquakes')
@Controller('earthquakes')
export class EarthquakeController {
  @Get()
  @ApiResponse({ status: 200, type: [Earthquake] })
  async earthquakes() {
    return 'No earthquakes here. This is too perfect...';
  }
}
