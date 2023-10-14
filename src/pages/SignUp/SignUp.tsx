import { useSignUpHook } from './SignUp.hook';

export function SignUp() {
  const { errors, handleSubmit, isLoading, register } = useSignUpHook();

  return (
    <div>
      <h1>SignUp</h1>
      <form style={{ width: 300 }} onSubmit={handleSubmit}>
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
        {isLoading && <strong>isLoading</strong>}
      </form>
    </div>
  );
}
