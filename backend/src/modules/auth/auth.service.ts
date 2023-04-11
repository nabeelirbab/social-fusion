import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRegisterRequestDto } from '@lib/dtos/auth/register';
import { AuthHelper } from './auth.helper';
import {
  ConfigEnum,
  IJwtConfig,
  IServerConfig,
  UserRoleEnum,
  UserStatusEnum,
} from '@lib/types';
import { MailService } from '../mail/mail.service';
import { UserService } from '../user/user.service';
import { AuthorizeResponseDto, GlobalResponseDto } from '@lib/dtos';
@Injectable()
export class AuthService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  @Inject(AuthHelper)
  private readonly helper: AuthHelper;
  @Inject(ConfigService)
  private readonly configService: ConfigService;
  @Inject(MailService)
  private readonly mailService: MailService;
  @Inject(UserService)
  private readonly userService: UserService;
  private readonly jwt: JwtService;
  constructor(jwt: JwtService) {
    this.jwt = jwt;
  }

  public async registerUser(
    body: UserRegisterRequestDto
  ): Promise<User | never | GlobalResponseDto> {
    const { email, password }: UserRegisterRequestDto = body;
    let user: User = await this.repository.findOne({ where: { email } });
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (user) {
      throw new HttpException('User already exit!', HttpStatus.CONFLICT);
    }
    user = new User({
      ...body,
    });
    const hashedPassword = await this.helper.encodePassword(password);
    user.setPassword(hashedPassword);
    const { productName, backendUrl } = this.configService.get<IServerConfig>(
      ConfigEnum.SERVER
    );
    const newUser = await this.repository.save(user);
    const token = this.jwt.sign({ id: newUser.id });
    this.mailService.sendVerificationMail(user.email, {
      authLoginLink: `${backendUrl}/auth/verify?token=${token}`,
      firstName: user.email,
      productName,
    });
    return new GlobalResponseDto('Check you email for verification');
  }

  public async getUserByVerificationToken(token: string) {
    const secret = this.configService.get<IJwtConfig>(
      ConfigEnum.JWT_TOKEN
    ).secret;
    const user = this.jwt.verify(token, { secret });
    return await this.repository.findOneBy({ id: user?.id });
    // Use userId to retrieve user from database
  }

  public async verifyEmail(token: string, res) {
    try {
      const user: User = await this.getUserByVerificationToken(token);
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (!user) {
        // console.log('no user found')
        throw new HttpException('No user found', HttpStatus.NOT_FOUND);
      }
      if (user.status === UserStatusEnum.ACTIVE) {
        throw new HttpException('Already Verified', HttpStatus.CONFLICT);
      }
      user.status = UserStatusEnum.ACTIVE;
      const updateStatusDto = {
        userId: user.id,
        status: UserStatusEnum.ACTIVE,
      };
      await this.updateUserStatus(updateStatusDto);

      const { frontendUrl, authLoginLink } =
        this.configService.get<IServerConfig>(ConfigEnum.SERVER);
      return res.redirect(`${frontendUrl}/${authLoginLink}`);
    } catch (error) {
      // console.error(error);
      throw new HttpException('Already Verified', HttpStatus.CONFLICT);
    }
  }

  async updateUserStatus(updateStatusDto): Promise<GlobalResponseDto> {
    const user = await this.repository.findOne({
      where: { id: updateStatusDto.userId },
    });
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!user) throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    user.setStatus(updateStatusDto.status);
    user.disabled = false;
    await this.repository.save(user);
    const message =
      updateStatusDto.status === UserStatusEnum.ACTIVE
        ? 'User Successfully activated!'
        : 'User Successfully deactivated!';
    return new GlobalResponseDto(message);
  }

  async login(loginDto: UserRegisterRequestDto) {
    const { email, password }: UserRegisterRequestDto = loginDto;
    const user: User | any = await this.repository.findOne({
      where: { email },
    });
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (
      !user ||
      (user.role === UserRoleEnum.MEMBER &&
        (user.status === UserStatusEnum.DEACTIVATE ||
          user.status === UserStatusEnum.INACTIVE))
    ) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (
      !user ||
      (user.role === UserRoleEnum.MEMBER &&
        user.status === UserStatusEnum.UNVERIFIED)
    ) {
      throw new HttpException('User needs Verification', HttpStatus.NOT_FOUND);
    }
    if (!user || (user.role === UserRoleEnum.MEMBER && user.disable === true)) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    const isPasswordValid: boolean = this.helper.isPasswordValid(
      password,
      user.password
    );

    if (!isPasswordValid) {
      throw new HttpException('Password Incorrect', HttpStatus.NOT_FOUND);
    }
    delete user.password;
    return new AuthorizeResponseDto(user, this.helper.generateToken(user));
  }
}
