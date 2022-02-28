/* eslint-disable no-unused-expressions */
import React, { useEffect } from 'react';

import styled from '@emotion/styled';
import { useNavigate, useParams } from 'react-router-dom';

import AddDocButton from '../components/AddDocButton';
import DocumentList from '../components/DocumentList';
import Editor from '../components/Editor';
import { useAppSelector } from '../store';

export default function DocumentsPage() {
  const newDocId = useAppSelector(({ docs }) => docs.createDoc.newDocId);
  const { docId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    newDocId && navigate(newDocId);
  }, [newDocId]);

  return (
    <div>
      <SubSideNavBar>
        <DocumentList />
        <AddDocButton />
      </SubSideNavBar>
      <RightSection>{docId && <Editor docId={docId} />}</RightSection>
    </div>
  );
}

const SubSideNavBar = styled.div`
  width: 230px;
  height: calc(100vh - 74px);
  position: absolute;
  left: 74px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  border-right: 1px solid ${({ theme }) => theme.color.gray[100]};
`;

const RightSection = styled.div`
  position: absolute;
  left: 304px;
  width: calc(100vw - 304px);
  height: 100%;
  overflow-x: auto;
`;
