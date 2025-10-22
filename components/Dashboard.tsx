import React, { useState } from 'react';
import type { Meeting, SentimentAnalysisResult, WorkforceAnalysisResult } from '../types';
import { analyzeSentiment, analyzeWorkforce } from '../services/geminiService';
import AnalysisResults from './AnalysisResults';
import OrganizationalAnalytics from './OrganizationalAnalytics';

interface DashboardProps {
  meetings: Meeting[];
  onLogout: () => void;
}

interface AnalysisData {
    sentiment: SentimentAnalysisResult;
    workforce: WorkforceAnalysisResult;
}

type View = 'singleMeeting' | 'organizational';

const LoadingSpinner: React.FC = () => (
    <div className="flex flex-col items-center justify-center p-10 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">Running advanced analysis... This may take a moment.</p>
    </div>
);

const ViewTab: React.FC<{
    label: string;
    isActive: boolean;
    onClick: () => void;
}> = ({ label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
            isActive
                ? 'bg-indigo-600 text-white shadow'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
        }`}
    >
        {label}
    </button>
);


const Dashboard: React.FC<DashboardProps> = ({ meetings, onLogout }) => {
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(meetings[0] || null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisData | null>(null);
  const [view, setView] = useState<View>('singleMeeting');

  const handleSelectMeeting = (meeting: Meeting) => {
    setSelectedMeeting(meeting);
    setAnalysisResult(null);
    setError(null);
    setView('singleMeeting'); // Switch back to single meeting view when a new one is selected
  };

  const handleAnalyze = async () => {
    if (!selectedMeeting) return;
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);
    try {
      const participantNames = selectedMeeting.participants.map(p => p.name);
      const [sentimentResult, workforceResult] = await Promise.all([
        analyzeSentiment(selectedMeeting.transcript),
        analyzeWorkforce(selectedMeeting.transcript, participantNames)
      ]);
      setAnalysisResult({ sentiment: sentimentResult, workforce: workforceResult });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred during analysis.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">Analysis Dashboard</h1>
        <button onClick={onLogout} className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
            Logout
        </button>
      </header>
      
      <main className="p-4 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <aside className="lg:col-span-1 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Recent Meetings</h2>
          <ul className="space-y-2 max-h-[calc(100vh-12rem)] overflow-y-auto">
            {meetings.map((meeting) => (
              <li key={meeting.id}>
                <button
                  onClick={() => handleSelectMeeting(meeting)}
                  className={`w-full text-left p-3 rounded-lg transition-colors duration-200 ${
                    selectedMeeting?.id === meeting.id
                      ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <p className="font-semibold">{meeting.title}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{meeting.date}</p>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <section className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg flex items-center space-x-4">
                <ViewTab label="Single Meeting Analysis" isActive={view === 'singleMeeting'} onClick={() => setView('singleMeeting')} />
                <ViewTab label="Organizational Analytics" isActive={view === 'organizational'} onClick={() => setView('organizational')} />
            </div>

            {view === 'organizational' && <OrganizationalAnalytics meetings={meetings} />}
            
            {view === 'singleMeeting' && (
              <>
                {selectedMeeting ? (
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-2">{selectedMeeting.title}</h2>
                        <p className="text-md text-gray-500 dark:text-gray-400 mb-4">{selectedMeeting.date}</p>
                        <div className="mb-4">
                            <h4 className="font-semibold mb-2">Participants</h4>
                             <div className="flex flex-wrap gap-2">
                                {selectedMeeting.participants.map(p => (
                                    <span key={p.name} className="px-2 py-1 text-xs font-medium text-gray-700 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">
                                        {p.name} ({p.department})
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="mb-4">
                            <h4 className="font-semibold mb-2">Transcript</h4>
                            <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-md max-h-60 overflow-y-auto text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                                <p style={{ whiteSpace: 'pre-wrap' }}>{selectedMeeting.transcript}</p>
                            </div>
                        </div>
                        <button
                            onClick={handleAnalyze}
                            disabled={isLoading}
                            className="w-full px-6 py-3 text-white font-semibold bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed transition-colors"
                        >
                            {isLoading ? 'Analyzing...' : 'Run Full Analysis'}
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                        <p className="text-gray-500">Select a meeting to view details and run analysis.</p>
                    </div>
                )}
                
                {isLoading && <LoadingSpinner />}
                {error && <div className="p-4 text-red-800 bg-red-100 rounded-lg dark:bg-red-900 dark:text-red-300">{error}</div>}
                {analysisResult && selectedMeeting && (
                  <AnalysisResults 
                    sentimentResult={analysisResult.sentiment} 
                    workforceResult={analysisResult.workforce}
                    meeting={selectedMeeting} 
                  />
                )}
              </>
            )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
