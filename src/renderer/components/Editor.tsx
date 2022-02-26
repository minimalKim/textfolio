/* eslint-disable no-unused-expressions */
/* eslint-disable import/order */
/* eslint-disable consistent-return */
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUserDoc } from '../features/docs/actions';

import useDebounce from '../hooks/useDebounce';
import { useAppSelector } from '../store';
import { makeId } from '../utils';

import EditableBlock, { Block } from './EditableBlock';

const initialBlock: Block = { id: makeId(), html: '', tag: 'h2', isFocus: true };

type EditorProps = {
  docId?: string;
};

export default function Editor({ docId }: EditorProps) {
  const [blocks, setBlocks] = useState([initialBlock]);
  const user = useAppSelector(({ auth }) => auth.user);
  const dispatch = useDispatch();
  const document = useAppSelector(({ docs }) => {
    if (docId) return docs.documents.find(({ docId: documentId }) => documentId === docId);
  });

  useEffect(() => {
    if (!document?.blocks.length) {
      setBlocks([initialBlock]);
      return;
    }
    setBlocks(document.blocks);
  }, [document]);

  useDebounce(
    async () => {
      if (blocks.length < 1 && blocks[0]?.html === '') return;
      if (user?.uid && docId) {
        dispatch(updateUserDoc({ docId, blocks }));
      }
    },
    300,
    [blocks],
  );

  const updateEditorHandler = (updateBlock: Block) => {
    const index = blocks.map((block) => block.id).indexOf(updateBlock.id);

    setBlocks((prevBlocks) => {
      const updatedBlocks = [...prevBlocks];
      updatedBlocks[index] = {
        ...updatedBlocks[index],
        tag: updateBlock.tag,
        html: updateBlock.html,
      };
      return updatedBlocks;
    });
  };

  const addBlockEditorHandler = (currentBlockId: string) => {
    const newBlock = { id: makeId(), html: '', tag: 'p', isFocus: true };
    const currentBlockIndex = blocks.map((block) => block.id).indexOf(currentBlockId);

    setBlocks((prevBlocks) => {
      const updatedBlocks = [...prevBlocks];
      // updatedBlocks[currentBlockIndex].isFocus = false;
      updatedBlocks.splice(currentBlockIndex + 1, 0, newBlock);
      return updatedBlocks;
    });
  };

  const onBlurHandler = (currentBlockId: string) => {
    // const currentBlockIndex = blocks.map((block) => block.id).indexOf(currentBlockId);
    // setBlocks((prevBlocks) => {
    //   const updatedBlocks = [...prevBlocks];
    //   updatedBlocks[currentBlockIndex].isFocus = false;
    //   return updatedBlocks;
    // });
  };

  const deleteBlockHandler = (currentBlockId: string) => {
    const isDisabled = blocks.length === 1;
    if (isDisabled) return isDisabled;
    const currentBlockIndex = blocks.map((block) => block.id).indexOf(currentBlockId);

    setBlocks((prevBlocks) => {
      const updatedBlocks = [...prevBlocks];
      updatedBlocks.splice(currentBlockIndex, 1);
      // updatedBlocks[currentBlockIndex - 1].isFocus = true;
      return updatedBlocks;
    });

    return isDisabled;
  };

  return (
    <EditorWrapper>
      {blocks.map(({ id, html, tag, isFocus }) => (
        <EditableBlock
          key={id}
          id={id}
          html={html}
          tag={tag}
          isFocus={isFocus}
          updateBlock={updateEditorHandler}
          addBlock={addBlockEditorHandler}
          deleteBlock={deleteBlockHandler}
          onBlur={onBlurHandler}
        />
      ))}
    </EditorWrapper>
  );
}

const EditorWrapper = styled.div`
  height: 100%;
  background-color: white;
  margin: ${({ theme }) => `${theme.space[4]} ${theme.space[8]}`};
  padding: ${({ theme }) => theme.space[8]};
  border-radius: ${({ theme }) => theme.radius.lg};
`;
