import Button from '@godiet-ui/Button';
import Divider from '@godiet-ui/Divider';
import FormField from '@godiet-ui/FormField';
import Input from '@godiet-ui/Input';
import Text from '@godiet-ui/Text';

import { FormProvider } from 'react-hook-form';
import { Link as ReactRouterLink } from 'react-router-dom';

import { useSignInHook } from './SignIn.hook';
import * as styled from './SignIn.styles';

export function SignIn() {
  const { errors, methods, isLoading, isValid, handleSubmit } = useSignInHook();

  return (
    <styled.SignInPageContainer>
      <div className="form-container">
        <div className="form-content">
          <Text align={'center'} fontSize={'20px'}>
            Para acessar o goDiet, realize o login abaixo:
          </Text>
          <FormProvider {...methods}>
            <styled.SignInFormContainer onSubmit={handleSubmit}>
              <FormField
                label="E-mail de acesso"
                errorMessage={errors.email?.message}
                name="email"
              >
                <Input placeholder="email@email.com" type="email" />
              </FormField>
              <FormField
                label="Senha"
                name="password"
                errorMessage={errors.password?.message}
              >
                <Input placeholder="********" type="password" />
              </FormField>

              <Button type="submit" isDisabled={!isValid} isLoading={isLoading}>
                Acessar sua conta
              </Button>
            </styled.SignInFormContainer>
          </FormProvider>
          <Divider height={'1px'} />
          <div className="form-cta-container">
            <Text as="small" color={'#888'} fontSize={'12px'}>
              Ainda não tem uma conta?
            </Text>
            <ReactRouterLink to="/register">
              <Text as={'strong'} color="#666" fontSize={'12px'}>
                Crie agora
              </Text>
            </ReactRouterLink>
          </div>
        </div>
      </div>
      <div className="image-container"></div>
    </styled.SignInPageContainer>
  );
}
