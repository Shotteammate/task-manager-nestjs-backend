import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserCredentialsResponse } from 'src/users/interface/userCredentialsResponse.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    // customise passport (default: username & password)
    // https://docs.nestjs.com/security/authentication#customize-passport
    super({ usernameField: 'email', passwordField: 'password' });
  }

  // according to testing result, payload {"email": "xxx@gmail.com", "password":"test123"}
  // will be broken down to validate(email, password)
  async validate(
    email: string,
    password: string,
  ): Promise<UserCredentialsResponse> {
    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
