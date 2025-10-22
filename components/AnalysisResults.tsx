
import React, { useState } from 'react';
import type { Meeting, SentimentAnalysisResult, WorkforceAnalysisResult } from '../types';
import SentimentResult from './SentimentResult';
import WorkforceAnalytics from './WorkforceAnalytics';

interface AnalysisResultsProps {
  sentimentResult: SentimentAnalysisResult;
  workforceResult: WorkforceAnalysisResult;
  meeting: Meeting;
}

type Tab = 'sentiment' | 'workforce';

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ sentimentResult, workforceResult, meeting }) => {
  const [activeTab, setActiveTab] = useState<Tab>('sentiment');

  const TabButton: React.FC<{ tabName: Tab; label: string }> = ({ tabName, label }) => (
    <button
      onClick={() => setActiveTab(tabName)}
      className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors focus:outline-none ${
        activeTab === tabName
          ? 'bg-white dark:bg-gray-800 border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400'
          : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
      }`}
      aria-current={activeTab === tabName ? 'page' : undefined}
    >
      {label}
    </button>
  );

  return (
    <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg shadow-inner">
      <nav className="flex border-b border-gray-200 dark:border-gray-700 px-4" role="tablist">
        <TabButton tabName="sentiment" label="Sentiment Analysis" />
        <TabButton tabName="workforce" label="Workforce Analytics" />
      </nav>
      <div className="content" role="tabpanel">
        {activeTab === 'sentiment' && <SentimentResult result={sentimentResult} />}
        {activeTab === 'workforce' && <WorkforceAnalytics result={workforceResult} meeting={meeting} />}
      </div>
    </div>
  );
};

export default AnalysisResults;
