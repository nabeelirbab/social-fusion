import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Res,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { Linkedin } from './entities/linkedin.entity';
import { AuthHelper } from '../auth/auth.helper';
import axios from 'axios';

@Injectable()
export class LinkedinService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;
  @InjectRepository(Linkedin)
  private readonly linkedinRepository: Repository<Linkedin>;
  @Inject(AuthHelper)
  private readonly helper: AuthHelper;
  async exchangeToken(
    code: string,
    redirectUri: string,
    token: string,
    @Res() res: any
  ): Promise<{ accessToken: string }> {
    const decoded = await this.helper.decode(token as string); // verify access token and get user from db
    const user = decoded ? await this.helper.validateUser(decoded) : null;
    if (!user) throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    const existingProfile = await this.userRepository.findOne({
      where: { email: user.email },
      relations: ['linkedin'],
    });
    if (existingProfile.linkedin)
      throw new HttpException('Already Connected!', HttpStatus.CONFLICT);
    const clientId = '77e5zc91lfplxv';
    const clientSecret = 'QMD9iqDF72JJKZI0';
    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('redirect_uri', redirectUri);
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);
    const response = await axios.post(
      'https://www.linkedin.com/oauth/v2/accessToken',
      params,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    const accessTokenExpiresAt = new Date(
      Date.now() + response.data.expires_in * 1000
    );
    const linkedin = new Linkedin();
    const userProfile: any = await this.getProfile(
      res,
      response.data.access_token
    );

    const data = await this.getEmail(response.data.access_token);
    const email = data.elements[0]['handle~'].emailAddress;
    linkedin.URN = userProfile.id;
    linkedin.firstName = userProfile.firstName.localized.en_US;
    linkedin.lastName = userProfile.lastName.localized.en_US;
    linkedin.profilePic =
      userProfile?.profilePicture?.[
        'displayImage~'
      ].elements[0].identifiers[0].identifier;
    linkedin.accessToken = response.data.access_token;
    linkedin.user = user;
    linkedin.email = email;
    linkedin.accessTokenExpiresAt = accessTokenExpiresAt;
    user.linkedin = linkedin;
    await this.userRepository.save(user);
    await this.linkedinRepository.save(linkedin);
    res.json(response.data.access_token);
    return { accessToken: response.data.access_token };
  }

  async postArticle(@Res() res, accessToken, article) {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      // 'X-Restli-Protocol-Version': '202204.01', // Add LinkedIn-Version header
      'LinkedIn-Version': '202210',
    };
    const userProfile = await this.getUserProfile(accessToken);
    const userUrn = userProfile.id;

    const data = {
      author: `urn:li:person:${userUrn}`,
      commentary: `${article}`,
      visibility: 'PUBLIC',
      distribution: {
        feedDistribution: 'MAIN_FEED',
        targetEntities: [],
        thirdPartyDistributionChannels: [],
      },
      lifecycleState: 'PUBLISHED',
      isReshareDisabledByAuthor: false,
    };
    try {
      const response = await axios.post(
        'https://api.linkedin.com/rest/posts',
        data,
        {
          headers,
        }
      );
      if (response.status === 201) {
        res.json({ success: true });
        // return res;
      }
    } catch (error) {
      console.error('Error posting article:', error.response);
      // throw error;
      res.send(error);
    }
  }

  async getUserProfile(accessToken) {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };

    const response = await axios.get('https://api.linkedin.com/v2/me', {
      headers,
    });

    return response.data;
  }

  async getProfile(@Res() res, accessToken) {
    const headers = {
      'Access-Control-Allow-Origin': '*', // Set the allowed origin to any (*)
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE', // Set the allowed HTTP methods
      'Access-Control-Allow-Headers': 'Content-Type, Authorization', // Set the allowed headers
    };

    try {
      const response = await axios.get('https://api.linkedin.com/v2/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'cache-control': 'no-cache',
          'X-Restli-Protocol-Version': '2.0.0',
        },
        params: {
          projection:
            '(id,firstName,lastName,profilePicture(displayImage~:playableStreams))',
        },
      });

      // res.set(headers); // Set the CORS headers in the response
      // res.json(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async getEmail(accessToken) {
    const headers = {
      'Access-Control-Allow-Origin': '*', // Set the allowed origin to any (*)
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE', // Set the allowed HTTP methods
      'Access-Control-Allow-Headers': 'Content-Type, Authorization', // Set the allowed headers
    };

    try {
      const response = await axios.get(
        'https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'cache-control': 'no-cache',
            'X-Restli-Protocol-Version': '2.0.0',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async getPosts(accessToken: string) {
    const userProfile = await this.getUserProfile(accessToken);
    const URN = userProfile.id;
    const res = await axios.get(
      `https://api.linkedin.com/rest/posts?author=${URN}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          // 'cache-control': 'no-cache',
          'X-Restli-Protocol-Version': '2.0.0',
          'LinkedIn-Version': '202210',
        },
      }
    );
  }

  async connectStatus(token: string) {
    try {
      const decoded = await this.helper.decode(token as string); // verify access token and get user from db
      const user = decoded ? await this.helper.validateUser(decoded) : null;
      if (!user) {
        throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
      }
      const existingProfile = await this.userRepository.findOne({
        where: { email: user.email },
        relations: ['linkedin'],
      });
      if (existingProfile.linkedin) {
        return { success: true };
      } else {
        return { success: false };
      }
    } catch (error) {
      throw new HttpException('token not valid!', HttpStatus.BAD_REQUEST);
    }
  }

  async getSavedProfile(accessToken: string) {
    const decoded = await this.helper.decode(accessToken as string); // verify access token and get user from db
    const user = decoded ? await this.helper.validateUser(decoded) : null;
    if (!user) throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    const existingProfile = await this.userRepository.findOne({
      where: { email: user.email },
      relations: ['linkedin'],
    });
    if (existingProfile.linkedin) {
      delete existingProfile.linkedin.accessToken;
      delete existingProfile.linkedin.accessTokenExpiresAt;
      return existingProfile.linkedin;
    } else {
      throw new HttpException(
        'no linkedin profile found!',
        HttpStatus.NOT_FOUND
      );
    }
  }
}
