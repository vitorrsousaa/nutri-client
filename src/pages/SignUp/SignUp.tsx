import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

const registerFormSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: 'Name is required' })
      .transform((text) => {
        return text
          .trim()
          .split(' ')
          .map((word) => {
            return word[0].toLocaleUpperCase().concat(word.substring(1));
          })
          .join(' ');
      }),
    email: z
      .string()
      .min(1, { message: 'E-mail é obrigatório' })
      .email('Formato de e-mail inválido'),
    password: z
      .string()
      .min(8, { message: 'Password must be atleast 8 characters' }),
    confirmPassword: z
      .string()
      .min(8, { message: 'Password must be atlest 8' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Senhas diferentes',
    path: ['confirmPassword'],
  });

type RegisterFormSchema = z.infer<typeof registerFormSchema>;

export function SignUp() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
  });

  const handleSignUp: SubmitHandler<RegisterFormSchema> = async (data) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return (
    <div>
      <h1>SignUp</h1>
      <form style={{ width: 300 }} onSubmit={handleSubmit(handleSignUp)}>
        <input placeholder="name" type="text" {...register('name')} />
        {errors.name && <small>{errors.name.message}</small>}
        <input placeholder="email" type="email" {...register('email')} />
        {errors.email && <small>{errors.email.message}</small>}
        <input
          type="password"
          placeholder="password"
          {...register('password')}
        />
        {errors.password && <small>{errors.password.message}</small>}
        <input
          type="password"
          placeholder="confirm password"
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && (
          <small>{errors.confirmPassword.message}</small>
        )}

        <button type="submit">submit</button>
      </form>
    </div>
  );
}
