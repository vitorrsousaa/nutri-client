import { createContext, useCallback, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import UserService from '../../service/User';
import token from '../../storage/token';

type AuthContextValue = {
  email: string | undefined;
  name: string | undefined;
  signedIn: boolean;
  signIn: (accessToken: string) => void;
  signOut: () => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider(props: { children: React.ReactNode }) {
  const { children } = props;
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storagedAccessToken = token.get();

    return !!storagedAccessToken;
  });

  const { data, isError, isFetching, isSuccess, remove } = useQuery({
    queryKey: ['users', 'me'],
    queryFn: UserService.recover,
    enabled: signedIn,
    staleTime: Infinity,
  });

  const signIn = useCallback((accessToken: string) => {
    token.set(accessToken);

    setSignedIn(true);
  }, []);

  const signOut = useCallback(() => {
    token.remove();

    remove();

    setSignedIn(false);
  }, [remove]);

  useEffect(() => {
    if (isError) {
      toast.error('Erro ao cadastrar conta!');

      signOut();
    }
  }, [isError, signOut]);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        email: data?.email,
        name: data?.name,
        signedIn: isSuccess && signedIn,
      }}
    >
      {!isFetching && children}
    </AuthContext.Provider>
  );
}
