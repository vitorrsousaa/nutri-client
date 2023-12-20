import { TPatient } from '@godiet-entities/patient/TPatient';
import Button from '@godiet-ui/Button';
import FormField from '@godiet-ui/FormField';
import Input from '@godiet-ui/Input';
import InputNumber from '@godiet-ui/InputNumber';
import Modal from '@godiet-ui/Modal';
import Radio from '@godiet-ui/Radio';

import { FormProvider } from 'react-hook-form';

import { useModalEditPatient } from './ModalEditPatient.hook';

export interface ModalEditPatientProps {
  isOpen: boolean;
  onClose: () => void;
  patient: TPatient;
}

export function ModalEditPatient(props: ModalEditPatientProps) {
  const { isOpen } = props;

  const {
    methods,
    errors,
    formIsValid,
    isUpdatingPatient,
    handleSubmit,
    handleCloseModal,
  } = useModalEditPatient(props);

  return (
    <Modal.Root
      isOpen={isOpen}
      onClose={handleCloseModal}
      isLoading={isUpdatingPatient}
    >
      <Modal.Content>
        <Modal.Header>
          Editando um paciente
          <Modal.CloseButton isDisabled={isUpdatingPatient} />
        </Modal.Header>
        <Modal.Body>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit} id="update-patient-form">
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
                <InputNumber placeholder="Altura em centímetros" min={100} />
              </FormField>

              <FormField
                isInvalid={Boolean(errors.weight)}
                name="weight"
                errorMessage={errors.weight?.message}
                label="Insira o peso do paciente (kilogramas)"
              >
                <InputNumber placeholder="Peso em Kg" min={10} />
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

              <FormField
                isInvalid={Boolean(errors.birthDate)}
                name="birthDate"
                errorMessage={errors.birthDate?.message}
                label="Insira a data de nascimento do paciente"
              >
                <Input placeholder="birthDate" type="date" />
              </FormField>
            </form>
          </FormProvider>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="ghost"
            type="button"
            onClick={handleCloseModal}
            isDisabled={isUpdatingPatient}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            form="update-patient-form"
            isDisabled={!formIsValid}
            isLoading={isUpdatingPatient}
          >
            Salvar
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal.Root>
  );
}
