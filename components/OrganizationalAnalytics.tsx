import React, { useMemo } from 'react';
import type { Meeting } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const KPICard: React.FC<{ title: string; value: string | number; icon: string }> = ({ title, value, icon }) => (
    <div className="flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md text-center h-full">
        <div className="text-4xl mb-3" aria-hidden="true">{icon}</div>
        <h3 className="text-md font-semibold text-gray-600 dark:text-gray-300">{title}</h3>
        <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{value}</p>
    </div>
);

const ChartCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{title}</h3>
        <div className="h-80 w-full">
            {children}
        </div>
    </div>
);

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const OrganizationalAnalytics: React.FC<{ meetings: Meeting[] }> = ({ meetings }) => {

    const analytics = useMemo(() => {
        if (meetings.length === 0) {
            return {
                totalMeetings: 0, totalHours: '0.0', avgDuration: 0,
                uniqueParticipants: 0, avgParticipants: '0.0', crossDeptPercentage: '0%',
                loadByDept: [], featureUsage: [], locationTypes: [], participantActivity: []
            };
        }

        const totalMeetings = meetings.length;
        const totalMinutes = meetings.reduce((sum, m) => sum + m.durationMinutes, 0);
        const avgDuration = (totalMinutes / totalMeetings).toFixed(0);

        const allParticipants = meetings.flatMap(m => m.participants.map(p => p.name));
        const uniqueParticipants = new Set(allParticipants).size;
        const totalParticipantCount = allParticipants.length;
        const avgParticipants = (totalParticipantCount / totalMeetings).toFixed(1);

        const crossDeptMeetings = meetings.filter(m => new Set(m.participants.map(p => p.department)).size > 1).length;
        const crossDeptPercentage = `${((crossDeptMeetings / totalMeetings) * 100).toFixed(0)}%`;

        const loadByDept = meetings.reduce((acc, m) => {
            acc[m.department] = (acc[m.department] || 0) + m.durationMinutes;
            return acc;
        }, {} as Record<string, number>);

        const featureUsage = meetings.flatMap(m => m.featuresUsed).reduce((acc, feature) => {
            acc[feature] = (acc[feature] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        const locationTypes = meetings.reduce((acc, m) => {
            acc[m.locationType] = (acc[m.locationType] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        const participantActivity = allParticipants.reduce((acc, name) => {
            acc[name] = (acc[name] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        return {
            totalMeetings,
            totalHours: (totalMinutes / 60).toFixed(1),
            avgDuration,
            uniqueParticipants,
            avgParticipants,
            crossDeptPercentage,
            // FIX: Convert `hours` to a number before performing division.
            loadByDept: Object.entries(loadByDept).map(([name, hours]) => ({ name, 'Meeting Hours': parseFloat((Number(hours) / 60).toFixed(1)) })),
            featureUsage: Object.entries(featureUsage).map(([name, value]) => ({ name, value })),
            locationTypes: Object.entries(locationTypes).map(([name, value]) => ({ name, value })),
            // FIX: Convert `meetings` to a number to ensure correct sorting.
            participantActivity: Object.entries(participantActivity)
                .map(([name, meetings]) => ({ name, meetings: Number(meetings) }))
                .sort((a, b) => b.meetings - a.meetings)
                .slice(0, 5)
        };
    }, [meetings]);

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <KPICard title="Total Meetings" value={analytics.totalMeetings} icon="📅" />
                <KPICard title="Total Meeting Hours" value={analytics.totalHours} icon="⏱️" />
                <KPICard title="Avg. Duration" value={`${analytics.avgDuration} min`} icon="📊" />
                <KPICard title="Unique Participants" value={analytics.uniqueParticipants} icon="👥" />
                <KPICard title="Avg. Participants" value={analytics.avgParticipants} icon="🧑‍🤝‍🧑" />
                <KPICard title="Cross-Dept Collab" value={analytics.crossDeptPercentage} icon="🤝" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                 <ChartCard title="Meeting Load by Department (Hours)">
                     <ResponsiveContainer width="100%" height="100%">
                         <BarChart data={analytics.loadByDept} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                             <CartesianGrid strokeDasharray="3 3" />
                             <XAxis dataKey="name" />
                             <YAxis unit="h"/>
                             <Tooltip formatter={(value) => `${value} hours`} />
                             <Legend />
                             <Bar dataKey="Meeting Hours" fill="#8884d8" />
                         </BarChart>
                     </ResponsiveContainer>
                 </ChartCard>
                 
                 <ChartCard title="Most Active Participants (by Meetings Attended)">
                    <ResponsiveContainer width="100%" height="100%">
                         <BarChart data={analytics.participantActivity} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                             <CartesianGrid strokeDasharray="3 3" />
                             <XAxis dataKey="name" />
                             <YAxis allowDecimals={false} />
                             <Tooltip />
                             <Legend />
                             <Bar dataKey="meetings" name="Meetings Attended" fill="#82ca9d">
                                {analytics.participantActivity.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                             </Bar>
                         </BarChart>
                     </ResponsiveContainer>
                 </ChartCard>

                 <ChartCard title="Feature Adoption">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                             <Pie
                                data={analytics.featureUsage}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                // FIX: Add a null check for the `percent` property to prevent potential type errors.
                                label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                            >
                                {analytics.featureUsage.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                 </ChartCard>

                 <ChartCard title="Meeting Location Type">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={analytics.locationTypes}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                fill="#82ca9d"
                                label
                            >
                               {analytics.locationTypes.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                 </ChartCard>

            </div>
        </div>
    );
};

export default OrganizationalAnalytics;