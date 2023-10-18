import { Button } from '@chakra-ui/react';
import { FormProvider } from 'react-hook-form';

import FormField from '../../../../libs/ui/components/FormField';
import Input from '../../../../libs/ui/components/Input';
import InputNumber from '../../../../libs/ui/components/InputNumber';
import Modal from '../../../../libs/ui/components/Modal';
import Radio from '../../../../libs/ui/components/Radio';

import { useModalCreatePatient } from './ModalCreatePatient.hook';

export interface ModalCreatePatientProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalCreatePatient(props: ModalCreatePatientProps) {
  const { isOpen } = props;

  const { errors, handleSubmit, methods, isValid, handleCloseModal } =
    useModalCreatePatient(props);

  return (
    <Modal.Root isOpen={isOpen} onClose={handleCloseModal}>
      <Modal.Content>
        <Modal.Header>
          Criando um novo paciente
          <Modal.CloseButton />
        </Modal.Header>
        <form
          style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
          onSubmit={handleSubmit}
        >
          <FormProvider {...methods}>
            <FormField
              isInvalid={Boolean(errors.name)}
              name="name"
              errorMessage={errors.name?.message}
              label="Insira o nome do paciente"
            >
              <Input placeholder="Nome" />
            </FormField>

            <FormField
              isInvalid={Boolean(errors.email)}
              name="email"
              errorMessage={errors.email?.message}
              label="Insira o e-mail do paciente"
            >
              <Input placeholder="E-mail" type="email" />
            </FormField>

            <FormField
              isInvalid={Boolean(errors.height)}
              name="height"
              errorMessage={errors.height?.message}
              label="Insira a altura do paciente (centímetros)"
            >
              <InputNumber
                placeholder="Altura em centímetros"
                min={100}
                defaultValue={100}
              />
            </FormField>

            <FormField
              isInvalid={Boolean(errors.weight)}
              name="weight"
              errorMessage={errors.weight?.message}
              label="Insira o peso do paciente (kilogramas)"
            >
              <InputNumber
                placeholder="Peso em Kg"
                min={10}
                defaultValue={20}
              />
            </FormField>

            <FormField
              isInvalid={Boolean(errors.gender)}
              name="gender"
              errorMessage={errors.gender?.message}
              label="Selecione o gênero do paciente"
              defaultValue={'MASC'}
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

            <FormField
              isInvalid={Boolean(errors.birthDate)}
              name="birthDate"
              errorMessage={errors.birthDate?.message}
              label="Insira a data de nascimento do paciente"
            >
              <input placeholder="birthDate" type="date" />
            </FormField>
          </FormProvider>

          <Button
            type="submit"
            isDisabled={!isValid}
            style={{ backgroundColor: isValid ? '#195' : '#ccc' }}
          >
            submit
          </Button>
        </form>
      </Modal.Content>
    </Modal.Root>
  );
}
