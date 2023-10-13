import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { GenderEnum } from '../../entities/gender';

const createPatientFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email('Formato de email inválido'),
  name: z.string(),
  height: z.number().positive(),
  weight: z.number().positive(),
  birthDate: z
    .string()
    .pipe(z.coerce.date())
    .refine((date) => date <= new Date(), {
      message: 'Birth date cannot be in the future',
    }),
  gender: GenderEnum,
});

type CreatePatientFormSchema = z.infer<typeof createPatientFormSchema>;

export function CreatePatient() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CreatePatientFormSchema>({
    resolver: zodResolver(createPatientFormSchema),
  });

  const handleSignIn: SubmitHandler<CreatePatientFormSchema> = async (data) => {
    console.log(data);
  };

  return (
    <div>
      <h1>create patient</h1>
      <form style={{ width: 300 }} onSubmit={handleSubmit(handleSignIn)}>
        <input placeholder="email" type="email" {...register('email')} />
        {errors.email && <small>{errors.email.message}</small>}

        <input placeholder="name" type="string" {...register('name')} />
        {errors.name && <small>{errors.name.message}</small>}

        <input placeholder="height" type="number" {...register('height')} />
        {errors.height && <small>{errors.height.message}</small>}

        <input placeholder="weight" type="number" {...register('weight')} />
        {errors.weight && <small>{errors.weight.message}</small>}

        <input placeholder="birthDate" type="date" {...register('birthDate')} />
        {errors.birthDate && <small>{errors.birthDate.message}</small>}

        <button type="submit">submit</button>
      </form>
    </div>
  );
}
