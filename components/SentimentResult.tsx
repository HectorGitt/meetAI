
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import type { SentimentAnalysisResult, Sentiment } from '../types';

const SENTIMENT_CONFIG: Record<Sentiment, { color: string; icon: string; label: string }> = {
  POSITIVE: { color: '#22c55e', icon: '😊', label: 'Positive' },
  NEGATIVE: { color: '#ef4444', icon: '😠', label: 'Negative' },
  NEUTRAL: { color: '#6b7280', icon: '😐', label: 'Neutral' },
  MIXED: { color: '#f97316', icon: '🤔', label: 'Mixed' },
};

const SentimentBadge: React.FC<{ sentiment: Sentiment }> = ({ sentiment }) => {
    const config = SENTIMENT_CONFIG[sentiment];
    return (
        <span style={{ backgroundColor: config.color, color: 'white' }} className="px-3 py-1 text-sm font-semibold rounded-full">
            {config.icon} {config.label}
        </span>
    );
};

const SentimentResult: React.FC<{ result: SentimentAnalysisResult }> = ({ result }) => {
  const chartData = [
    { name: 'Positive', value: result.sentimentScores.positive },
    { name: 'Negative', value: result.sentimentScores.negative },
    { name: 'Neutral', value: result.sentimentScores.neutral },
  ].filter(item => item.value > 0);

  const COLORS = [SENTIMENT_CONFIG.POSITIVE.color, SENTIMENT_CONFIG.NEGATIVE.color, SENTIMENT_CONFIG.NEUTRAL.color];

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md space-y-6">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Sentiment Analysis Results</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h4 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">Overall Sentiment</h4>
          <SentimentBadge sentiment={result.overallSentiment} />
          <div className="w-full h-64 mt-4">
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        // FIX: Explicitly cast the `percent` property to a number before performing an arithmetic operation.
                        label={({ name, percent }) => `${name} ${(Number(percent || 0) * 100).toFixed(0)}%`}
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="md:col-span-2 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
           <h4 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">Summary</h4>
           <p className="text-gray-700 dark:text-gray-400">{result.summary}</p>
        </div>
      </div>
      
      <div>
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Key Points</h4>
        <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
          {result.keyPoints.map((point, index) => (
            <div key={index} className="flex items-start p-3 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
               <div className="flex-shrink-0 mr-3 text-xl">{SENTIMENT_CONFIG[point.sentiment]?.icon || '💬'}</div>
               <p className="text-gray-800 dark:text-gray-300">{point.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SentimentResult;