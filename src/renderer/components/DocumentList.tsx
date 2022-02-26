/* eslint-disable no-unused-expressions */
import React, { useEffect } from 'react';

import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import { getUserDocs } from '../features/docs/actions';
import { useAppDispatch, useAppSelector } from '../store';

export default function DocumentList() {
  const user = useAppSelector(({ auth }) => auth.user);
  const documents = useAppSelector(({ docs }) => docs.documents);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    user?.uid && dispatch(getUserDocs(user?.uid));
  }, []);

  return (
    <ul>
      {documents &&
        documents.map(({ docId, blocks }) => {
          const hasTitle = blocks[0].html.length !== 0;
          return (
            <DocumentListItem key={docId} hasTitle={hasTitle} onClick={() => navigate(`${docId}`)}>
              {hasTitle ? blocks[0].html : '제목 없음'}
            </DocumentListItem>
          );
        })}
    </ul>
  );
}

const DocumentListItem = styled.li<{ hasTitle: boolean }>`
  padding: ${({ theme }) => theme.space['3.5']};
  transition: all 0.1s ease-out;
  color: ${({ theme, hasTitle }) => (hasTitle ? theme.color.gray[800] : theme.color.gray[400])};
  &:hover {
    background: ${({ theme }) => theme.color.gray[50]};
  }
`;
