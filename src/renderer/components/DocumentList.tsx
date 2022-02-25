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
  useEffect(() => {
    user?.uid && dispatch(getUserDocs(user?.uid));
  }, []);
  const navigate = useNavigate();

  return (
    <DocumentListWrapper>
      <ul>
        {Object.keys(documents).map((documentId) => (
          <DocumentListItem key={documentId} onClick={() => navigate(`${documentId}`)}>
            ${documents[documentId][0].html}
          </DocumentListItem>
        ))}
      </ul>
    </DocumentListWrapper>
  );
}

const DocumentListWrapper = styled.div`
  width: 230px;
  height: 100%;
  position: absolute;
  left: 74px;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-right: 1px solid ${({ theme }) => theme.color.gray[100]};
`;

const DocumentListItem = styled.li`
  padding: ${({ theme }) => theme.space[3]};
  &:hover {
    background: ${({ theme }) => theme.color.gray[50]};
  }
`;
