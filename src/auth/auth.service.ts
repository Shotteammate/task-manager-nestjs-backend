import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserCredentialsResponse } from 'src/users/interface/userCredentialsResponse.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserCredentialsResponse> {
    return await this.usersService.findOneByCredentails(email, password);
  }

  async login(user: any) {
    const payload = { email: user.email, id: user._id };

    return {
      accessToken: this.generateAccessToken(payload),
    };
  }

  generateAccessToken(payload) {
    return this.jwtService.sign(payload);
  }
}
