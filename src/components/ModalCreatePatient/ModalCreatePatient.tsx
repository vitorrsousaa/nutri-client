import FormField from '@godiet-ui/FormField';
import Input from '@godiet-ui/Input';
import Modal from '@godiet-ui/Modal';
import Radio from '@godiet-ui/Radio';
import Text from '@godiet-ui/Text';

import { Button } from '@chakra-ui/react';
import { FormProvider } from 'react-hook-form';

import { useModalCreatePatient } from './ModalCreatePatient.hook';
import * as styled from './ModalCreatePatient.styles';

export interface ModalCreatePatientProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalCreatePatient(props: ModalCreatePatientProps) {
  const { isOpen } = props;

  const {
    errors,
    handleSubmit,
    methods,
    isValid,
    handleCloseModal,
    isCreatingPatient,
  } = useModalCreatePatient(props);

  return (
    <Modal.Root
      isOpen={isOpen}
      onClose={handleCloseModal}
      isLoading={isCreatingPatient}
    >
      <Modal.Content>
        <Modal.Header>
          Criando um novo paciente
          <Modal.CloseButton isDisabled={isCreatingPatient} />
        </Modal.Header>
        <Modal.Body>
          <Text color={'#666'} fontSize={'14px'} marginTop={'4px'}>
            Preencha as informações abaixo. Os demais dados podem ser
            completados na ficha do paciente.
          </Text>

          <styled.ModalCreatePatientFormContainer
            onSubmit={handleSubmit}
            id="create-patient-form"
          >
            <FormProvider {...methods}>
              <FormField
                isInvalid={Boolean(errors.name)}
                name="name"
                errorMessage={errors.name?.message}
                label="Insira o nome do paciente"
              >
                <Input placeholder="Nome do paciente" />
              </FormField>

              <FormField
                isInvalid={Boolean(errors.email)}
                name="email"
                errorMessage={errors.email?.message}
                label="Insira o e-mail do paciente"
              >
                <Input placeholder="E-mail do paciente" type="email" />
              </FormField>

              <FormField
                isInvalid={Boolean(errors.birthDate)}
                name="birthDate"
                errorMessage={errors.birthDate?.message}
                label="Insira a data de nascimento do paciente"
              >
                <Input placeholder="birthDate" type="date" />
              </FormField>

              <FormField
                isInvalid={Boolean(errors.gender)}
                name="gender"
                errorMessage={errors.gender?.message}
                label="Selecione o gênero do paciente"
              >
                <Radio
                  direction="row"
                  name="gender"
                  options={[
                    { label: 'MASC', value: 'MASC' },
                    { label: 'FEM', value: 'FEM' },
                  ]}
                />
              </FormField>
            </FormProvider>
          </styled.ModalCreatePatientFormContainer>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant={'ghost'}
            onClick={handleCloseModal}
            isDisabled={isCreatingPatient}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            isDisabled={!isValid}
            isLoading={isCreatingPatient}
            form="create-patient-form"
          >
            Cadastrar
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal.Root>
  );
}
