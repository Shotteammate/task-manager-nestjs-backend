import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(configService: ConfigService, private userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // validate JWT here
      secretOrKey: configService.get<string>('JWT_ACCESS_TOKEN_SECRET_KEY'),
      ignoreExpiration: false,
    });
  }

  // Passport will build a user object based on the return value of our
  // validate() method, and attach it as a property on the Request object.
  // https://docs.nestjs.com/security/authentication#jwt-functionality
  async validate(payload: any): Promise<User> {
    // TODO: validate access token is the right one?
    const user = await this.userService.findOne(payload.id);

    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
}
