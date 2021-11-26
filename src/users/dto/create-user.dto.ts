import { Transform, TransformFnParams } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsPositive, MinLength } from 'class-validator';
import { PASSWORD_MIN_LENGTH_ERR_MSG } from 'src/common/constants/errorMessages';
import { PASSWORD_LENGTH } from '../constants';
export class CreateUserDto {
  @IsNotEmpty()
  readonly name: string;

  @IsPositive()
  readonly age: number;

  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value.trim())
  readonly email: string;

  @IsNotEmpty()
  @MinLength(PASSWORD_LENGTH, {
    message: PASSWORD_MIN_LENGTH_ERR_MSG,
  })
  readonly password: string;
}
