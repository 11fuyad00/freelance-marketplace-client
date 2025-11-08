import React from 'react';
import Navber from '../component/navber/Navber';
import { Outlet } from 'react-router';
import Footer from '../component/Footer/Footer';

const RootLayout = () => {
  return (
    <div>
      <header>
        <Navber></Navber>
      </header>
      <main>
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default RootLayout;
