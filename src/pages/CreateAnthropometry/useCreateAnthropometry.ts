import { useMemo } from 'react';

import {
  useCreateAnthropometry,
  useGetAllAntropometry,
} from '@godiet-hooks/anthropometry';
import { useFindPatientById } from '@godiet-hooks/patients';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as z from 'zod';

const CreateAnthropometrySchema = z.object({
  weight: z
    .string()
    .nonempty()
    .pipe(z.coerce.number())
    .refine((weight) => weight > 0, {
      message: 'Peso deve ser maior que 0',
    }),
  height: z
    .string()
    .nonempty()
    .pipe(z.coerce.number())
    .refine((weight) => weight > 0, {
      message: 'Altura deve ser maior que 0',
    }),
  date: z.string().refine((date) => new Date(date) <= new Date(), {
    message: 'Data de avaliação não pode ser no futuro',
  }),
});

type TCreateAnthropometrySchema = z.infer<typeof CreateAnthropometrySchema>;

export function useCreateAnthropometryHook() {
  const params = useParams<{ id: string }>();

  const navigate = useNavigate();

  const { patient } = useFindPatientById(params.id);

  const { createAnthropometry, isCreatingAnthropometry } =
    useCreateAnthropometry(patient?.id);

  const { refetchAnthropometry } = useGetAllAntropometry(patient?.id || '');

  const methods = useForm<TCreateAnthropometrySchema>({
    resolver: zodResolver(CreateAnthropometrySchema),
  });

  const {
    handleSubmit: hookFormSubmit,
    formState: { errors, isValid: formIsValid },
    control,
  } = methods;

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await createAnthropometry({
        date: data.date,
        height: data.height,
        weight: data.weight,
        patientId: patient?.id || '',
      });

      toast.success('Antropometria criada com sucesso');
      refetchAnthropometry();
    } catch {
      toast.error('Erro ao criar antropometria');
    } finally {
      navigate(-1);
    }
  });

  const watchWeight = useWatch({
    control,
    name: 'weight',
  });

  const watchHeight = useWatch({
    control,
    name: 'height',
  });

  const getIMC = useMemo(() => {
    if (watchWeight && watchHeight) {
      const string = (
        watchWeight /
        (watchHeight / 100) /
        (watchHeight / 100)
      ).toFixed(2);

      return parseFloat(string);
    }

    return 0;
  }, [watchHeight, watchWeight]);

  const getClassificationOfIMC = useMemo(() => {
    if (getIMC < 18.5) {
      return 'Abaixo do peso';
    }

    if (getIMC >= 18.5 && getIMC < 24.9) {
      return 'Peso normal';
    }

    if (getIMC >= 25 && getIMC < 29.9) {
      return 'Sobrepeso';
    }

    if (getIMC >= 30 && getIMC < 34.9) {
      return 'Obesidade grau 1';
    }

    if (getIMC >= 35 && getIMC < 39.9) {
      return 'Obesidade grau 2';
    }

    if (getIMC >= 40) {
      return 'Obesidade grau 3';
    }
  }, [getIMC]);

  return {
    methods,
    getClassificationOfIMC,
    handleSubmit,
    errors,
    formIsValid,
    watchHeight,
    watchWeight,
    getIMC,
    isCreatingAnthropometry,
  };
}
