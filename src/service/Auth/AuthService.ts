import { TUser, TUserPersistance } from '../../entities/user';
import HttpClient from '../HttpClient';

import AuthMapper from './mappers';

export class Service {
  constructor(private readonly httpClient: HttpClient) {
    this.signIn = this.signIn.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  async signIn(user: {
    email: string;
    password: string;
  }): Promise<TUser & { token: string }> {
    const response = await this.httpClient.post<
      TUserPersistance & { token: string },
      { email: string; password: string }
    >('/signIn', user);

    const { token, ...userPersistance } = response;

    const userMapped = AuthMapper.toDomain(userPersistance);

    return {
      ...userMapped,
      token,
    };
  }

  async signUp(user: {
    email: string;
    password: string;
    name: string;
  }): Promise<TUser & { token: string }> {
    const userPrisma = AuthMapper.toPrisma(user);

    const response = await this.httpClient.post<
      TUserPersistance & { token: string },
      { email: string; password: string }
    >('/signUp', userPrisma);

    const { token, ...userPersistance } = response;

    const userMapped = AuthMapper.toDomain(userPersistance);

    return {
      ...userMapped,
      token,
    };
  }
}
