import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
    onSubmit: async (values) => {
      dispatch(signInUser(values));
    },
  });

  return (
    <div>
      <h2>Sign in</h2>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input type='email' name='email' onChange={handleChange} value={values.email} />
        <label>Password</label>
        <input type='password' name='password' onChange={handleChange} value={values.password} />
        <button type='submit'>Sign in</button>
        {isLoading ? 'loading...' : ''}
      </form>
      {JSON.stringify(errors)}
    </div>
  );
}
