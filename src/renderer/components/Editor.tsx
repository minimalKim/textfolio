/* eslint-disable consistent-return */
import React, { useState } from 'react';

// eslint-disable-next-line import/no-cycle
import EditableBlock from './EditableBlock';

export type Block = {
  id: string;
  html: string;
  tag: string;
  isFocus: boolean;
};

const uid = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
const initialBlock: Block = { id: uid(), html: '', tag: 'p', isFocus: true };

export default function Editor() {
  const [blocks, setBlocks] = useState([initialBlock]);

  const updateEditorHandler = (updateBlock: Block) => {
    const index = blocks.map((block) => block.id).indexOf(updateBlock.id);
    const updatedBlocks = [...blocks];

    updatedBlocks[index] = {
      ...updatedBlocks[index],
      tag: updateBlock.tag,
      html: updateBlock.html,
    };
    setBlocks(updatedBlocks);
  };

  const addBlockEditorHandler = (currentBlockId: string) => {
    const newBlock = { id: uid(), html: '', tag: 'p', isFocus: true };
    const currentBlockIndex = blocks.map((block) => block.id).indexOf(currentBlockId);
    const updatedBlocks = [...blocks];
    updatedBlocks[currentBlockIndex].isFocus = false;
    updatedBlocks.splice(currentBlockIndex + 1, 0, newBlock);

    setBlocks(updatedBlocks);
  };

  const onBlurHandler = (currentBlockId: string) => {
    const currentBlockIndex = blocks.map((block) => block.id).indexOf(currentBlockId);
    const updatedBlocks = [...blocks];
    updatedBlocks[currentBlockIndex].isFocus = false;
  };

  const deleteBlockHandler = (currentBlockId: string) => {
    const isDisabled = blocks.length === 1;
    if (isDisabled) return isDisabled;
    const currentBlockIndex = blocks.map((block) => block.id).indexOf(currentBlockId);
    const updatedBlocks = [...blocks];
    updatedBlocks.splice(currentBlockIndex, 1);
    updatedBlocks[currentBlockIndex - 1].isFocus = true;

    setBlocks(updatedBlocks);

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
