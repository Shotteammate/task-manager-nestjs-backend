import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserCredentialsResponse } from 'src/users/interface/userCredentialsResponse.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserCredentialsResponse> {
    return await this.usersService.findOneByCredentails(email, password);
  }

  generateJwtAccessToken(id: number) {
    const payload = { id };
    const token = this.jwtService.sign(payload, {
      secret: `${this.configService.get<string>(
        'JWT_ACCESS_TOKEN_SECRET_KEY',
      )}`,
      expiresIn: `${this.configService.get<string>(
        'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
      )}`,
    });
    return token;
  }

  generateJwtRefreshToken(id: number) {
    const payload = { id };
    const token = this.jwtService.sign(payload, {
      secret: `${this.configService.get<string>(
        'JWT_REFRESH_TOKEN_SECRET_KEY',
      )}`,
      expiresIn: `${this.configService.get<string>(
        'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
      )}`,
    });

    return token;
  }
}
