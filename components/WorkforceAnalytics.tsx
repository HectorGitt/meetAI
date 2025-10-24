
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import type { WorkforceAnalysisResult, Meeting } from '../types';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE', '#00C49F', '#FFBB28'];

const InfoCard: React.FC<{ title: string; value: string | number; icon: string }> = ({ title, value, icon }) => (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
        <div className="text-3xl mb-2" aria-hidden="true">{icon}</div>
        <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{title}</h4>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
    </div>
);


const WorkforceAnalytics: React.FC<{ result: WorkforceAnalysisResult; meeting: Meeting }> = ({ result, meeting }) => {
  // Fix: Operator '+' cannot be applied to types 'unknown' and 'number'.
  // Explicitly convert `count` to a number because Object.values can return `unknown[]`.
  const totalWords = Object.values(result.wordCountPerParticipant).reduce((sum, count) => sum + Number(count), 0);

  const chartData = Object.entries(result.wordCountPerParticipant)
    // Fix: Operator '>' cannot be applied and the right-hand side of an arithmetic operation must be of type 'any', 'number'...
    // Explicitly convert `wordCountValue` to a number. This resolves type errors
    // for the percentage calculation and for the subsequent sort operation.
    .map(([name, wordCountValue]) => {
      const wordCount = Number(wordCountValue);
      return {
        name,
        wordCount,
        percentage: totalWords > 0 ? (wordCount / totalWords) * 100 : 0,
      };
    })
    .sort((a, b) => b.wordCount - a.wordCount);

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md space-y-6">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Workforce & Participation Analytics</h3>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <InfoCard title="Meeting Duration" value={`${meeting.durationMinutes} min`} icon="⏱️" />
        <InfoCard title="Participants" value={meeting.participants.length} icon="👥" />
        <InfoCard title="Total Words" value={totalWords} icon="📄" />
      </div>

      <div>
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Speaking Contribution (by word count)</h4>
        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <XAxis type="number" unit="%" domain={[0, 100]} />
              <YAxis dataKey="name" type="category" width={80} />
              <Tooltip formatter={(value: number) => `${value.toFixed(1)}%`} cursor={{fill: 'rgba(206, 206, 206, 0.2)'}}/>
              <Legend />
              <Bar dataKey="percentage" name="Speaking Share" fill="#8884d8">
                 {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div>
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Detailed Breakdown</h4>
        <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <thead className="bg-gray-100 dark:bg-gray-800">
                    <tr>
                        <th className="text-left py-2 px-4 font-semibold text-gray-600 dark:text-gray-300">Participant</th>
                        <th className="text-center py-2 px-4 font-semibold text-gray-600 dark:text-gray-300">Speaking Turns</th>
                        <th className="text-center py-2 px-4 font-semibold text-gray-600 dark:text-gray-300">Word Count</th>
                    </tr>
                </thead>
                <tbody>
                    {chartData.map((data, index) => (
                         <tr key={index} className="border-t border-gray-200 dark:border-gray-600">
                            <td className="py-2 px-4 font-medium">{data.name}</td>
                            <td className="py-2 px-4 text-center">{result.speakingTurns[data.name]}</td>
                            <td className="py-2 px-4 text-center">{data.wordCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default WorkforceAnalytics;