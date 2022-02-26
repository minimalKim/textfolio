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
        Object.keys(documents).map((docId) => (
          <DocumentListItem key={docId} onClick={() => navigate(`${docId}`)}>
            {documents[docId][0]?.html || '제목이 없습니다.'}
          </DocumentListItem>
        ))}
    </ul>
  );
}

const DocumentListItem = styled.li`
  padding: ${({ theme }) => theme.space[3]};
  &:hover {
    background: ${({ theme }) => theme.color.gray[50]};
  }
`;
