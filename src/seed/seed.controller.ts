import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SeedService } from './seed.service';

@ApiTags('Seed')
@Controller('seed')
export class SeedController {

  constructor(private readonly seedService: SeedService) {}

  @Get()
  @ApiOperation({summary: 'Obtain first 650 pokemons'})
  async executeSeed() {
    return this.seedService.executeSeed();
  }

}
