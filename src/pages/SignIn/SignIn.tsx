import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

const signInFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email('Formato de email inválido')
    .toLowerCase(),
  password: z
    .string()
    .min(8, { message: 'Password must be atleast 8 characters' }),
});

type SignInFormSchema = z.infer<typeof signInFormSchema>;

export function SignIn() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignInFormSchema>({ resolver: zodResolver(signInFormSchema) });

  const handleSignIn: SubmitHandler<SignInFormSchema> = async (data) => {
    console.log(data);
  };

  return (
    <div>
      <h1>SignIn</h1>
      <form style={{ width: 300 }} onSubmit={handleSubmit(handleSignIn)}>
        <input placeholder="email" type="email" {...register('email')} />
        {errors.email && <small>{errors.email.message}</small>}
        <input
          placeholder="password"
          type="password"
          {...register('password')}
        />
        {errors.password && <small>{errors.password.message}</small>}
        <button type="submit">submit</button>
      </form>
    </div>
  );
}
