import { Injectable } from '@nestjs/common';
import { User } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { PASSWORD_MASKED } from 'src/users/constants';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findOneByEmail(email);

    if (user) {
      const isValidPassword = await this.isPasswordMatch(
        password,
        user.password,
      );

      if (isValidPassword) {
        user.password = PASSWORD_MASKED;
        return user;
      }
    }
    return null;
  }

  async isPasswordMatch(incomingPassword, hash) {
    const result = await bcrypt.compare(incomingPassword, hash);
    return result;
  }
}
