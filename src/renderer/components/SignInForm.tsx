import React from 'react';

import { useDispatch } from 'react-redux';

import { signInUser } from '../features/auth/actions';
import useForm from '../hooks/useForm';

type FormValue = {
  email: string;
  password: string;
};

export function SignInForm() {
  const dispatch = useDispatch();
  const { values, errors, isLoading, handleChange, handleSubmit } = useForm<FormValue>({
    initialValues: { email: '', password: '' },
    onSubmit: (values) => dispatch(signInUser(values)),
  });

  return (
    <div>
      <h2>Sign in</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor='email'>
          Email
          <input type='email' id='email' name='email' value={values.email} onChange={handleChange} />
        </label>

        <label htmlFor='password'>
          Password
          <input
            type='password'
            id='password'
            name='password'
            value={values.password}
            onChange={handleChange}
          />
        </label>

        <button type='submit'>Sign in</button>
        {isLoading ? 'loading...' : ''}
      </form>
      {JSON.stringify(errors)}
    </div>
  );
}
