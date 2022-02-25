import { useEffect } from 'react';

import useTimeoutFn from './useTimeoutFn';

const useDebounce = (fn: () => void, ms: number, deps: any[]) => {
  const [runFn, clearFn] = useTimeoutFn(fn, ms);

  useEffect(runFn, deps);

  return clearFn;
};

export default useDebounce;
