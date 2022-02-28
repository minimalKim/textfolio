/* eslint-disable no-unused-expressions */
import React, { useEffect } from 'react';

import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { TrashIcon } from '@heroicons/react/solid';
import { useNavigate } from 'react-router-dom';

import { deleteUserDoc, getUserDocs } from '../features/docs/actions';
import { useAppDispatch, useAppSelector } from '../store';
import DeleteButton from './common/Button/Button';
import Text from './common/Text/Text';

export default function DocumentList() {
  const user = useAppSelector(({ auth }) => auth.user);
  const documents = useAppSelector(({ docs }) => docs.documents);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const createOnClockDocHandler = (docId: string) => () => {
    navigate(`${docId}`);
  };

  const createDeleteDocHandler = (docId: string) => () => {
    navigate('doc', { replace: true });
    dispatch(deleteUserDoc(docId));
  };

  useEffect(() => {
    user?.uid && dispatch(getUserDocs(user?.uid));
  }, []);

  return (
    <ul>
      {documents &&
        documents.map(({ docId, blocks }) => {
          const hasTitle = blocks[0].html.length !== 0;
          return (
            <DocumentListItem key={docId}>
              <TextWrapper onClick={createOnClockDocHandler(docId)}>
                <Text
                  block
                  color={hasTitle ? theme.color.gray[800] : theme.color.gray[500]}
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  {hasTitle ? blocks[0].html : '제목 없음'}
                </Text>
              </TextWrapper>
              <DeleteButton
                size='sm'
                colorTheme='secondary'
                onClick={createDeleteDocHandler(docId)}
                style={{ marginRight: theme.space['3.5'] }}
              >
                <TrashIcon height={12} />
              </DeleteButton>
            </DocumentListItem>
          );
        })}
    </ul>
  );
}

const DocumentListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.1s ease-out;
  &:hover {
    background: ${({ theme }) => theme.color.gray[50]};
  }
`;

const TextWrapper = styled.div`
  padding: ${({ theme }) => theme.space['3.5']};
  width: 100%;
`;
