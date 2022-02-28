/* eslint-disable no-unused-expressions */
import React from 'react';

import { useTheme } from '@emotion/react';
import { PlusIcon } from '@heroicons/react/solid';

import { createUserDoc } from '../features/docs/actions';
import { useAppDispatch, useAppSelector } from '../store';
import Button from './common/Button/Button';
import Text from './common/Text/Text';

export default function AddDocButton() {
  const user = useAppSelector(({ auth }) => auth.user);

  const dispatch = useAppDispatch();
  const theme = useTheme();

  const addDocHandler = async () => {
    user?.uid && dispatch(createUserDoc(user?.uid));
  };

  return (
    <Button colorTheme='secondary' size='lg' onClick={addDocHandler} style={{ margin: theme.space[3] }}>
      <PlusIcon height={16} />
      <Text style={{ marginLeft: theme.space[3] }} color={theme.color.gray[500]} size='sm'>
        new Folio
      </Text>
    </Button>
  );
}
