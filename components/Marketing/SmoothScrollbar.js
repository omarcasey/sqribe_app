// components/CustomScrollbar.js

import React, { useEffect, useRef } from 'react';
import Scrollbar from 'smooth-scrollbar';

const CustomScrollbar = ({ children }) => {
  const scrollbarRef = useRef(null);

  useEffect(() => {
    console.log('CustomScrollbar component mounted');

    if (scrollbarRef.current) {
      console.log('Initializing smooth scrollbar');
      
      const scrollbar = Scrollbar.init(scrollbarRef.current, {
        damping: 0.05, // Set damping to 0.05
      });

      console.log('Smooth scrollbar initialized:', scrollbar);

      return () => {
        console.log('Destroying smooth scrollbar');
        scrollbar.destroy();
      };
    }
  }, []);

  return <div ref={scrollbarRef}>{children}</div>;
};

export default CustomScrollbar;
