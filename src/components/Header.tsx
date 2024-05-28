import { useState } from 'react';
import { APP_NAME } from "../constants/app.constant";
import { Link } from 'react-router-dom';

export const Header = (): JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <section className="flex justify-between items-center bg-secondary">
      <div className="relative flex justify-center w-full">
        <div className="flex w-full justify-around ">
          <Link to='/home'><h1 className="text-6xl  uppercase text-white" style={{ fontFamily: "LondrinaSketch, sans-serif" }}>{APP_NAME}</h1> </Link>
          {/* Menu hambúrguer */}
          <button onClick={toggleMenu} className="lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          {/* Menu de navegação */}
        <Link to='/home'><img src="/img/icon-header.svg" className="absolute top-2 w-28  hidden md:flex" alt="" /></Link>
          <div className={`${isMenuOpen ? 'flex flex-col absolute top-16 right-0 bg-secondary/90 p-4 w-full gap-4' : 'hidden'} lg:flex gap-8 items-center text-xl text-white z-50`}>
            <Link to='/home'><h1>Home</h1></Link>
            <Link to='/sugestões-plantação'><h1>Plantação</h1></Link>
          </div>
        </div>
      </div>
    </section>
  );
};