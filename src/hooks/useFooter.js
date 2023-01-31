import { useState } from 'react';

export default function useFooter() {
  const [visible, setVisible] = useState(false);

  const setVisibility = (location) => {
    switch (location.pathname) {
    case '/meals':
    case '/drinks':
    case '/profile':
      setVisible(true);
      break;
    default:
      setVisible(false);
    }
  };

  return { visible, setVisibility };
}
