import { TUser, TUserPersistance } from '../../entities/user';
import HttpClient from '../HttpClient';

import AuthMapper from './mappers';

export class Service {
  private httpClient;

  constructor() {
    const instance = new HttpClient();
    this.httpClient = instance;
    this.signIn = this.signIn.bind(this);
  }

  async signIn(user: {
    email: string;
    password: string;
  }): Promise<TUser & { token: string }> {
    const response = await this.httpClient.post<
      TUserPersistance & { token: string },
      { email: string; password: string }
    >('/auth/signIn', user);

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
    >('/auth/signUp', userPrisma);

    const { token, ...userPersistance } = response;

    const userMapped = AuthMapper.toDomain(userPersistance);

    return {
      ...userMapped,
      token,
    };
  }
}
