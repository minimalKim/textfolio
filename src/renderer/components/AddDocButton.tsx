/* eslint-disable no-unused-expressions */
import React from 'react';

import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { PlusIcon } from '@heroicons/react/solid';

import { createUserDoc } from '../features/docs/actions';
import { useAppDispatch, useAppSelector } from '../store';
import Text from './common/Text/Text';

export default function AddDocButton() {
  const user = useAppSelector(({ auth }) => auth.user);

  const dispatch = useAppDispatch();
  const theme = useTheme();

  const addDocHandler = async () => {
    user?.uid && dispatch(createUserDoc(user?.uid));
  };

  return (
    <AddDocButtonContainer onClick={addDocHandler}>
      <PlusIcon height={16} />
      <Text style={{ marginLeft: theme.space['1.5'] }}>new Folio</Text>
    </AddDocButtonContainer>
  );
}

const AddDocButtonContainer = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.space[3]};
  display: flex;
  justify-content: center;
`;
