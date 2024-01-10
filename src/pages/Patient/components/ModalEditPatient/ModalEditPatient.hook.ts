import { useCallback, useEffect, useMemo } from 'react';

import { GenderEnum } from '@godiet-entities/gender';
import { StatusEnum } from '@godiet-entities/status';
import { useUpdatePatient } from '@godiet-hooks/patients';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as z from 'zod';

import { ModalEditPatientProps } from './ModalEditPatient';

const updatePatientFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'E-mail é obrigatório' })
    .email('Formato de email inválido'),
  height: z
    .string()
    .pipe(z.coerce.number())
    .refine((number) => number > 100, {
      message: 'Deve ser maior do que 100cm',
    })
    .optional(),
  weight: z
    .string()
    .pipe(z.coerce.number())
    .refine((number) => number > 10, {
      message: 'Deve ser maior do que 10 Kg',
    })
    .optional(),
  birthDate: z
    .string()
    .pipe(z.coerce.date())
    .refine((date) => date <= new Date(), {
      message: 'Data de nascimento não pode ser no futuro',
    })
    .optional(),
  gender: GenderEnum.optional(),
  status: StatusEnum.optional(),
});

type TUpdatePatientFormSchema = z.infer<typeof updatePatientFormSchema>;

export function useModalEditPatient(props: ModalEditPatientProps) {
  const { onClose, patient } = props;

  const methods = useForm<TUpdatePatientFormSchema>({
    resolver: zodResolver(updatePatientFormSchema),
  });

  const {
    handleSubmit: hookFormSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
  } = methods;

  const { isUpdatingPatient, updatePatient } = useUpdatePatient(patient.id);

  const handleCloseModal = useCallback(() => {
    reset();
    onClose();
  }, [onClose, reset]);

  const handleSubmit = hookFormSubmit(async (data) => {
    const newPatient = { name: patient.name, id: patient.id, ...data };

    try {
      await updatePatient(newPatient);

      toast.success('Paciente atualizado com sucesso');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.message.includes('Patient already exists')) {
        toast.error('E-mail já cadastrado');
        return;
      }

      toast.error('Erro ao atualizar paciente');
    } finally {
      handleCloseModal();
    }
  });

  const handleSetValues = useCallback(() => {
    setValue(
      'birthDate',
      patient?.birthDate
        ? (new Date(patient?.birthDate)
            // eslint-disable-next-line indent
            .toISOString()
            // eslint-disable-next-line indent
            .split('T')[0] as unknown as Date)
        : undefined
    );

    setValue('email', patient.email, { shouldValidate: true });
    setValue('gender', patient?.gender || undefined, { shouldValidate: true });
    setValue('height', patient?.height || undefined);
    setValue('status', patient?.status || undefined);
    setValue('weight', patient?.weight || undefined);
  }, [patient, setValue]);

  const formIsValid = useMemo(() => {
    return isValid;
  }, [isValid]);

  useEffect(() => {
    handleSetValues();
  }, [handleSetValues]);

  return {
    methods,
    formIsValid,
    errors,
    isUpdatingPatient,
    handleSubmit,
    handleCloseModal,
  };
}
