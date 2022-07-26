import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';
import axios, { AxiosInstance } from "axios";
import { PokeResponse } from './interfaces/poke-response.interface';

@Controller('seed')
export class SeedController {

  private readonly axios: AxiosInstance = axios

  @Get()
  async executeSeed() {
    const {data} = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650')
    return data.results;
  }

}
