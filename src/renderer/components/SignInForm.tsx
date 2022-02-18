import React, { useState } from 'react';
import useForm from '../hooks/useForm';

type FormValue = {
  email: string;
  password: string;
};

const signInValidate = ({ email, password }: FormValue) => {
  const errors: Partial<FormValue> = {};
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const passwordAsteriskRegex = /^(?=.*[!@#$%^*+=-]).{6,16}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{6,16}$/i;

  if (!email) errors.email = '이메일을 입력해 주세요';
  if (!password) errors.password = '비밀번호를 입력해 주세요';
  if (!emailRegex.test(email)) errors.email = '유효한 이메일이 아닙니다';
  if (!passwordAsteriskRegex.test(password))
    errors.password = '비밀번호에 특수문자(!@#$%^*+=-) 중 하나를 포함해주세요';
  if (!passwordRegex.test(password))
    errors.password = '6 ~ 16자 사이의 영문 + 숫자 + 특수문자 조합의 비밀번호를 입력해 주세요';
  return errors;
};

export function SignInForm() {
  const { values, errors, loading, handleChange, handleSubmit } = useForm<FormValue>({
    initialValues: { email: '', password: '' },
    onSubmit: async (values) => {
      alert(JSON.stringify(values));
    },
    validate: signInValidate,
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
        {loading ? 'loading...' : ''}
      </form>
      {JSON.stringify(errors)}
    </div>
  );
}
