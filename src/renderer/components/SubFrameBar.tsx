import React from 'react';

import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import Avatar from './common/Avatar/Avatar';
import Button from './common/Button/Button';
import Image from './common/Image/Image';
import Text from './common/Text/Text';

type SubFrameBarProps = {
  canGoBack?: boolean;
};

export default function SubFrameBar({ canGoBack = false }: SubFrameBarProps) {
  const theme = useTheme();

  return (
    <SubFrameBarWrapper>
      <SubFrameBarInner>
        <SubFrameBarInnerLeft>
          Logo
          <Image src='' alt='' style={undefined} />
          {canGoBack && <Button theme='secondary'>Back</Button>}
        </SubFrameBarInnerLeft>
        <SubFrameBarInnerRight>
          <Avatar
            shape='circle'
            alt='avatar'
            size={50}
            threshold={0}
            style={{ marginRight: theme.space[4] }}
          />
          <Text strong size='lg'>
            Hi, user
          </Text>
          <Button theme='secondary' style={{ marginLeft: theme.space[12] }}>
            Sign Out
          </Button>
        </SubFrameBarInnerRight>
      </SubFrameBarInner>
    </SubFrameBarWrapper>
  );
}

const SubFrameBarWrapper = styled.div`
  background-color: white;
  border-bottom: ${({ theme }) => `1px solid ${theme.color.gray[200]}`};
  position: absolute;
  padding: 0 ${({ theme }) => theme.space[12]};
  height: 74px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SubFrameBarInner = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const SubFrameBarInnerLeft = styled.div`
  display: flex;
  align-items: center;
`;

const SubFrameBarInnerRight = styled.div`
  display: flex;
  align-items: center;
`;
