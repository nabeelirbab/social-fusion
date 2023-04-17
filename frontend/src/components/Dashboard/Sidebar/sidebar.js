import React, { useState, useEffect } from 'react';
import './sidebar.css';

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMediumScreen, setIsMediumScreen] = useState(
    window.innerWidth <= 768
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMediumScreen(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isMediumScreen && (
        <button onClick={toggleSidebar}>Toggle Sidebar</button>
      )}
      <div className={`left-sidebar ${isOpen ? 'open' : ''}`}>
        {children}
      </div>
    </>
  );
};

export default Sidebar;
