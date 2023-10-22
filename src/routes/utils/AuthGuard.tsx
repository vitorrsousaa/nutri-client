import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';

type AuthGuardProps = {
  children: ReactNode;
};

export function AuthGuard(props: AuthGuardProps) {
  const { children } = props;

  const { signedIn } = useAuth();

  // if (loading) {
  //   return <h1>loading...</h1>;
  // }

  if (!signedIn) {
    return <Navigate to="/" />;
  }

  return children;
}
