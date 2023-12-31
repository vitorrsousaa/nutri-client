import { TOKEN_COLLECTION } from '../config';

class TokenStorage {
  get(): string | null {
    const tokenJSON = localStorage.getItem(TOKEN_COLLECTION);

    if (tokenJSON) {
      return tokenJSON;
    }

    return null;
  }

  set(token: string) {
    localStorage.setItem(TOKEN_COLLECTION, token);
  }

  remove() {
    localStorage.removeItem(TOKEN_COLLECTION);
  }
}

export default new TokenStorage();
