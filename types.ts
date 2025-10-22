export type Department = 'Engineering' | 'Marketing' | 'Executive' | 'Sales' | 'Product';

export interface Participant {
  name: string;
  department: Department;
}

export interface Meeting {
  id: string;
  title: string;
  date: string;
  participants: Participant[];
  transcript: string;
  durationMinutes: number;
  department: Department;
  meetingType: 'Recurring' | 'One-Time';
  featuresUsed: ('Recording' | 'Q&A' | 'Captions')[];
  locationType: 'Remote' | 'Hybrid' | 'In-Person';
}

export type Sentiment = 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL' | 'MIXED';

export interface SentimentAnalysisResult {
  overallSentiment: Sentiment;
  summary: string;
  keyPoints: {
    sentiment: Sentiment;
    text: string;
  }[];
  sentimentScores: {
    positive: number;
    negative: number;
    neutral: number;
  };
}

export interface WorkforceAnalysisResult {
  speakingTurns: Record<string, number>;
  wordCountPerParticipant: Record<string, number>;
}

export interface User {
    username: string;
    email: string;
}