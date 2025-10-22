import React from 'react';
import Sidebar from './Sidebar';
import type { User } from '../types';
import type { Page } from '../App';

interface LayoutProps {
  user: User;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  onLogout: () => void;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ user, currentPage, setCurrentPage, onLogout, children }) => {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar 
        user={user} 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        onLogout={onLogout}
      />
      <main className="flex-1 overflow-y-auto">
        <div className="p-4 md:p-8">
            {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;