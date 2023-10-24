import { useCallback } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as z from 'zod';

import { GenderEnum } from '../../../../entities/gender';
import { useCreatePatients } from '../../../../hooks/patients';

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
    setError,
    reset,
  } = methods;

  const { createPatient, isCreatingPatient } = useCreatePatients();

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await createPatient(data);

      toast.success('Paciente criado com sucesso');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.message === '404 - Email already in use') {
        toast.error('Este e-mail já esta em uso');
        setError('email', { message: 'E-mail já cadastrado' });
        return;
      }
      toast.error('Erro ao criar paciente');
    }

    onClose();
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
    isLoading: isCreatingPatient,
  };
}
