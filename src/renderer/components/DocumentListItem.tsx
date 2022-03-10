import React from 'react';

import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { TrashIcon } from '@heroicons/react/solid';
import { useNavigate } from 'react-router-dom';

import { deleteUserDoc } from '../features/docs/actions';
import { useAppDispatch } from '../store';
import DeleteButton from './common/Button';
import Text from './common/Text';
import { Block } from './EditableBlock';

type DocumentListItemProps = {
  docId: string;
  blocks: Block[];
  hasTitle: boolean;
};

function DocumentListItem({ docId, blocks, hasTitle }: DocumentListItemProps) {
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const createOnClockDocHandler = (docId: string) => () => {
    navigate(`${docId}`);
  };

  const createDeleteDocHandler = (docId: string) => () => {
    navigate('doc', { replace: true });
    dispatch(deleteUserDoc(docId));
  };

  return (
    <DocumentListItemContainer key={docId}>
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
    </DocumentListItemContainer>
  );
}

export default React.memo(DocumentListItem);

const DocumentListItemContainer = styled.li`
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
