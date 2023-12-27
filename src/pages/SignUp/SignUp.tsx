import Button from '@godiet-ui/Button';
import Divider from '@godiet-ui/Divider';
import FormField from '@godiet-ui/FormField';
import Input from '@godiet-ui/Input';
import Text from '@godiet-ui/Text';

import { FormProvider } from 'react-hook-form';
import { Link as ReactRouterLink } from 'react-router-dom';

import { useSignUpHook } from './SignUp.hook';
import * as styled from './SignUp.styles';

export function SignUp() {
  const { errors, methods, isLoading, isValid, handleSubmit } = useSignUpHook();

  return (
    <styled.SignUpPageContainer>
      <div className="form-container">
        <div className="form-content">
          <Text align={'center'} fontSize={'20px'}>
            Para criar uma conta, preencha os dados abaixo:
          </Text>
          <FormProvider {...methods}>
            <styled.SignUpFormContainer onSubmit={handleSubmit}>
              <FormField
                label="Nome"
                errorMessage={errors.name?.message}
                name="name"
              >
                <Input placeholder="Seu nome completo" type="text" />
              </FormField>
              <FormField
                label="E-mail de acesso"
                errorMessage={errors.email?.message}
                name="email"
              >
                <Input placeholder="email@email.com" type="email" />
              </FormField>
              <FormField
                label="Senha de acesso"
                errorMessage={errors.password?.message}
                name="password"
              >
                <Input placeholder="*********" type="password" />
              </FormField>
              <FormField
                label="Confirmação de senha"
                errorMessage={errors.confirmPassword?.message}
                name="confirmPassword"
              >
                <Input placeholder="*********" type="password" />
              </FormField>

              <Button type="submit" isDisabled={!isValid} isLoading={isLoading}>
                Criar sua conta
              </Button>
            </styled.SignUpFormContainer>
          </FormProvider>
          <Divider height={'1px'} />
          <div className="form-cta-container">
            <Text as="small" color={'#888'} fontSize={'12px'}>
              Já tem uma conta?
            </Text>
            <ReactRouterLink to="/login">
              <Text as={'strong'} color="#666" fontSize={'12px'}>
                Acesse agora
              </Text>
            </ReactRouterLink>
          </div>
        </div>
      </div>
      <div className="image-container"></div>
    </styled.SignUpPageContainer>
  );
}
