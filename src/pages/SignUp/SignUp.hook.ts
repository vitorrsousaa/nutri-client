import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

import { useAuth } from '../../hooks/useAuth';
import AuthService from '../../service/Auth';

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
      .email('Formato de e-mail inválido')
      .toLowerCase(),
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

export function useSignUpHook() {
  const methods = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
  });

  const { signIn } = useAuth();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: AuthService.signUp,
  });

  const {
    handleSubmit: hookFormSubmit,
    formState: { errors, isValid },
  } = methods;

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      const { email, name, password } = data;
      const newUser = { email, name, password };

      const { token } = await mutateAsync(newUser);

      signIn(token);
    } catch {
      toast.error('Erro ao cadastrar conta!');
    }
  });

  return {
    errors,
    methods,
    isLoading: isPending,
    isValid,
    handleSubmit,
  };
}
