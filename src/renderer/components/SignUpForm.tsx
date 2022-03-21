import React from 'react';

import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';

import { signUpUser } from '../features/auth/actions';
import useForm from '../hooks/useForm';
import { useAppSelector } from '../store';
import Button from './common/Button';
import Input from './common/Input';
import Text from './common/Text';

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

  if (!username.length) errors.username = '이름을 입력해 주세요';
  else if (!usernameRegex.test(username))
    errors.username = '3 ~ 16자의 한글, 영어 소문자 또는 숫자를 입력해 주세요';

  if (!avatar) errors.avatar = '사진(url)을 입력해 주세요';
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
  const SignUpResponseError = useAppSelector(({ auth }) => auth.signUp.error);

  return (
    <Form onSubmit={handleSubmit}>
      <Container>
        <Label htmlFor='username'>
          User Name
          <Input
            type='text'
            id='username'
            name='username'
            variant='filled'
            value={values.username}
            isError={!!errors?.email}
            onChange={handleChange}
          />
        </Label>
        <Text block color='danger' size='xs'>
          {errors?.username}
        </Text>
      </Container>

      <Container>
        <Label htmlFor='email'>
          Email
          <Input
            type='email'
            id='email'
            name='email'
            variant='filled'
            value={values.email}
            isError={!!errors?.email}
            onChange={handleChange}
          />
        </Label>
        <Text block color='danger' size='xs'>
          {errors?.email}
        </Text>
      </Container>

      <Container>
        <Label htmlFor='password'>
          Password
          <Input
            type='password'
            id='password'
            name='password'
            variant='filled'
            value={values.password}
            isError={!!errors?.email}
            onChange={handleChange}
          />
        </Label>
        <Text block color='danger' size='xs'>
          {errors?.password}
        </Text>
      </Container>

      <Container>
        <Label htmlFor='avatar'>
          Avatar
          <Input
            type='text'
            id='avatar'
            name='avatar'
            variant='filled'
            value={values.avatar}
            isError={!!errors?.email}
            onChange={handleChange}
          />
        </Label>
        <Text block color='danger' size='xs'>
          {errors?.avatar}
        </Text>
      </Container>

      <Button type='submit' style={{ width: '100%' }}>
        Sign up
      </Button>
      {isLoading ? 'loading...' : ''}
      <Text block color='danger' size='xs'>
        {SignUpResponseError}
      </Text>
    </Form>
  );
}

const Form = styled.form`
  & > * + * {
    margin-top: ${({ theme }) => theme.space[4]};
  }
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.color.gray[600]};
  > input {
    margin-top: ${({ theme }) => theme.space[2]};
  }
`;

const Container = styled.div`
  display: relative;
  margin-bottom: ${({ theme }) => theme.space[6]};
  > label {
    margin-bottom: ${({ theme }) => theme.space[1]};
  }
  > div {
    position: absolute;
  }
`;
