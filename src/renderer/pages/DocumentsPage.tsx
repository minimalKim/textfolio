import React from 'react';

import styled from '@emotion/styled';
import { useLocation, useParams } from 'react-router-dom';

import DocumentList from '../components/DocumentList';
import Editor from '../components/Editor';

export default function DocumentsPage() {
  const { hash } = useLocation();
  const { docId } = useParams();

  console.log(docId);
  // if (docId) {
  // }

  return (
    <div>
      <DocumentList />
      <RightSection>
        <Editor docId={docId} />
      </RightSection>
    </div>
  );
}

const RightSection = styled.div`
  position: absolute;
  left: 324px;
`;
