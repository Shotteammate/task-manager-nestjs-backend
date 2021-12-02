import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { UserCredentialsResponse } from 'src/users/interface/userCredentialsResponse.interface';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserCredentialsResponse> {
    return await this.usersService.findOneByCredentails(email, password);
  }
}
