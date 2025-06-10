"use client";

import { ChartPlaceholder } from "@/components/analytics/chart-placeholder";
import { InsightsGenerator } from "@/components/analytics/insights-generator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Users, Zap, ThumbsUp } from "lucide-react";
import type { ChartConfig } from "@/components/ui/chart"


const followerGrowthData = [
  { month: "Jan", followers: 1200, netChange: 100 },
  { month: "Feb", followers: 1350, netChange: 150 },
  { month: "Mar", followers: 1550, netChange: 200 },
  { month: "Apr", followers: 1680, netChange: 130 },
  { month: "May", followers: 1820, netChange: 140 },
  { month: "Jun", followers: 2000, netChange: 180 },
];

const followerChartConfig = {
  followers: { label: "Total Followers", color: "hsl(var(--chart-1))" },
  netChange: { label: "Net Change", color: "hsl(var(--chart-2))" },
} satisfies ChartConfig;

const engagementData = [
  { date: "Wk 1", likes: 350, comments: 45, shares: 15 },
  { date: "Wk 2", likes: 420, comments: 50, shares: 20 },
  { date: "Wk 3", likes: 380, comments: 60, shares: 12 },
  { date: "Wk 4", likes: 510, comments: 75, shares: 25 },
];

const engagementChartConfig = {
  likes: { label: "Likes", color: "hsl(var(--chart-1))" },
  comments: { label: "Comments", color: "hsl(var(--chart-2))" },
  shares: { label: "Shares", color: "hsl(var(--chart-3))" },
} satisfies ChartConfig;


export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <Card className="shadow-xl">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
             <div>
                <CardTitle className="text-2xl font-headline flex items-center">
                    <BarChart3 className="mr-3 h-7 w-7 text-primary" /> Performance Analytics
                </CardTitle>
                <CardDescription>Visualize key metrics and gain insights into your social media performance.</CardDescription>
             </div>
            <div className="flex items-center gap-4">
                <Select defaultValue="last_30_days">
                    <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Select Time Period" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="last_7_days">Last 7 Days</SelectItem>
                        <SelectItem value="last_30_days">Last 30 Days</SelectItem>
                        <SelectItem value="last_90_days">Last 90 Days</SelectItem>
                        <SelectItem value="all_time">All Time</SelectItem>
                    </SelectContent>
                </Select>
                 <Select defaultValue="all_accounts">
                    <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Select Account" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all_accounts">All Accounts</SelectItem>
                        <SelectItem value="ig1">My Awesome Biz IG</SelectItem>
                        <SelectItem value="fb1">My Startup Page FB</SelectItem>
                    </SelectContent>
                </Select>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <ChartPlaceholder
          title="Follower Growth"
          description="Track your follower count over time."
          data={followerGrowthData}
          config={followerChartConfig}
          dataKeys={[
            { key: "followers", name: "Total Followers" },
          ]}
          xAxisKey="month"
        />
        <ChartPlaceholder
          title="Engagement Overview"
          description="Likes, comments, and shares analysis."
          data={engagementData}
          config={engagementChartConfig}
          dataKeys={[
            { key: "likes", name: "Likes" },
            { key: "comments", name: "Comments" },
            { key: "shares", name: "Shares"},
          ]}
          xAxisKey="date"
        />
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Reach</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">75,830</div>
                <p className="text-xs text-muted-foreground">+12.5% from last month</p>
            </CardContent>
        </Card>
         <Card className="shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Automation Triggers</CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">1,254</div>
                <p className="text-xs text-muted-foreground">+87 this week</p>
            </CardContent>
        </Card>
         <Card className="shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Post Engagement</CardTitle>
                <ThumbsUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">6.2%</div>
                <p className="text-xs text-muted-foreground">vs 5.8% previous period</p>
            </CardContent>
        </Card>
      </div>

      <InsightsGenerator />
    </div>
  );
}
