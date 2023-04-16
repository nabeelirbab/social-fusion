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
import { Client, Conversation, PeopleSearchHit } from 'linkedin-private-api';
import { CookieJar } from 'tough-cookie';

@Injectable()
export class LinkedinService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;
  @InjectRepository(Linkedin)
  private readonly linkedinRepository: Repository<Linkedin>;
  @Inject(AuthHelper)
  private readonly helper: AuthHelper;
  private api: Client;
  private cookieJar: CookieJar;

  constructor() {
    this.api = new Client();
  }
  async login(accessToken: string) {
    const verified = await this.getUserAuthVerified(accessToken);
    if (!verified) {
      throw new HttpException(
        'Invalid Request User not verified',
        HttpStatus.BAD_REQUEST
      );
    }
    const username = (process.env.USERNAME as string) || '03170431427';
    const password = (process.env.PASSWORD as string) || 'hymissrumi';
    // const client = new Client();
    try {
      await this.api.login.userPass({
        username,
        password,
        useCache: false,
      });
      return 'success';
    } catch (error) {
      throw new HttpException('conenction failed', HttpStatus.BAD_GATEWAY);
    }
    // const conversations = await client.conversation.getConversations().fetch();

    // console.log(conversations);
    // console.log(res);
    // const jobsScroller = await client.search.searchJobs({
    //   keywords: 'React',
    //   filters: { location: 'Israel' },
    //   limit: 20,
    //   skip: 5,
    // });

    // const [someReactJobHit] = await jobsScroller.scrollNext();
    // const jobCompanyName =
    //   someReactJobHit.hitInfo.jobPosting.companyDetails.company.name;

    // Fetch the job's company
    // const companiesScroller = await client.search.searchCompanies({
    //   keywords: jobCompanyName,
    // });
    // const [{ company: jobCompany }] = await companiesScroller.scrollNext();

    // Search for profiles and send an invitation
    // const peopleScroller = await client.search.searchPeople({
    //   keywords: 'Nimra Sarfraz',
    // });
    // const [{ profile: billGates }] = await peopleScroller.scrollNext();

    // await client.invitation.sendInvitation({
    //   profileId: billGates.profileId,
    //   trackingId: billGates.trackingId,
    // });

    // Search in my connections
    // const ownConnectionsScroller = await client.search.searchOwnConnections({
    //   keywords: 'Nimra Sarfraz',
    //   limit: 1,
    // });
    // const [{ profile: user }] = await ownConnectionsScroller.scrollNext();
    // console.log(user);

    // const user = await ownConnectionsScroller.fetch(); // all users

    // Get conversation
    // const [billConversation] = await client.conversation
    //   .getConversations({
    //     recipients: user.profileId,
    //   })
    //   .scrollNext();
    // console.log(user.profileId);

    // const conversationMessages = await client.message
    //   .getMessages({
    //     conversationId: billConversation.conversationId,
    //   })
    //   .scrollNext();
    // console.log(conversationMessages);
    // Send a message
    // const sentMessage = await client.message.sendMessage({
    //   profileId: user.profileId,
    //   text: 'test 123!',
    // });
  }

  async searchConnections(
    query: string,
    accessToken: string
  ): Promise<PeopleSearchHit[]> {
    const verified = await this.getUserAuthVerified(accessToken);
    if (!verified) {
      throw new HttpException(
        'Invalid Request User not verified',
        HttpStatus.BAD_REQUEST
      );
    }
    const search = this.api.search;

    // Search within the user's connections
    const ownConnectionsScroller = await search.searchOwnConnections({
      keywords: query,
      limit: 10, // Adjust the limit as needed
    });

    const connections: PeopleSearchHit[] = [];
    let hasNext = true;

    while (hasNext) {
      const batch = await ownConnectionsScroller.scrollNext();

      if (batch.length === 0) {
        hasNext = false;
      } else {
        connections.push(...batch);
      }
    }

    return connections;
  }

  async getAllChats(accessToken: string): Promise<Conversation[]> {
    const verified = await this.getUserAuthVerified(accessToken);
    if (!verified) {
      throw new HttpException(
        'Invalid Request User not verified',
        HttpStatus.BAD_REQUEST
      );
    }
    const messaging = this.api.conversation;
    const conversations = await messaging.getConversations().fetch();
    return conversations;
  }

  async getChatByProfileId(
    profileId: string,
    accessToken: string
  ): Promise<MessageEvent[]> {
    const verified = await this.getUserAuthVerified(accessToken);
    if (!verified) {
      throw new HttpException(
        'Invalid Request User not verified',
        HttpStatus.BAD_REQUEST
      );
    }
    const conversation = this.api.conversation;

    // Fetch all conversations
    const conversations = await conversation.getConversations().fetch();

    // Find the conversation with the specified profileId
    const chat: any = conversations.find((conv) =>
      conv.participants.some(
        (participant) => participant.profileId === profileId
      )
    );
    const chats: any = await this.api.message
      .getMessages({
        conversationId: chat.conversationId,
      })
      .scrollNext();

    return chats;
  }

  async sendMessage(profileId: string, accessToken: string) {
    const verified = await this.getUserAuthVerified(accessToken);
    if (!verified) {
      throw new HttpException(
        'Invalid Request User not verified',
        HttpStatus.BAD_REQUEST
      );
    }
    const chat = await this.api.message.sendMessage({
      profileId: profileId,
      text: `hy whatsup`,
    });
    return chat;
  }

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

  async createChat(token: string) {
    const decoded = await this.helper.decode(token as string); // verify access token and get user from db
    const user = decoded ? await this.helper.validateUser(decoded) : null;
    if (!user) throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    const existingProfile = await this.userRepository.findOne({
      where: { email: user.email },
      relations: ['linkedin'],
    });
    const name = 'nimra sarfraz';
    const accessToken = existingProfile.linkedin.accessToken;

    // Step 1: Search for the recipient's profile
    const searchEndpoint = `https://api.linkedin.com/v2/messages`;
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      // 'X-Restli-Protocol-Version': '202204.01', // Add LinkedIn-Version header
      'LinkedIn-Version': '202210',
    };
    const data = {
      recipients: ['urn:li:person:123ABC', 'urn:li:person:456DEF'],
      subject: 'Group conversation title',
      body: 'Hello everyone! This is a message conversation to demo the Message API.',
      messageType: 'MEMBER_TO_MEMBER',
      attachments: ['urn:li:digitalMediaAsset:123ABC'],
    };

    axios
      .post(searchEndpoint, data, {
        headers,
      })
      .then((response) => {
        const profiles = response.data.elements;
        console.log(profiles);
        if (profiles.length === 0) {
          console.log('No results found for search query');
        } else {
          // Step 2: Extract the recipient's member ID
          const recipientId = profiles[0].id;

          console.log(`Found profile for ${name}: ${recipientId}`);

          // Call function to send message using recipientId
          sendMessage(recipientId, accessToken);
        }
      })
      .catch((error) => {
        console.error('Error searching for profiles:', error.response.data);
      });

    function sendMessage(recipientId, accessToken) {
      // Step 3 and 4: Create a new conversation and send a message
      // Use the code example I provided earlier to send a message
    }
  }

  async getUserAuthVerified(token: string): Promise<boolean> {
    const decoded = await this.helper.decode(token as string); // verify access token and get user from db
    const user = decoded ? await this.helper.validateUser(decoded) : null;
    if (!user) throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    const existingProfile = await this.userRepository.findOne({
      where: { email: user.email },
      relations: ['linkedin'],
    });
    if (existingProfile.linkedin) {
      if (existingProfile.linkedin.accessTokenExpiresAt < new Date()) {
        return false;
      }
      const accessToken = existingProfile.linkedin.accessToken;
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        'cache-control': 'no-cache',
        'X-Restli-Protocol-Version': '2.0.0',
      };
      try {
        const response = await axios.get('https://api.linkedin.com/v2/me', {
          headers,
        });
        return true;
      } catch (error) {
        return false;
      }
    } else {
      throw new HttpException('profile not found!', HttpStatus.NOT_FOUND);
    }
  }
}
