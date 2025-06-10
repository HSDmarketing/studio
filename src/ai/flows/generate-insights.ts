// src/ai/flows/generate-insights.ts
'use server';
/**
 * @fileOverview A flow to generate performance insights for social media data.
 *
 * - generateInsights - A function that generates insights based on social media performance data.
 * - GenerateInsightsInput - The input type for the generateInsights function.
 * - GenerateInsightsOutput - The return type for the generateInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateInsightsInputSchema = z.object({
  followerCount: z.number().describe('The number of followers.'),
  engagementRate: z.number().describe('The engagement rate as a percentage.'),
  postFrequency: z.string().describe('The frequency of posts (e.g., daily, weekly).'),
  timePeriod: z.string().describe('The time period to analyze (e.g., last 7 days, last 30 days).'),
  recentPostData: z.string().describe('Data about recent posts (e.g., likes, comments, shares).'),
});
export type GenerateInsightsInput = z.infer<typeof GenerateInsightsInputSchema>;

const GenerateInsightsOutputSchema = z.object({
  summary: z.string().describe('A summary of the social media performance.'),
  insights: z.array(z.string()).describe('Actionable insights to improve engagement.'),
});
export type GenerateInsightsOutput = z.infer<typeof GenerateInsightsOutputSchema>;

export async function generateInsights(input: GenerateInsightsInput): Promise<GenerateInsightsOutput> {
  return generateInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateInsightsPrompt',
  input: {schema: GenerateInsightsInputSchema},
  output: {schema: GenerateInsightsOutputSchema},
  prompt: `You are a social media marketing expert. Analyze the following social media performance data and provide actionable insights to improve engagement.

Follower Count: {{{followerCount}}}
Engagement Rate: {{{engagementRate}}}%
Post Frequency: {{{postFrequency}}}
Time Period: {{{timePeriod}}}
Recent Post Data: {{{recentPostData}}}

Summary:
Insights:`, // The output schema description drives the format of the output.
});

const generateInsightsFlow = ai.defineFlow(
  {
    name: 'generateInsightsFlow',
    inputSchema: GenerateInsightsInputSchema,
    outputSchema: GenerateInsightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
