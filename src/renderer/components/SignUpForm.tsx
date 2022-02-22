import React from 'react';

import { useDispatch } from 'react-redux';

import { signUpUser } from '../features/auth/actions';
import useForm from '../hooks/useForm';

type FormValue = {
  username: string;
  email: string;
  password: string;
  avatar: string;
};

const signUpFormValidate = ({ username, avatar }: FormValue) => {
  const errors: Partial<FormValue> = {};
  const imageUrlRegex =
    // eslint-disable-next-line no-useless-escape
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
  const usernameRegex = /^[a-z0-9가-힣_-]{3,16}$/;

  if (!username) errors.username = '이메일을 입력해 주세요';
  if (!usernameRegex.test(username))
    errors.username = '3 ~ 16자의 한글, 영어 소문자 또는 숫자를 입력해 주세요';

  if (!avatar) errors.avatar = '사진을 입력해 주세요';
  if (!imageUrlRegex) errors.avatar = '유효한 url을 입력해 주세요';

  return errors;
};

export function SignUpForm() {
  const dispatch = useDispatch();
  const { values, errors, isLoading, handleChange, handleSubmit } = useForm<FormValue>({
    initialValues: { username: '', email: '', password: '', avatar: '' },
    onSubmit: (values) => dispatch(signUpUser(values)),
    validate: signUpFormValidate,
  });

  return (
    <div>
      <h2>Sign up</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor='username'>
          User Name
          <input type='text' id='username' name='username' value={values.username} onChange={handleChange} />
        </label>

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

        <label htmlFor='avatar'>
          Avatar
          <input type='text' id='avatar' name='avatar' value={values.avatar} onChange={handleChange} />
        </label>

        <button type='submit'>Sign up</button>
        {isLoading ? 'loading...' : ''}
      </form>
      {JSON.stringify(errors)}
    </div>
  );
}
