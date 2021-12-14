import {
  Controller,
  Post,
  Get,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/guard/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
import { UsersService } from './users/users.service';
import { JwtRefreshGuard } from './auth/guard/jwt-refresh-token-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @HttpCode(HttpStatus.OK)
  async login(@Request() req): Promise<any> {
    // The req parameter will contain a user property (populated by Passport during the passport-local authentication flow)
    // https://docs.nestjs.com/security/authentication#jwt-functionality
    const { user } = req;
    const accessToken = this.authService.generateJwtAccessToken(user._id);
    const refreshToken = this.authService.generateJwtRefreshToken(user._id);

    await this.usersService.setCurrentRefreshToken(refreshToken, user._id);
    return { user, accessToken, refreshToken };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @HttpCode(HttpStatus.OK)
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtRefreshGuard)
  @Get('auth/refresh')
  @HttpCode(HttpStatus.OK)
  refresh(@Request() req) {
    const accessToken = this.authService.generateJwtAccessToken(req.user._id);
    return { accessToken };
  }

  @UseGuards(JwtAuthGuard)
  @Get('auth/logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Request() req) {
    const { user } = req;
    await this.usersService.removeRefreshToken(user.id);
    return user.id;
  }
}
