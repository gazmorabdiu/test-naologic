import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { JwtAuthGuard, RolesGuard } from './guards';
import { Roles } from './decorators/roles.decorator';
import { UserRole } from 'src/utils/enums';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  signIn(@Body() { password, username }: SignInDto) {
    return this.authService.signIn(username, password);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.USER)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
