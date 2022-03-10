import React, { Fragment, useState } from 'react';

import useDebounce from '../../renderer/hooks/useDebounce';

export default {
  title: 'Hook/useDebounce',
};
const searchWords = ['apple', 'banana', 'orange', 'kiwi', 'melon', 'pear'];

export function Default() {
  const [value, setValue] = useState<string>('');
  const [results, setResults] = useState<string[]>([]);

  useDebounce(
    () => {
      if (value === '') setResults([]);
      else {
        setResults(searchWords.filter((word) => word.toLowerCase().includes(value.toLowerCase())));
      }
    },
    300,
    [value],
  );

  return (
    <div>
      <input type='text' value={value} onChange={(e) => setValue(e.target.value)} />
      <div>
        {results.map((item) => (
          <Fragment key={item}>
            {item}
            <br />
          </Fragment>
        ))}
      </div>
    </div>
  );
}
