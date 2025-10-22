import React from 'react';
import OrganizationalAnalytics from '../components/OrganizationalAnalytics';
import type { Meeting } from '../types';

interface DashboardPageProps {
  meetings: Meeting[];
}

const DashboardPage: React.FC<DashboardPageProps> = ({ meetings }) => {
  return (
    <div>
        <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Organizational Dashboard</h1>
            <p className="mt-1 text-lg text-gray-600 dark:text-gray-400">High-level insights across all company meetings.</p>
        </header>
        <OrganizationalAnalytics meetings={meetings} />
    </div>
  );
};

export default DashboardPage;