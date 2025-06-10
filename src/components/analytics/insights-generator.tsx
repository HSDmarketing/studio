"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { generateInsights, type GenerateInsightsInput, type GenerateInsightsOutput } from "@/ai/flows/generate-insights";
import { Loader2, Sparkles, Lightbulb } from "lucide-react";

const GenerateInsightsInputSchema = z.object({
  followerCount: z.coerce.number().min(0, "Follower count must be positive."),
  engagementRate: z.coerce.number().min(0, "Engagement rate must be positive.").max(100, "Engagement rate cannot exceed 100."),
  postFrequency: z.string().min(1, "Post frequency is required."),
  timePeriod: z.string().min(1, "Time period is required."),
  recentPostData: z.string().min(10, "Please provide some data about recent posts."),
});


export function InsightsGenerator() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [insightsResult, setInsightsResult] = useState<GenerateInsightsOutput | null>(null);

  const form = useForm<GenerateInsightsInput>({
    resolver: zodResolver(GenerateInsightsInputSchema),
    defaultValues: {
      followerCount: 1000,
      engagementRate: 5.0,
      postFrequency: "3 times a week",
      timePeriod: "last 30 days",
      recentPostData: "Posted 12 times. Average likes: 50, Average comments: 5. Top post: 'New product launch' with 120 likes and 15 comments.",
    },
  });

  async function onSubmit(values: GenerateInsightsInput) {
    setIsLoading(true);
    setInsightsResult(null);
    try {
      const result = await generateInsights(values);
      setInsightsResult(result);
      toast({
        title: "Insights Generated!",
        description: "AI has analyzed your data.",
      });
    } catch (error) {
      console.error("Error generating insights:", error);
      toast({
        title: "Error Generating Insights",
        description: error instanceof Error ? error.message : "An unknown error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="shadow-xl">
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" /> AI Performance Insights
        </CardTitle>
        <CardDescription>
          Enter your social media performance data to get AI-powered insights and recommendations.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="followerCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Followers</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 5000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="engagementRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Engagement Rate (%)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.1" placeholder="e.g., 3.5" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="postFrequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Post Frequency</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Daily, 3 times a week" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="timePeriod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time Period Analyzed</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Last 7 days, Last 30 days" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="recentPostData"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recent Post Data Summary</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your recent posts, likes, comments, shares, top performing content, etc."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide as much detail as possible for better insights.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="border-t pt-6">
            <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              Generate Insights
            </Button>
          </CardFooter>
        </form>
      </Form>

      {insightsResult && (
        <CardContent className="mt-6 border-t pt-6">
          <h3 className="text-xl font-semibold font-headline mb-2 text-primary flex items-center gap-2">
            <Lightbulb /> Generated Summary
          </h3>
          <p className="text-muted-foreground mb-4 bg-muted p-4 rounded-md">{insightsResult.summary}</p>
          
          <h3 className="text-xl font-semibold font-headline mb-2 text-primary flex items-center gap-2">
            <Lightbulb /> Actionable Insights
          </h3>
          <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
            {insightsResult.insights.map((insight, index) => (
              <li key={index} className="bg-muted p-3 rounded-md">{insight}</li>
            ))}
          </ul>
        </CardContent>
      )}
    </Card>
  );
}
