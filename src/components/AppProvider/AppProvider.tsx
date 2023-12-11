import { useCallback } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';
import Button from '../../libs/ui/components/Button';
import Divider from '../../libs/ui/components/Divider';
import Spinner from '../../libs/ui/components/Spinner';
import HeaderPage from '../HeaderPage';
import Sidebar from '../Sidebar';

import * as styled from './AppProvider.styles';

interface AppProviderProps {
  children: React.ReactNode;
  className?: string;
  title: string;
  extraHeader?: React.ReactNode;
  isLoading?: boolean;
  hasError?: boolean;
  errorMessage?: React.ReactNode;
  hasBackButton?: boolean;
}

export function AppProvider(props: AppProviderProps) {
  const {
    children,
    className,
    title,
    extraHeader,
    isLoading,
    hasError,
    errorMessage,
    hasBackButton,
  } = props;

  const { name } = useAuth();

  const navigate = useNavigate();

  const returnPage = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <styled.AppProviderContainer
      className={`app-provider ${className ?? ''}`.trim()}
    >
      <Sidebar />

      <styled.AppProviderContent>
        <HeaderPage title={title} username={name}>
          {extraHeader && extraHeader}
          {hasBackButton && <Button onClick={returnPage}>Voltar</Button>}
        </HeaderPage>
        <Divider />
        {isLoading ? (
          <styled.AppProviderEmptyContainer>
            <Spinner />
          </styled.AppProviderEmptyContainer>
        ) : hasError ? (
          <styled.AppProviderEmptyContainer>
            {errorMessage ? (
              errorMessage
            ) : (
              <>
                <strong>Tivemos um erro!</strong>
                <strong>Por favor, tente novamente.</strong>
              </>
            )}
          </styled.AppProviderEmptyContainer>
        ) : (
          <>{children}</>
        )}
      </styled.AppProviderContent>
    </styled.AppProviderContainer>
  );
}
