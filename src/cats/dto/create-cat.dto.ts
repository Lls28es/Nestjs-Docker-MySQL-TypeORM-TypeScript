import {
  // IsNull
  // IsNumber,
  // IsBoolean,
  // IsDate,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCatDto {
  @IsString()
  @MinLength(1)
  @MaxLength(10)
  name: string;

  @IsInt()
  @IsPositive()
  age: number;

  @IsString()
  @IsOptional()
  breead?: string;

  @IsString()
  dateModified;
}
