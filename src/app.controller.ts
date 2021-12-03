import { Controller, Post, Get, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/guard/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
import { AccessToken } from './interface/accessToken.interface';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  // @UseGuards(JwtAuthGuard)
  @Post('auth/login')
  async login(@Request() req): Promise<AccessToken> {
    // The req parameter will contain a user property (populated by Passport during the passport-local authentication flow)
    // https://docs.nestjs.com/security/authentication#jwt-functionality
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
