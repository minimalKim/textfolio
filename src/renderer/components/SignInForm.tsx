import React from 'react';

import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';

import { signInUser } from '../features/auth/actions';
import useForm from '../hooks/useForm';
import { useAppSelector } from '../store';
import Button from './common/Button/Button';
import Input from './common/Input/Input';
import Text from './common/Text/Text';

type FormValue = {
  email: string;
  password: string;
};

export function SignInForm() {
  const { values, errors, isLoading, handleChange, handleSubmit } = useForm<FormValue>({
    initialValues: { email: '', password: '' },
    onSubmit: (values) => dispatch(signInUser(values)),
  });
  const dispatch = useDispatch();
  const SignInResponseError = useAppSelector(({ auth }) => auth.signIn.error);

  return (
    <div>
      <Form onSubmit={handleSubmit}>
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
              isError={!!errors?.password}
              onChange={handleChange}
            />
          </Label>
          <Text block color='danger' size='xs'>
            {errors?.password}
          </Text>
        </Container>

        <Button type='submit' width='100%'>
          Sign in
        </Button>
        {isLoading ? 'loading...' : ''}
        <Text block color='danger' size='xs'>
          {SignInResponseError}
        </Text>
      </Form>
    </div>
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
