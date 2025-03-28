import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { getNavItems } from '../services/httpService';
import { useAuth } from '../context/auth.context';

const Sidebar: React.FC = () => {
    const [navItems, setNavItems] = useState<{ name: string, path: string }[]>();
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
        <div className="flex h-screen bg-gray-100">

            <div className="w-36 shadow-lg bg-white text-gray-700  border-r border-gray-300 flex flex-col">

                <h3 className="text-2xl text-left p-3 font-bold text-gray-800">Elibrary</h3>
                <ul className="mt-6">

                    {navItems && navItems?.map(item =>
                        <li className="text-lg mb-1" key={item.name + item.path}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    `${isActive ? 'nav-link-active' : ''} nav-link border-b border-gray-300 w-full`
                                }
                            >{item.name}</NavLink>
                        </li>
                    )}

                </ul>
                <div className='mt-auto text-left'>
                    <button className="hover:bg-gray-100 block p-2 w-full text-left" onClick={handleLogut}>Log out</button>
                </div>
            </div>

        </div>

    );
};

export default Sidebar;
