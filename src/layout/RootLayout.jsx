import React from 'react';
import Navber from '../component/navber/Navber';
import { Outlet } from 'react-router';
import Footer from '../component/Footer/Footer';

const RootLayout = () => {
  return (
    <div className="bg-base-100 min-h-screen">
      <header>
        <Navber></Navber>
      </header>
      <main className="pt-24 bg-base-100">
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default RootLayout;
