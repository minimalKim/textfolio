import React from 'react';

import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';

import SideNavBar, { PathName } from '../components/SideNavBar';
import SubFrameBar from '../components/SubFrameBar';

export default function BaseLayout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const isWelcomePage = pathname === '/';

  // eslint-disable-next-line react/jsx-no-useless-fragment
  if (isWelcomePage) return <>{children}</>;

  return (
    <>
      <SubFrameBar />
      <SideNavBar currentPage={pathname as PathName} />
      <PageWrapper>{children}</PageWrapper>
    </>
  );
}

const PageWrapper = styled.div`
  padding: 74px 0 0 74px;
`;
