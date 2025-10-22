
import React from 'react';

interface LoginProps {
  onLoginSuccess: () => void;
}

const GoogleIcon: React.FC = () => (
    <svg className="w-5 h-5 mr-3" viewBox="0 0 48 48">
        <path fill="#4285F4" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path>
        <path fill="#34A853" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path>
        <path fill="#FBBC05" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"></path>
        <path fill="#EA4335" d="M43.611 20.083H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C44.438 36.338 48 30.692 48 24c0-1.341-.138-2.65-.389-3.917z"></path>
    </svg>
);

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-xl dark:bg-gray-800">
        <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Meet Sentiment Analyzer</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">Unlock insights from your Google Meet calls.</p>
        </div>
        
        <div className="flex flex-col items-center space-y-4">
             <button
                onClick={onLoginSuccess}
                className="w-full flex items-center justify-center px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600 transition-all duration-200"
            >
                <GoogleIcon />
                Sign in with Google
            </button>
        </div>

        <div className="p-4 mt-6 text-sm text-yellow-800 bg-yellow-100 rounded-lg dark:bg-yellow-900 dark:text-yellow-300" role="alert">
          <span className="font-medium">Demonstration Note:</span> This is a frontend-only mock application. Clicking "Sign in" will simulate a successful login without actual authentication to demonstrate the app's features. A full backend implementation (e.g., FastAPI) is required for real Google OAuth and Meet API integration.
        </div>
      </div>
    </div>
  );
};

export default Login;
