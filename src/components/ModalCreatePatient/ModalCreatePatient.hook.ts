import { useCallback } from 'react';

import { GenderEnum } from '@godiet-entities/gender';
import { useCreatePatients } from '@godiet-hooks/patients';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as z from 'zod';

import { ModalCreatePatientProps } from './ModalCreatePatient';

const createPatientFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'E-mail é obrigatório' })
    .email('Formato de email inválido'),
  name: z.string().min(1, { message: 'Nome é obrigatório' }),
  gender: GenderEnum,
  birthDate: z
    .string()
    .pipe(z.coerce.date())
    .refine((date) => date <= new Date(), {
      message: 'Data de nascimento não pode ser no futuro',
    }),
});

type TCreatePatientFormSchema = z.infer<typeof createPatientFormSchema>;

export function useModalCreatePatient(props: ModalCreatePatientProps) {
  const { onClose } = props;

  const methods = useForm<TCreatePatientFormSchema>({
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
  }, [onClose, reset]);

  return {
    errors,
    isCreatingPatient,
    methods,
    isValid,
    handleSubmit,
    handleCloseModal,
  };
}
