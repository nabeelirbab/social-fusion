import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  Get,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SWAGGER_API_TAG } from '@lib/constants';
import { User } from '../user/entities/user.entity';
import { UserRegisterRequestDto } from '@lib/dtos/auth/register';
import { AuthService } from './auth.service';
import { JwtAuthGuard, RolesGuard } from 'src/guards';
import { UserRole, UserRoleEnum } from '@lib/types';

@Controller('auth')
@ApiTags(SWAGGER_API_TAG.AUTH)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registerUser')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({ summary: 'Register User' })
  @ApiResponse({
    status: 201,
    description: 'User created!',
    type: User,
  })
  async RegisterUser(@Body() registerDto: UserRegisterRequestDto) {
    return await this.authService.registerUser(registerDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login User' })
  @ApiResponse({ status: 200, description: 'Successfully login!' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'User not found!' })
  async Login(@Body() loginDto: UserRegisterRequestDto) {
    return await this.authService.login(loginDto);
  }

  @Get('verify')
  async verifyEmail(@Query('token') token: string, @Res() res) {
    return await this.authService.verifyEmail(token, res);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @UserRole(UserRoleEnum.ADMIN)
  @ApiBearerAuth()
  @Get('test')
  demo() {
    return 'testing done!!!!';
  }
}
