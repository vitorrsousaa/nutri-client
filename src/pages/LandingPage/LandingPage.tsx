import Button from '@godiet-ui/Button';
import Text from '@godiet-ui/Text';

import { Link } from 'react-router-dom';

import LogoImg from '../../assets/images/logo.png';

import * as styled from './LandingPage.styles';

export function LandingPage() {
  return (
    <styled.LandingPageContainer>
      <header className="container-header">
        <div>
          <img src={LogoImg} alt="logo-go-diet" />
          <span style={{ display: 'flex', gap: 0 }}>
            <Text as="h1" fontSize={24} color="0F0F2C">
              go
            </Text>
            <Text as="h1" fontSize={24} fontWeight={700} color="#59BD5A">
              Diet
            </Text>
          </span>
        </div>
        <div>
          <Link to={'/login'}>
            <Button variant="secondary">Acessar</Button>
          </Link>
          <Link to={'/register'}>
            <Button>Criar conta</Button>
          </Link>
        </div>
      </header>

      <div className="container-hero">
        <div>
          <Text as="h1" fontSize={'32px'} fontWeight={600}>
            Software para otimizar seus atendimentos
          </Text>
          <Text fontSize={'16px'} marginTop={'16px'} marginBottom={'16px'}>
            O goDiet é um software que vai te ajudar a otimizar seus
            atendimentos, te ajudando a organizar suas consultas, prescrições e
            muito mais.
          </Text>
          <Link to={'/register'}>
            <Button>Experimente agora</Button>
          </Link>
        </div>
      </div>
    </styled.LandingPageContainer>
  );
}
