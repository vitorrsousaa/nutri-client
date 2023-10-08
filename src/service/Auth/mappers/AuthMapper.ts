import { TUser, TUserPersistance } from '../../../entities/user';

class AuthMapper {
  toDomain(user: TUserPersistance): TUser {
    return {
      email: user.email,
      name: user.name,
    };
  }

  toPrisma(user: { email: string; password: string; name: string }): {
    email: string;
    password: string;
    name: string;
  } {
    return {
      email: user.email,
      name: user.name,
      password: user.password,
    };
  }
}

export default new AuthMapper();
