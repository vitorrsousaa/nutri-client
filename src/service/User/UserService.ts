import HttpClient from '../HttpClient';

export class Service {
  constructor(private readonly httpClient: HttpClient) {
    this.recover = this.recover.bind(this);
  }

  async recover() {
    const user = await this.httpClient.get<{
      email: string;
      name: string;
      id: string;
    }>('/recover');

    return user;
  }
}
