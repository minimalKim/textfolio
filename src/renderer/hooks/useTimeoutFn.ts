/* eslint-disable no-unused-expressions */
import { useCallback, useEffect, useRef } from 'react';
// 1. 함수 호출을 통한 방법

// 2. 컴포넌트가 로딩된 후 바로 실행되는 방법
const useTimeoutFn = (fn: () => void, ms: number) => {
  const timeoutId = useRef<NodeJS.Timeout>();
  const callback = useRef(fn);

  useEffect(() => {
    callback.current = fn;
  }, [fn]);

  const runFn = useCallback(() => {
    timeoutId.current && clearTimeout(timeoutId.current);

    timeoutId.current = setTimeout(() => {
      callback.current();
    }, ms);
  }, [ms]);

  const clearFn = useCallback(() => {
    timeoutId.current && clearTimeout(timeoutId.current);
  }, []);

  // hook이 사라질때 clear
  useEffect(() => clearFn, [clearFn]);

  return [runFn, clearFn];
};

export default useTimeoutFn;
