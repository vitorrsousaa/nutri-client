import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { z } from 'zod';

import { useAuth } from '../../hooks/useAuth';
import AuthService from '../../service/Auth';

const signInFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email('Formato de email inválido'),
  password: z
    .string()
    .min(8, { message: 'Password must be atleast 8 characters' }),
});

type SignInFormSchema = z.infer<typeof signInFormSchema>;

export function useSignInHook() {
  const {
    handleSubmit: hookFormSubmit,
    register,
    resetField,
    setFocus,
    formState: { errors },
  } = useForm<SignInFormSchema>({ resolver: zodResolver(signInFormSchema) });

  const { signIn, signedIn } = useAuth();

  const navigate = useNavigate();

  const { isLoading, mutateAsync } = useMutation({
    mutationFn: AuthService.signIn,
  });

  useEffect(() => {
    if (signedIn) {
      navigate('/dashboard');
    }
  }, [signedIn]);

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      const { token } = await mutateAsync(data);

      signIn(token);
    } catch {
      resetField('password');
      setFocus('password');
      toast.error('Email ou senha incorretos');
    }
  });

  return {
    errors,
    handleSubmit,
    isLoading,
    register,
  };
}
