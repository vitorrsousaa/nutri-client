import { useCallback } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { GenderEnum } from '../../../../entities/gender';

import { ModalCreatePatientProps } from './ModalCreatePatient';

const createPatientFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'E-mail é obrigatório' })
    .email('Formato de email inválido'),
  name: z.string().min(1, { message: 'Nome é obrigatório' }),
  height: z
    .string()
    .pipe(z.coerce.number())
    .refine((number) => number > 100, {
      message: 'Deve ser maior do que 100cm',
    }),
  weight: z
    .string()
    .pipe(z.coerce.number())
    .refine((number) => number > 10, {
      message: 'Deve ser maior do que 10 Kg',
    }),
  birthDate: z
    .string()
    .pipe(z.coerce.date())
    .refine((date) => date <= new Date(), {
      message: 'Data de nascimento não pode ser no futuro',
    }),
  gender: GenderEnum,
});

type CreatePatientFormSchema = z.infer<typeof createPatientFormSchema>;

export function useModalCreatePatient(props: ModalCreatePatientProps) {
  const { onClose } = props;

  const methods = useForm<CreatePatientFormSchema>({
    resolver: zodResolver(createPatientFormSchema),
  });

  const {
    handleSubmit: hookFormSubmit,
    formState: { errors, isValid },
    reset,
  } = methods;

  const handleSubmit = hookFormSubmit(async (data) => {
    console.log(data);
    console.log('chamar a function para criar o paciente');
    console.log('depois chamar a onClose', onClose);
  });

  const handleCloseModal = useCallback(() => {
    reset();
    onClose();
  }, [onClose]);

  return {
    errors,
    handleSubmit,
    methods,
    isValid,
    handleCloseModal,
  };
}
