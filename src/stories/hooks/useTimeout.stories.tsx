import React from 'react';

import useTimeout from '../../renderer/hooks/useTimeout';

export default {
  title: 'Hook/useTimeout',
};

export function Default() {
  const clearFn = useTimeout(() => {
    alert('실행');
  }, 3000);

  return (
    <>
      <div>useTimeout Test</div>
      <button type='button' onClick={clearFn}>
        멈추기
      </button>
    </>
  );
}
