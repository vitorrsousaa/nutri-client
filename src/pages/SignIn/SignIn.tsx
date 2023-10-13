import { useSignInHook } from './SignIn.hook';

export function SignIn() {
  const { errors, handleSubmit, isLoading, register } = useSignInHook();

  return (
    <div>
      <h1>sign in</h1>
      <form style={{ width: 300 }} onSubmit={handleSubmit}>
        <input placeholder="email" type="email" {...register('email')} />
        {errors.email && <small>{errors.email.message}</small>}
        <input
          placeholder="password"
          type="password"
          {...register('password')}
        />
        {errors.password && <small>{errors.password.message}</small>}
        <button type="submit">submit</button>
        {isLoading && <strong>isLoading</strong>}
      </form>
    </div>
  );
}
