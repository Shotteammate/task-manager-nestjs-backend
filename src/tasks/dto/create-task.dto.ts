import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  readonly description: string;

  @IsOptional()
  readonly completed: boolean;
}
