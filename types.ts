
export interface Meeting {
  id: string;
  title: string;
  date: string;
  participants: string[];
  transcript: string;
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
