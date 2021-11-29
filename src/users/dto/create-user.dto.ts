import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsPositive,
  MinLength,
  Matches,
  IsOptional,
} from 'class-validator';
import { PASSWORD_MIN_LENGTH_ERR_MSG } from 'src/common/constants/errorMessages';
import { PASSWORD_LENGTH } from '../constants';

// regex match all excludes specific word
// https://regexland.com/regex-match-all-except/
const excludePasswordRegex = new RegExp('^(?!.*password).*', 'i');

export class CreateUserDto {
  @IsNotEmpty()
  readonly name: string;

  @IsPositive()
  @IsOptional()
  readonly age: number;

  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value.trim())
  readonly email: string;

  @IsNotEmpty()
  @MinLength(PASSWORD_LENGTH, {
    message: PASSWORD_MIN_LENGTH_ERR_MSG,
  })
  @Matches(excludePasswordRegex)
  readonly password: string;
}
