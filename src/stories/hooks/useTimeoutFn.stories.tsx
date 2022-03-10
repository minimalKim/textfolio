import React from 'react';

import useTimeoutFn from '../../renderer/hooks/useTimeoutFn';

export default {
  title: 'Hook/useTimeoutFn',
};

export function Default() {
  const [runFn, clearFn] = useTimeoutFn(() => {
    alert('실행');
  }, 3000);

  return (
    <>
      <div>useTimeoutFn Test</div>
      <button type='button' onClick={runFn}>
        3초뒤 실행
      </button>
      <button type='button' onClick={clearFn}>
        멈추기
      </button>
    </>
  );
}
