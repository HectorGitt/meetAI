import React, { useState } from 'react';
import type { User } from '../types';

const GoogleIcon: React.FC = () => (
    <svg className="w-5 h-5 mr-3" viewBox="0 0 48 48">
        <path fill="#4285F4" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path>
        <path fill="#34A853" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path>
        <path fill="#FBBC05" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"></path>
        <path fill="#EA4335" d="M43.611 20.083H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C44.438 36.338 48 30.692 48 24c0-1.341-.138-2.65-.389-3.917z"></path>
    </svg>
);

interface SettingsPageProps {
  user: User;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ user }) => {
    const [isConnected, setIsConnected] = useState(false);

    const handleConnect = () => {
        // Simulate API call
        setTimeout(() => {
            setIsConnected(true);
        }, 1000);
    }
    
    return (
        <div>
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
                <p className="mt-1 text-lg text-gray-600 dark:text-gray-400">Manage your profile and integrations.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-4">User Profile</h2>
                        <div className="space-y-3">
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Username</label>
                                <p className="text-md text-gray-900 dark:text-white">{user.username}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Email Address</label>
                                <p className="text-md text-gray-900 dark:text-white">{user.email}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="md:col-span-2">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-4">Integrations</h2>
                        <div className="flex flex-col md:flex-row items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                            <div>
                                <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Google Account</h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {isConnected 
                                        ? "Your account is connected. Meeting data is being synced."
                                        : "Connect your Google account to fetch Meet transcripts for analysis."
                                    }
                                </p>
                            </div>
                           {isConnected ? (
                                <div className="mt-4 md:mt-0 flex items-center text-green-600 dark:text-green-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <span className="font-semibold">Connected</span>
                                </div>
                           ) : (
                                <button
                                    onClick={handleConnect}
                                    className="w-full md:w-auto mt-4 md:mt-0 flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600 transition-all duration-200"
                                >
                                    <GoogleIcon />
                                    Connect Account
                                </button>
                           )}
                        </div>
                         <div className="p-4 mt-6 text-sm text-yellow-800 bg-yellow-100 rounded-lg dark:bg-yellow-900 dark:text-yellow-300" role="alert">
                            <span className="font-medium">Note:</span> A full backend implementation (e.g., FastAPI) is required for real Google OAuth integration. This is a frontend-only simulation.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;