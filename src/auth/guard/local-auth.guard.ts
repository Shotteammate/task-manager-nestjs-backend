import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
// apply passport-local strategy -> AuthGuard('local')
export class LocalAuthGuard extends AuthGuard('local') {}
