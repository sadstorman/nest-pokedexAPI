import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreatePokemonDto {

    @IsInt()
    @IsPositive()
    @Min(1)
    @ApiProperty()
    no: number;

    @IsString()
    @MinLength(1)
    @ApiProperty()
    name: string;

}
