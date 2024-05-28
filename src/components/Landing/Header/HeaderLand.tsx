import { useState } from 'react';
import { Link } from 'react-router-dom';

export const HeaderLand = (): JSX.Element => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="bg-secondary shadow-md">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div>

                    <img src="/img/icon-header.svg" className="w-20" alt="Logo" />

                </div>
                <button onClick={toggleMenu} className="lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                <nav className={`${isMenuOpen ? 'block' : 'hidden'} lg:flex lg:items-center lg:w-auto w-full`}>
                    <ul className="lg:flex lg:space-x-8 text-white text-xl">
                        <li>
                            <Link to='/home' className="block py-2 lg:py-0">Início</Link>
                        </li>
                        <li>
                            <Link to='/sobre-nos' className="block py-2 lg:py-0">Sobre Nós</Link>
                        </li>
                        <li>
                            <Link to='/como-funciona' className="block py-2 lg:py-0">Como Funciona</Link>
                        </li>
                        <li>
                            <Link to='/contato' className="block py-2 lg:py-0">Contato</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className={`${isMenuOpen ? 'block' : 'hidden'} lg:hidden bg-secondary/90 absolute top-16 right-0 w-full p-4 text-white text-xl z-50`}>
                <ul className="flex flex-col gap-4">
                    <li>
                        <Link to='/home'>Início</Link>
                    </li>
                    <li>
                        <Link to='/sobre-nos'>Sobre Nós</Link>
                    </li>
                    <li>
                        <Link to='/como-funciona'>Como Funciona</Link>
                    </li>
                    <li>
                        <Link to='/contato'>Contato</Link>
                    </li>
                </ul>
            </div>
        </header>
    );
};
