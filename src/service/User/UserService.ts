import HttpClient from '../HttpClient';

export class Service {
  private httpClient;

  constructor() {
    this.httpClient = new HttpClient();
    this.recover = this.recover.bind(this);
  }

  async recover() {
    const user = await this.httpClient.get<{ email: string; name: string }>(
      '/user/recover'
    );

    console.log('recover', user);

    return user;
  }
}
