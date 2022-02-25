/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useRef, useState } from 'react';

import { css } from '@emotion/react';
import ContentEditable from 'react-contenteditable';

// eslint-disable-next-line import/no-cycle
import { Block } from './Editor';
import SelectMenu from './SelectMenu';

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
  const [keyInfos, setKeyInfos] = useState<{ htmlBackup: null | string; previousKey: null | string }>({
    htmlBackup: '',
    previousKey: '',
  });
  const [selectMenuIsOpen, setSelectMenuIsOpen] = useState(false);
  const [selectMenuPosition, setSelectMenuPosition] = useState<{ x: null | number; y: null | number }>({
    x: null,
    y: null,
  });
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

  const closeSelectMenuHandler = () => {
    setKeyInfos({ ...keyInfos, htmlBackup: null });
    setSelectMenuIsOpen(false);
    setSelectMenuPosition({ x: null, y: null });
    ref.current?.focus();
    document.removeEventListener('click', closeSelectMenuHandler);
  };

  const openSelectMenuHandler = () => {
    const { x, y } = getCaretCoordinates();
    setSelectMenuIsOpen(true);
    setSelectMenuPosition({ x, y });
    ref.current?.blur();
    document.addEventListener('click', closeSelectMenuHandler);
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

  const onKeyUpHandler = (e: React.KeyboardEvent) => {
    if (e.key === '/') {
      openSelectMenuHandler();
    }
  };

  const tagSelectionHandler = (tag: string) => {
    setBlock({ ...block, tag, html: keyInfos.htmlBackup || '' });
    ref.current && setCaretToEnd(ref.current);
    closeSelectMenuHandler();
  };

  return (
    <>
      {selectMenuIsOpen && (
        <SelectMenu
          position={selectMenuPosition}
          onSelect={tagSelectionHandler}
          onClose={closeSelectMenuHandler}
        />
      )}

      <ContentEditable
        id={id}
        innerRef={ref}
        tagName={block.tag}
        html={block.html}
        onChange={changeHandler}
        onKeyDown={onKeyDownHandler}
        onKeyUp={onKeyUpHandler}
        onBlur={() => {
          onBlur(id);
        }}
        css={style}
      />
    </>
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

function getCaretCoordinates() {
  let [x, y] = [0, 0];
  const selection = window.getSelection();
  if (selection?.rangeCount !== 0) {
    const range = selection?.getRangeAt(0).cloneRange();
    range?.collapse(false);
    const rect = range?.getBoundingClientRect();
    if (rect) {
      [x, y] = [rect.left, rect.top];
    }
  }
  return { x, y };
}

const style = css`
  padding: 0.2rem;
`;

export default EditableBlock;
