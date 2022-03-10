import React from 'react';

import Avatar from '../components/common/Avatar';

export default function HomePage() {
  return (
    <div>
      Home
      <Avatar src='https://picsum.photos/150' alt='' size={2} threshold={0} shape='circle' />
    </div>
  );
}
