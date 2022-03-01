/* eslint-disable no-unused-expressions */
import React, { useEffect } from 'react';

import { getUserDocs } from '../features/docs/actions';
import { useAppDispatch, useAppSelector } from '../store';
import DocumentListItem from './DocumentListItem';

export default function DocumentList() {
  const user = useAppSelector(({ auth }) => auth.user);
  const documents = useAppSelector(({ docs }) => docs.documents);
  const dispatch = useAppDispatch();

  useEffect(() => {
    user?.uid && dispatch(getUserDocs(user?.uid));
  }, []);

  return (
    <ul>
      {documents &&
        documents.map(({ docId, blocks }) => {
          const hasTitle = blocks[0].html.length !== 0;
          return <DocumentListItem key={docId} docId={docId} blocks={blocks} hasTitle={hasTitle} />;
        })}
    </ul>
  );
}
