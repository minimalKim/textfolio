import { useEffect } from 'react';

import useTimeoutFn from './useTimeoutFn';

const useTimeout = (fn: () => void, ms: number) => {
  const [runFn, clearFn] = useTimeoutFn(fn, ms);

  useEffect(() => {
    runFn();

    return clearFn;
  }, [runFn, clearFn]);

  return clearFn;
};

export default useTimeout;
