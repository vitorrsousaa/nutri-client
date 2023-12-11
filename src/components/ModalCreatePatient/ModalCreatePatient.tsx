import FormField from '@godiet-ui/FormField';
import Input from '@godiet-ui/Input';
import Modal from '@godiet-ui/Modal';

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
          </FormProvider>
        </styled.ModalCreatePatientFormContainer>
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
