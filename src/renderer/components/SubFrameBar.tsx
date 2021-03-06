import React from 'react';

import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import { signOutUser } from '../features/auth/actions';
import { useAppDispatch } from '../store';
import Avatar from './common/Avatar';
import Button from './common/Button';
import Image from './common/Image';
import Text from './common/Text';

type SubFrameBarProps = {
  canGoBack?: boolean;
};

export default function SubFrameBar({ canGoBack = false }: SubFrameBarProps) {
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const onClickSignOutBtnHandler = () => dispatch(signOutUser());

  return (
    <SubFrameBarWrapper>
      <SubFrameBarInner>
        <SubFrameBarInnerLeft>
          Logo
          <Image src='' alt='' style={undefined} />
          {canGoBack && <Button colorTheme='secondary'>Back</Button>}
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
          <Button
            colorTheme='secondary'
            style={{ marginLeft: theme.space[12] }}
            onClick={onClickSignOutBtnHandler}
          >
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
