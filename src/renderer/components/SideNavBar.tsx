import React, { SVGProps, useState } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { HomeIcon, DocumentTextIcon, LibraryIcon, CogIcon } from '@heroicons/react/solid';
import { useNavigate } from 'react-router-dom';

const pathNames = ['/home', '/search', '/docs', '/setting'] as const;
const pageNames = ['HomePage', 'SearchPage', 'DocumentsPage', 'SettingPage'] as const;

export type PathName = typeof pathNames[number];
export type PageName = typeof pageNames[number];

type SideNavBarProps = {
  currentPage: PathName | PageName;
};

type PageInfo = {
  url: PathName;
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
};

const navItems: Record<PageName, PageInfo> = {
  HomePage: {
    url: '/home',
    Icon: HomeIcon,
  },
  SearchPage: {
    url: '/docs',
    Icon: DocumentTextIcon,
  },
  DocumentsPage: {
    url: '/search',
    Icon: LibraryIcon,
  },
  SettingPage: {
    url: '/setting',
    Icon: CogIcon,
  },
};

const isPageName = (x: any): x is PageName => pageNames.includes(x);

function ChangeToPageName(currentPage: string): PageName {
  if (isPageName(currentPage)) return currentPage;

  // eslint-disable-next-line consistent-return
  Object.keys(navItems).forEach((pageName) => {
    if (navItems[pageName as PageName].url === currentPage) {
      return pageName as PageName;
    }
  });

  return 'HomePage';
}

export default function SideNavBar({ currentPage }: SideNavBarProps) {
  const [selectedNavItem, setSelectedNavItem] = useState<PageName>(ChangeToPageName(currentPage));
  const navigate = useNavigate();

  const onItemClick = (url: PathName, pageName: PageName) => {
    navigate(url);
    setSelectedNavItem(pageName);
  };

  return (
    <SideNavBarContainer>
      {Object.keys(navItems).map((pageName) => {
        const pageInfo = navItems[pageName as PageName];

        const theme = selectedNavItem === pageName ? 'primary' : 'secondary';
        return (
          <SideNavBarItem key={pageName} onClick={() => onItemClick(pageInfo.url, pageName as PageName)}>
            <pageInfo.Icon height={30} css={[iconStyle, themes[theme]]} />
          </SideNavBarItem>
        );
      })}
    </SideNavBarContainer>
  );
}

const SideNavBarContainer = styled.nav`
  padding: ${({ theme }) => theme.space[8]} ${({ theme }) => theme.space[2]};
  border-right: ${({ theme }) => `1px solid ${theme.color.gray[200]}`};
  height: calc(100% - 74px);
  width: 74px;
  position: absolute;
  top: 74px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: white;
`;

const SideNavBarItem = styled.div`
  margin: ${({ theme }) => theme.space[6]} 0;
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

const iconStyle = css`
  transition: all 0.2s ease-out;
`;

const themes = {
  primary: css`
    color: #f36031;
  `,
  secondary: css`
    color: #cbd5e0;
  `,
};
