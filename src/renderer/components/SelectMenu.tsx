/* eslint-disable no-case-declarations */
import React, { useEffect, useRef, useState } from 'react';

import styled from '@emotion/styled';

type SelectMenuProps = {
  position: { x: number | null; y: number | null };
  onSelect: (tag: string) => void;
  onClose: () => void;
};

const allowedTags = [
  {
    id: 'page-title',
    tag: 'h1',
    label: 'h1',
  },
  {
    id: 'heading',
    tag: 'h2',
    label: 'h2',
  },
  {
    id: 'subheading',
    tag: 'h3',
    label: 'h3',
  },
  {
    id: 'paragraph',
    tag: 'p',
    label: 'text',
  },
];

export default function SelectMenu({ position, onSelect, onClose }: SelectMenuProps) {
  const [command, setCommand] = useState('');
  const [selectedItemIdx, setSelectedItemIdx] = useState(0);
  const selectedItemIdxForEnter = useRef(0);

  useEffect(() => {
    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, []);

  function keyDownHandler(e: any) {
    const lastItemIdx = allowedTags.length - 1;
    const { current } = selectedItemIdxForEnter;

    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        onSelect(allowedTags[current].tag);
        break;
      case 'Backspace':
        if (!command) onClose();
        setCommand((prevCommand) => prevCommand.substring(0, prevCommand.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedItemIdx((prevIdx) => (prevIdx === 0 ? lastItemIdx : prevIdx - 1));
        selectedItemIdxForEnter.current = current === 0 ? lastItemIdx : current - 1;
        break;
      case 'ArrowDown':
      case 'Tab':
        e.preventDefault();
        setSelectedItemIdx((prevIdx) => (prevIdx === lastItemIdx ? 0 : prevIdx + 1));
        selectedItemIdxForEnter.current = current === lastItemIdx ? 0 : current + 1;
        break;
      default:
        setCommand((prevCommand) => prevCommand + e.key);
    }
  }

  return (
    <SelectMenuWrapper position={position}>
      {allowedTags.map((item) => {
        const isSelected = allowedTags.indexOf(item) === selectedItemIdx;
        return (
          <SelectMenuItem
            key={item.id}
            isSelected={isSelected}
            type='button'
            tabIndex={0}
            onClick={() => onSelect(item.tag)}
          >
            {item.label}
          </SelectMenuItem>
        );
      })}
    </SelectMenuWrapper>
  );
}

const SelectMenuWrapper = styled.div<{ position: { x: number | null; y: number | null } }>`
  position: absolute;
  top: ${({ position }) => position.y}px;
  left: ${({ position }) => position.x}px;
  display: flex;
  flex-direction: column;
`;

const SelectMenuItem = styled.button<{ isSelected: boolean }>`
  background-color: ${({ theme, isSelected }) =>
    isSelected ? theme.color.gray[700] : theme.color.gray[100]};
`;
