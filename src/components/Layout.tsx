import React, { FC } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface Props {
  children?: React.ReactNode;
  id?: string;
  addClass?: string;
}

export const Layout: FC<Props> = ({ children }) => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Navbar id="Naviugation bar" />
      <div className="h-full w-full flex flex-col items-center justify-center">
        {children}
      </div>
      <Footer />
    </div>
  );
};
export const Section: FC<Props> = ({ children, id, addClass }) => {
  return (
    <section
      id={id}
      className={`w-full min-h-screen ${addClass}`}
    >
      {children}
    </section>
  );
};
