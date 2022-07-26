import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { Pokemon } from '../pokemon/entities/pokemon.entity';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter
  ) { }

  async executeSeed() {
    const pokemonToInsert: { name: string, no: number }[] = []
    try {
      await this.pokemonModel.deleteMany({})
      const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650')

      data.results.forEach(({ name, url }) => {

        const segments = url.split('/')
        const no: number = +segments[segments.length - 2]
        pokemonToInsert.push({ name, no });
      })

      this.pokemonModel.insertMany(pokemonToInsert)

    } catch (error) {
      console.log(error);
    }
    return 'Seed executed';
  }
}
