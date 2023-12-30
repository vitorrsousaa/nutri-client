import { useMemo } from 'react';

import Accordion from '@godiet-ui/Accordion';
import Button from '@godiet-ui/Button';
import Text from '@godiet-ui/Text';

import { Link } from 'react-router-dom';

import LogoImg from '../../assets/images/logo.png';

import * as styled from './LandingPage.styles';

export function LandingPage() {
  const accordionItems = useMemo(
    () => [
      {
        id: 'accordion_1',
        title: 'Preciso instalar o goDiet? Pode ser utilizado offline?',
        content:
          'O goDiet é um software que deve ser utilizado on-line, ou seja, não é necessário realizar instalação no computador. Porém, seu uso depende de internet e pode ser feito em qualquer computador',
      },
      {
        id: 'accordion_2',
        title:
          'Encontrei um erro na aplicação ou quero dar uma sugestão de funcionalidade, como posso entrar em contato?',
        content:
          'Você pode entrar em contato diretamente pelo instagram ou através do e-mail',
      },
    ],
    []
  );

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

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 16,
          padding: '16px 128px',
        }}
      >
        <Text as="h3" fontSize={'56px'} fontWeight={600}>
          Dúvidas frequentes
        </Text>
        <Accordion.Root allowMultiple width={'100%'}>
          {accordionItems.map((item) => (
            <Accordion.Item key={item.id}>
              <Accordion.Header>{item.title}</Accordion.Header>
              <Accordion.Panel>{item.content}</Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </styled.LandingPageContainer>
  );
}
