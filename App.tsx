import React, { useState } from 'react';
import Login from './components/Login';
import Layout from './components/Layout';
import DashboardPage from './pages/DashboardPage';
import MeetingsPage from './pages/MeetingsPage';
import SettingsPage from './pages/SettingsPage';
import type { Meeting, User } from './types';

const MOCK_MEETINGS: Meeting[] = [
    {
        id: 'meeting-1',
        title: 'Q3 Project Phoenix Sync',
        date: '2023-10-26',
        participants: [
            { name: 'Alice', department: 'Engineering' },
            { name: 'Bob', department: 'Engineering' },
            { name: 'Charlie', department: 'Engineering' },
            { name: 'Zoe', department: 'Product' }
        ],
        durationMinutes: 30,
        department: 'Engineering',
        meetingType: 'Recurring',
        featuresUsed: ['Recording', 'Captions'],
        locationType: 'Hybrid',
        transcript: `Alice: Good morning, everyone. Let's kick off the Q3 sync for Project Phoenix. Bob, can you start with the latest on the UI components?
Bob: Absolutely. We've made fantastic progress. The new design system is fully implemented, and the team is really happy with the improved workflow. We're seeing a 20% reduction in development time.
Alice: That's excellent news! Really great work, Bob. Charlie, how about the backend integration?
Charlie: It's been a bit challenging. We ran into an unexpected issue with the database migration. The legacy system is throwing errors we didn't anticipate, and it's blocking our deployment pipeline.
Alice: I see. That's a significant roadblock. What's the plan to address this?
Charlie: We're exploring two options, but both will likely push our timeline back by at least a week. I'm honestly quite frustrated with this old system. It feels like we take one step forward and two steps back.
Bob: I know it's tough, Charlie, but your team always pulls through. We're confident you'll figure it out. The new features are looking amazing from our end.
Alice: I agree. Let's schedule a separate deep-dive for the database issue this afternoon. For now, let's focus on what's working. The positive feedback from the beta testers has been overwhelming. Everyone loves the new dashboard.
Charlie: That's good to hear. It helps motivate us to get past this hurdle. Thanks for the support.`
    },
    {
        id: 'meeting-2',
        title: 'Marketing Strategy Brainstorm',
        date: '2023-10-24',
        participants: [
            { name: 'Dana', department: 'Marketing' },
            { name: 'Eve', department: 'Marketing' },
            { name: 'Frank', department: 'Marketing' }
        ],
        durationMinutes: 60,
        department: 'Marketing',
        meetingType: 'One-Time',
        featuresUsed: ['Q&A'],
        locationType: 'Remote',
        transcript: `Dana: Alright team, let's brainstorm for the new campaign. No bad ideas.
Eve: I was thinking we could do a viral social media challenge. It could be fun and get a lot of engagement.
Frank: I'm not sure. That feels a bit risky and off-brand. Our audience is more professional. I think a series of in-depth webinars would be more appropriate and position us as thought leaders.
Dana: Both are valid points. Eve, the engagement could be huge. Frank, maintaining our brand voice is critical. Is there a middle ground?
Eve: Maybe a more professional 'challenge'? Like, a 'solve this industry problem' type of contest?
Frank: That's better, but I'm still worried about execution. A webinar is a safer bet and we have the content ready to go. It just seems inefficient to try something new when we have a proven strategy.
Dana: I understand the concern about risk, Frank, but we can't just stick to the same playbook forever. Our growth has been flat. We need to innovate. Let's try to flesh out Eve's idea a bit more. I think it has potential.
Frank: Okay, I'll keep an open mind. But I'm officially noting my reservations.
Eve: I appreciate that, Frank. I'm excited to see if we can make this work for everyone.`
    },
    {
        id: 'meeting-3',
        title: 'All-Hands Update',
        date: '2023-10-22',
        participants: [
            { name: 'CEO', department: 'Executive' },
            { name: 'CFO', department: 'Executive' },
            { name: 'CTO', department: 'Executive' },
            { name: 'Alice', department: 'Engineering' },
            { name: 'Dana', department: 'Marketing' }
        ],
        durationMinutes: 25,
        department: 'Executive',
        meetingType: 'Recurring',
        featuresUsed: ['Recording', 'Q&A', 'Captions'],
        locationType: 'In-Person',
        transcript: `CEO: Welcome everyone to our monthly all-hands. I have some fantastic news to share. We have successfully closed our Series B funding round, securing an additional $50 million!
(Applause)
CEO: This is a testament to every single one of you and your hard work. This capital will allow us to accelerate our product roadmap, expand into new markets, and, most importantly, invest in our people.
CFO: Financially, we are in a very strong position. Our revenue has grown 150% year-over-year, and we are on track to hit our annual targets. We'll be sharing detailed department budgets next week.
CTO: On the tech front, our platform uptime has been 99.99% for the last quarter. The engineering team has done a phenomenal job scaling our infrastructure to meet the increased demand. We're planning to hire 20 new engineers by the end of the year.
CEO: It's an exciting time to be here. We are building something special, and I couldn't be prouder of this team. Thank you all. Let's continue to build the future together.`
    },
    {
        id: 'meeting-4',
        title: 'Sales Pipeline Review',
        date: '2023-10-28',
        participants: [
            { name: 'Grace', department: 'Sales' },
            { name: 'Heidi', department: 'Sales' },
            { name: 'Ivan', department: 'Sales' }
        ],
        durationMinutes: 45,
        department: 'Sales',
        meetingType: 'Recurring',
        featuresUsed: ['Recording'],
        locationType: 'Remote',
        transcript: `Grace: Okay team, let's review the pipeline for this week. Heidi, how's the Acme Corp deal looking?
Heidi: It's progressing well. We've completed the demo, and they seemed very impressed. The next step is the proposal, which I plan to send by EOD Friday. I'm feeling optimistic about closing this one.
Grace: Excellent. Ivan, any updates on the Globex account?
Ivan: It's a tough one. Their legal team is dragging their feet on the contract review. It's slowing everything down. I've followed up twice this week, but I'm not getting much of a response. It's frustrating.
Grace: I see. Let's not let that one stall. I'll reach out to my contact in their legal department to see if I can help move things along. Keep pushing, Ivan. The effort will pay off.
Heidi: We also landed three new qualified leads from the webinar last week. The marketing team did a great job on that one.
Grace: That's fantastic news. Let's make sure we follow up with them promptly. Great work, everyone.`
    }
];

export type Page = 'dashboard' | 'meetings' | 'settings';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');

  const handleLogin = (username: string) => {
    setUser({ username, email: `${username.toLowerCase()}@example.com` });
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage meetings={MOCK_MEETINGS} />;
      case 'meetings':
        return <MeetingsPage meetings={MOCK_MEETINGS} />;
      case 'settings':
        return <SettingsPage user={user!} />;
      default:
        return <DashboardPage meetings={MOCK_MEETINGS} />;
    }
  };

  if (!user) {
    return <Login onLoginSuccess={handleLogin} />;
  }
  
  return (
    <Layout
        user={user}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onLogout={handleLogout}
    >
        {renderPage()}
    </Layout>
  );
};

export default App;