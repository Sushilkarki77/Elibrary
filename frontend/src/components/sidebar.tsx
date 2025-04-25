import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { getNavItems } from '../services/httpService';
import { useAuth } from '../context/auth.context';
import logo from '../assets/logo.png'
import AppIcon from './UI/AppIcon';

const Sidebar: React.FC = () => {
    const [navItems, setNavItems] = useState<{ name: string, path: string, icon: 'dashboard' | 'users' | 'search' | 'home' | 'folder' }[]>();
    const navigate = useNavigate();
    const { logout } = useAuth();


    const handleLogut = () => {
        navigate('/login');
        logout()
    }

    useEffect(() => {
        getNavItems().then(x => setNavItems(x));
    }, []);


    return (
        <div className="flex min-h-screen bg-gray-100">

            <div className="w-36 shadow-lg bg-white text-gray-700  border-r border-gray-300 flex flex-col">

                {/* <h3 className="text-2xl text-left p-3 font-bold text-gray-800 italic">Elibrary</h3> */}
                <div className='p-2'>
                    <img className='logo-dashboard' src={logo} />
                </div>

                <ul className="mt-6">

                    {navItems && navItems?.map(item =>
                        <li className="text-lg mb-1" key={item.name + item.path}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    `${isActive ? 'nav-link-active' : ''} flex gap-2 nav-link border-t border-b border-gray-300 w-full`
                                }
                            >

                                <AppIcon icon={item.icon} color='#9333EA' />

                                {item.name}</NavLink>

                        </li>
                    )}

                </ul>
                <div className='mt-auto text-left'>
                    <button className="hover:bg-gray-100  p-2 w-full  border-t border-b flex gap-2 text-purple-600 border-gray-300 items-center text-left" onClick={handleLogut}>
                        <AppIcon icon='LogOut' color='#9333EA' />
                        Log out
                    </button>
                </div>
            </div>

        </div>

    );
};

export default Sidebar;
