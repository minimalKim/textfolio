import React from 'react';

import SideNavBar, { PageName } from '../components/SideNavBar';
import SubFrameBar from '../components/SubFrameBar';

export const withBaseLayout = (Component: () => JSX.Element, config?: { canGoBack: boolean }) =>
  // eslint-disable-next-line func-names
  function (props: any) {
    const pageName = getDisplayName(Component);
    return (
      <>
        <SubFrameBar canGoBack={config?.canGoBack} />
        <SideNavBar currentPage={pageName as PageName} />
        <Component {...props} />
      </>
    );
  };

function getDisplayName(Component: { (): JSX.Element; getDisplayName?: string; name?: string }) {
  return Component.getDisplayName || Component.name || 'Component';
}
