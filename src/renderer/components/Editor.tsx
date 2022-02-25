/* eslint-disable no-unused-expressions */
/* eslint-disable import/order */
/* eslint-disable consistent-return */
import styled from '@emotion/styled/types/base';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { db } from '../db/firestore';

import useDebounce from '../hooks/useDebounce';
import { useAppSelector } from '../store';

import EditableBlock, { Block } from './EditableBlock';

const uid = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const initialBlock: Block = { id: uid(), html: '', tag: 'p', isFocus: true };

type EditorProps = {
  docId?: string;
};

export default function Editor({ docId }: EditorProps) {
  const [blocks, setBlocks] = useState([initialBlock]);
  const user = useAppSelector(({ auth }) => auth.user);
  const docIdRef = useRef('');
  const document = useAppSelector(({ docs }) => docId && docs.documents[docId]);

  useEffect(() => {
    if (docId && document) {
      docIdRef.current = docId;
      setBlocks(document);
    }
  }, [docId]);

  useDebounce(
    async () => {
      if (blocks.length === 1 && blocks[0].html === '') return;
      if (user?.uid && docIdRef.current) {
        const docRef = doc(db, 'docs', user?.uid);
        await updateDoc(docRef, { [docIdRef.current]: blocks });
        // await setDoc(docRef, { [`docs-${uid()}`]: blocks });
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
    const newBlock = { id: uid(), html: '', tag: 'p', isFocus: true };
    const currentBlockIndex = blocks.map((block) => block.id).indexOf(currentBlockId);

    setBlocks((prevBlocks) => {
      const updatedBlocks = [...prevBlocks];
      updatedBlocks[currentBlockIndex].isFocus = false;
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
      updatedBlocks[currentBlockIndex - 1].isFocus = true;
      return updatedBlocks;
    });

    return isDisabled;
  };

  return (
    <div>
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
    </div>
  );
}
