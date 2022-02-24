/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useRef, useState } from 'react';

import ContentEditable from 'react-contenteditable';

// eslint-disable-next-line import/no-cycle
import { Block } from './Editor';

export type EditableBlockProps = {
  id: string;
  html: string;
  tag: string;
  isFocus: boolean;
  updateBlock: (block: Block) => void;
  addBlock: (currentBlockId: string) => void;
  deleteBlock: (currentBlockId: string) => boolean;
  onBlur: (currentBlockId: string) => void;
};

function EditableBlock({
  id,
  html,
  tag,
  isFocus,
  updateBlock,
  addBlock,
  deleteBlock,
  onBlur,
}: EditableBlockProps) {
  const [block, setBlock] = useState({ id, html, tag, isFocus });
  const [keyInfos, setKeyInfos] = useState({ htmlBackup: '', previousKey: '' });
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (isFocus) {
      ref.current?.focus();
    }
  }, [isFocus]);

  const changeHandler = (e: any) => {
    updateBlock({ ...block, html: e.target.value });
    setBlock({ ...block, html: e.target.value });
  };

  const onKeyDownHandler = (e: React.KeyboardEvent) => {
    if (e.key === '/') {
      setKeyInfos((prev) => ({ ...prev, htmlBackup: block.html }));
    }
    if (e.key === 'Enter') {
      if (keyInfos.previousKey === 'Shift') return;
      e.preventDefault();
      addBlock(id);
    }
    if (e.key === 'Backspace') {
      if (!ref.current?.textContent) {
        e.preventDefault();
        const isDisabledDelete = deleteBlock(id);
        !isDisabledDelete && setCaretToEnd(ref.current?.previousElementSibling as HTMLElement);
      }
    }

    setKeyInfos((prev) => ({ ...prev, previousKey: e.key }));
  };

  return (
    <ContentEditable
      id={id}
      innerRef={ref}
      tagName={block.tag}
      html={block.html}
      onChange={changeHandler}
      onKeyDown={onKeyDownHandler}
      onBlur={() => {
        onBlur(id);
      }}
    />
  );
}

function setCaretToEnd(el: HTMLElement) {
  const range = document.createRange();
  const selection = window.getSelection();
  range.selectNodeContents(el);
  range.collapse(false);
  selection?.removeAllRanges();
  selection?.addRange(range);
}

export default EditableBlock;
