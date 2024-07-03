
// import type { Metadata } from "next";
import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import SideNavigationPanel from './SideNavigationPanel';


// Creating Poppins font with specified weights and subsets
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import '@fontsource/poppins/800.css';
import '@fontsource/poppins/900.css';
import { LayoutContext } from './LayoutContext';

// export const metadata: Metadata = {
//   title: appName,
//   description: appName,
// };
const Layout: React.FC<{ children: React.ReactNode,excludedRoutes:string[] }> = ({ excludedRoutes,children }) => {
    const location = useLocation();
  
    const {isExpanded, setIsExpanded} = useContext(LayoutContext)
  
    const toggleSidebar = () => {
      setIsExpanded(!isExpanded);
    };
  
    const closeSidebar = () => {
      setIsExpanded(false);
    };
  
    if (excludedRoutes.includes(location.pathname)) {
      return (
        <div className="min-h-screen min-w-full ">
          {children}
        </div>
      );
    } else {
      return (
        <div className=" min-h-screen flex flex-col">
          <Navbar toggleState={isExpanded} handleToggle={toggleSidebar} />
          <div className="flex flex-col md:flex-row flex-1">
            <SideNavigationPanel
              toggleState={isExpanded}
              handleToggle={toggleSidebar}
              closeToggle={closeSidebar}
            />
            <main className="flex-1">
              {children}
            </main>
          </div>
        </div>
      );
    }
  };
  
  export default Layout;