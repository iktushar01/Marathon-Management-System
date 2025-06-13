import { useState, useEffect } from 'react';

const useIsLargeScreen = () => {
  const [isLarge, setIsLarge] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsLarge(window.innerWidth >= 1024); // Tailwind's lg breakpoint
    };

    checkScreen(); // initial check
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  return isLarge;
};

export default useIsLargeScreen;
