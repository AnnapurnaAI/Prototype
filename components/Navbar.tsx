
import React from 'react';
import { NavLink } from 'react-router-dom';
import LeafIcon from './icons/LeafIcon';
import LayoutDashboardIcon from './icons/LayoutDashboardIcon';
import BookOpenIcon from './icons/BookOpenIcon';
import UserIcon from './icons/UserIcon';

const NavItem = ({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex flex-col items-center justify-center p-2 rounded-lg transition-colors duration-200 ${
        isActive ? 'bg-primary text-white' : 'text-gray-500 hover:bg-green-100 hover:text-primary'
      }`
    }
  >
    {icon}
    <span className="text-xs font-medium">{label}</span>
  </NavLink>
);

const Navbar: React.FC = () => {
  return (
    <>
    {/* Bottom Nav for Mobile */}
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] md:hidden z-40">
      <div className="flex justify-around items-center h-16">
        <NavItem to="/" icon={<LayoutDashboardIcon className="w-6 h-6" />} label="Dashboard" />
        <NavItem to="/recipes" icon={<BookOpenIcon className="w-6 h-6" />} label="Recipes" />
        <NavItem to="/profile" icon={<UserIcon className="w-6 h-6" />} label="Profile" />
      </div>
    </nav>

    {/* Side Nav for Desktop */}
    <aside className="hidden md:flex flex-col w-64 bg-white shadow-lg h-screen fixed top-0 left-0">
        <div className="flex items-center justify-center h-20 border-b">
            <LeafIcon className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold text-gray-800 ml-2">Annapurna.ai</h1>
        </div>
        <nav className="flex-grow p-4 space-y-2">
            <NavLink
                to="/"
                className={({ isActive }) =>
                `flex items-center p-3 rounded-lg transition-colors ${
                    isActive ? 'bg-primary text-white' : 'text-gray-600 hover:bg-green-100 hover:text-primary'
                }`
                }
            >
                <LayoutDashboardIcon className="w-6 h-6 mr-4" />
                <span className="font-semibold">Dashboard</span>
            </NavLink>
            <NavLink
                to="/recipes"
                className={({ isActive }) =>
                `flex items-center p-3 rounded-lg transition-colors ${
                    isActive ? 'bg-primary text-white' : 'text-gray-600 hover:bg-green-100 hover:text-primary'
                }`
                }
            >
                <BookOpenIcon className="w-6 h-6 mr-4" />
                <span className="font-semibold">Recipes</span>
            </NavLink>
            <NavLink
                to="/profile"
                className={({ isActive }) =>
                `flex items-center p-3 rounded-lg transition-colors ${
                    isActive ? 'bg-primary text-white' : 'text-gray-600 hover:bg-green-100 hover:text-primary'
                }`
                }
            >
                <UserIcon className="w-6 h-6 mr-4" />
                <span className="font-semibold">Profile</span>
            </NavLink>
        </nav>
    </aside>
    </>
  );
};

export default Navbar;
