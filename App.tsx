
import React, { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import type { Meeting } from './types';

const MOCK_MEETINGS: Meeting[] = [
    {
        id: 'meeting-1',
        title: 'Q3 Project Phoenix Sync',
        date: '2023-10-26',
        participants: ['Alice', 'Bob', 'Charlie'],
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
        participants: ['Dana', 'Eve', 'Frank'],
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
        participants: ['Company-wide'],
        transcript: `CEO: Welcome everyone to our monthly all-hands. I have some fantastic news to share. We have successfully closed our Series B funding round, securing an additional $50 million!
(Applause)
CEO: This is a testament to every single one of you and your hard work. This capital will allow us to accelerate our product roadmap, expand into new markets, and, most importantly, invest in our people.
CFO: Financially, we are in a very strong position. Our revenue has grown 150% year-over-year, and we are on track to hit our annual targets. We'll be sharing detailed department budgets next week.
CTO: On the tech front, our platform uptime has been 99.99% for the last quarter. The engineering team has done a phenomenal job scaling our infrastructure to meet the increased demand. We're planning to hire 20 new engineers by the end of the year.
CEO: It's an exciting time to be here. We are building something special, and I couldn't be prouder of this team. Thank you all. Let's continue to build the future together.`
    }
];

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <>
      {isLoggedIn ? (
        <Dashboard meetings={MOCK_MEETINGS} onLogout={handleLogout} />
      ) : (
        <Login onLoginSuccess={handleLogin} />
      )}
    </>
  );
};

export default App;
