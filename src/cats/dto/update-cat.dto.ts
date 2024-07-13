import {
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateCatDto {
  @IsString()
  @MinLength(1)
  @MaxLength(10)
  @IsOptional()
  name?: string;

  @IsInt()
  @IsPositive()
  @IsOptional()
  age?: number;

  @IsString()
  @IsOptional()
  breed?: string;
}
