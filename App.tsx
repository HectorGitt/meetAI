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
    },
    {
        id: 'meeting-5',
        title: 'Product Roadmap Planning Q4',
        date: '2023-11-02',
        participants: [
            { name: 'Zoe', department: 'Product' },
            { name: 'Alice', department: 'Engineering' },
            { name: 'Dana', department: 'Marketing' }
        ],
        durationMinutes: 75,
        department: 'Product',
        meetingType: 'One-Time',
        featuresUsed: ['Q&A'],
        locationType: 'Hybrid',
        transcript: `Zoe: Thanks for joining, everyone. The goal for today is to finalize the key themes for our Q4 roadmap. Top of the list is the new analytics dashboard.
Alice: From an engineering perspective, the dashboard is a heavy lift. We'll need to dedicate the entire Phoenix team to it if we want it done by end of quarter. That means other feature requests will have to wait.
Dana: The dashboard is a huge selling point for us. The marketing team can build a whole campaign around it. What other features would be delayed?
Alice: The requested API improvements and the mobile optimization pass would likely slip to Q1.
Zoe: That's a tough trade-off. The API improvements are critical for our power users. Can we scope down the dashboard's V1 to something more manageable?
Alice: Perhaps. If we launch with just the core widgets and save the advanced customization for later, we might be able to squeeze in the API work. But it will be tight.
Dana: I think that's a good compromise. Launching with a solid V1 of the dashboard is better than delaying it entirely. We can market it as 'new and improved analytics, with more to come!'
Zoe: Okay, let's go with that. Alice, can you get me a revised estimate for the scoped-down dashboard? I'll update the roadmap. Great discussion, team.`
    },
    {
        id: 'meeting-6',
        title: 'Weekly Design Crit',
        date: '2023-11-05',
        participants: [
            { name: 'Bob', department: 'Engineering' },
            { name: 'Leo', department: 'Engineering' },
            { name: 'Mia', department: 'Engineering' }
        ],
        durationMinutes: 45,
        department: 'Engineering',
        meetingType: 'Recurring',
        featuresUsed: ['Recording'],
        locationType: 'Remote',
        transcript: `Bob: Alright, Leo, you're up first. Show us what you've got for the new user onboarding flow.
Leo: Sure thing. Here are the mockups. I tried to simplify the steps and add more visual cues based on our last discussion.
Mia: I really like this. The progress bar at the top is a great addition. It feels much less daunting. Have you considered what it looks like on mobile?
Leo: Good question. I have some mobile-specific mockups here. The layout stacks vertically, and the text is a bit larger for readability.
Bob: This is really solid work, Leo. The flow is intuitive, and it looks clean. My only suggestion would be to maybe make the 'skip for now' button a bit more prominent. Some users might feel forced to complete everything.
Mia: I agree with Bob. A secondary button style might work well there.
Leo: That's great feedback, thanks! I'll make that tweak and send out the updated designs this afternoon.`
    },
    {
        id: 'meeting-7',
        title: 'Executive Offsite Debrief',
        date: '2023-11-08',
        participants: [
            { name: 'CEO', department: 'Executive' },
            { name: 'CFO', department: 'Executive' },
            { name: 'CTO', department: 'Executive' }
        ],
        durationMinutes: 90,
        department: 'Executive',
        meetingType: 'One-Time',
        featuresUsed: ['Recording', 'Captions'],
        locationType: 'In-Person',
        transcript: `CEO: Let's debrief on the offsite. The primary topic was our international expansion strategy. After reviewing the data, it's clear that Europe presents the biggest opportunity, but also the biggest challenge.
CFO: The financial models support this. The initial investment will be significant, particularly in hiring and localization. We'll need to re-allocate budget from some Q1 initiatives. This will not be a popular decision.
CTO: From a technical standpoint, data residency is our main hurdle. We'll need to set up EU-based data centers, which is a massive project. We can't simply use our existing infrastructure.
CEO: I understand the challenges, but delaying is not an option. The market is ripe, and our competitors are already making moves. We need to be bold. I'm making the call: we are officially greenlighting Project Europa.
CFO: Understood. I will begin adjusting the Q1 budgets. Department heads will need to be notified by the end of the week. Expect some pushback.
CTO: My team will start architecting the new infrastructure immediately. This will have a major impact on our current roadmap. We'll need to de-prioritize some planned platform work.
CEO: I'm aware of the sacrifices. This is a company-wide strategic pivot. It will be difficult, but it's necessary for our long-term growth. Let's prepare the internal announcement.`
    },
    {
        id: 'meeting-8',
        title: 'Customer Feedback Review (Sales & Product)',
        date: '2023-11-10',
        participants: [
            { name: 'Grace', department: 'Sales' },
            { name: 'Zoe', department: 'Product' },
            { name: 'Ivan', department: 'Sales' }
        ],
        durationMinutes: 60,
        department: 'Sales',
        meetingType: 'Recurring',
        featuresUsed: ['Captions', 'Q&A'],
        locationType: 'Remote',
        transcript: `Grace: Welcome, Zoe. Thanks for joining our weekly feedback session. Ivan, why don't you start with the feedback from Globex?
Ivan: They're a big fan of the platform overall, but they are consistently asking for better reporting tools. They want to be able to create custom dashboards and export raw data. It's a deal-breaker for their renewal.
Zoe: This is helpful, Ivan. We've heard similar feedback from other enterprise clients. Better reporting is actually the main driver for the new analytics dashboard we're planning for Q4.
Grace: That's great to hear. Knowing that's on the roadmap gives us something concrete to take back to them. Can you share any mockups or a timeline?
Zoe: It's still in early design, but I can share the project brief with you. We're targeting an end-of-Q4 release for the first version.
Ivan: Perfect. That will help a lot. Another common request is for more granular user permissions. Admins want more control over who can see what.
Zoe: Yep, that's on our radar too. It's a slightly lower priority than the dashboard, but we're hoping to tackle it in Q1 of next year. Keep the feedback coming, this is incredibly valuable for us to prioritize effectively.`
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
