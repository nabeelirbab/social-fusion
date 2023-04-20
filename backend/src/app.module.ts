import { Module } from '@nestjs/common';

// config imports
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigEnum } from '@lib/types';
import { HttpModule } from '@nestjs/axios';
// config imports files
import typeormConfig from './config/orm.config';
import serverConfig from './config/server.config';
import swaggerConfig from './config/swagger.config';

// Module imports
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import mailConfig from '@config/mailConfig';
import jwtConfig from '@config/jwtConfig';
<<<<<<< HEAD
=======
import { FacebookModule } from './modules/facebook/facebook.module';
import { LinkedinModule } from './modules/linkedin/linkedin.module';
>>>>>>> fdf1fff798ba702882f6583434807658f507373c

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeormConfig, serverConfig, mailConfig, jwtConfig, swaggerConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        await configService.get<Promise<TypeOrmModuleOptions>>(
          ConfigEnum.TYPEORM
        ),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
<<<<<<< HEAD
=======
    FacebookModule,
    LinkedinModule,
>>>>>>> fdf1fff798ba702882f6583434807658f507373c
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
