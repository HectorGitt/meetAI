import React from 'react';
import type { User } from '../types';
import type { Page } from '../App';

interface SidebarProps {
  user: User;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  onLogout: () => void;
}

interface NavItemProps {
    page: Page;
    label: string;
    icon: React.ReactNode;
    currentPage: Page;
    setCurrentPage: (page: Page) => void;
}

const NavItem: React.FC<NavItemProps> = ({ page, label, icon, currentPage, setCurrentPage }) => {
    const isActive = currentPage === page;
    return (
        <li>
            <a
                href="#"
                onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(page);
                }}
                className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${
                    isActive
                        ? 'bg-indigo-700 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
            >
                {icon}
                <span className="ml-3 font-medium">{label}</span>
            </a>
        </li>
    );
};

const Sidebar: React.FC<SidebarProps> = ({ user, currentPage, setCurrentPage, onLogout }) => {
  return (
    <aside className="w-64 flex-shrink-0 bg-gray-800 text-white flex flex-col">
      <div className="h-16 flex items-center justify-center p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold text-indigo-400">Meet Analyzer</h1>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <ul>
            <NavItem 
                page="dashboard"
                label="Dashboard"
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
             <NavItem 
                page="meetings"
                label="Meetings"
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
             <NavItem 
                page="settings"
                label="Settings"
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center font-bold">
                {user.username.charAt(0).toUpperCase()}
            </div>
            <div className="ml-3">
                <p className="font-semibold text-sm">{user.username}</p>
                <p className="text-xs text-gray-400">{user.email}</p>
            </div>
        </div>
        <button
          onClick={onLogout}
          className="w-full mt-4 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-red-500"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;