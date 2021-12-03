import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // validate JWT here
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  // Passport will build a user object based on the return value of our
  // validate() method, and attach it as a property on the Request object.
  // https://docs.nestjs.com/security/authentication#jwt-functionality
  async validate(payload: any) {
    return payload;
  }
}
