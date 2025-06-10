import { MetricCard } from "@/components/dashboard/metric-card";
import { ActivityItem } from "@/components/dashboard/activity-item";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Layers, CalendarClock, Zap, TrendingUp, MessageSquare, UserPlus, BarChart3 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard - RepliGo',
};

const connectedAccounts = [
  { name: "Instagram Biz", username: "@repligo_demo", img: "https://placehold.co/40x40.png?font=roboto", dataAiHint: "instagram logo" },
  { name: "Facebook Page", username: "RepliGo Solutions", img: "https://placehold.co/40x40.png?font=roboto", dataAiHint: "facebook logo" },
];

const recentActivities = [
  { actorName: "John Doe", actorImage: "https://placehold.co/40x40.png", action: "scheduled a new post for", target: "Instagram", time: "2 hours ago", icon: CalendarClock, dataAiHint: "profile photo" },
  { actorName: "AI Assistant", action: "replied to 5 comments on", target: "Facebook", time: "3 hours ago", icon: Zap, dataAiHint: "" },
  { actorName: "Jane Smith", actorImage: "https://placehold.co/40x40.png", action: "connected a new account:", target: "X (Twitter)", time: "1 day ago", icon: UserPlus, dataAiHint: "profile photo" },
  { action: "Follower growth campaign started", time: "2 days ago", icon: TrendingUp },
];


export default function DashboardPage() {
  return (
    <div className="grid gap-6 md:gap-8">
      {/* Key Metrics Section */}
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard title="Total Followers" value="12,345" icon={Users} trend="+150 this week" />
        <MetricCard title="Engagement Rate" value="4.5%" icon={TrendingUp} trend="+0.2% this month" />
        <MetricCard title="Scheduled Posts" value="27" icon={CalendarClock} description="Next post in 3 hours" />
        <MetricCard title="Active Automations" value="8" icon={Zap} description="Handling comments & DMs" />
      </section>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Connected Accounts Section */}
        <Card className="lg:col-span-1 shadow-lg">
          <CardHeader>
            <CardTitle>Connected Accounts</CardTitle>
            <CardDescription>Manage your social media profiles.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {connectedAccounts.map(acc => (
              <div key={acc.name} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <Image src={acc.img} alt={acc.name} width={40} height={40} className="rounded-full" data-ai-hint={acc.dataAiHint} />
                  <div>
                    <p className="font-medium text-foreground">{acc.name}</p>
                    <p className="text-xs text-muted-foreground">{acc.username}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/accounts">Manage</Link>
                </Button>
              </div>
            ))}
            <Button className="w-full mt-2" variant="default" asChild>
              <Link href="/accounts"><UserPlus className="mr-2 h-4 w-4" />Add Account</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity Section */}
        <Card className="lg:col-span-2 shadow-lg">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>What's been happening with your accounts.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-1 max-h-[400px] overflow-y-auto">
            {recentActivities.map((activity, index) => (
              <ActivityItem
                key={index}
                actorName={activity.actorName}
                actorImage={activity.actorImage}
                action={activity.action}
                target={activity.target}
                time={activity.time}
                icon={activity.icon}
              />
            ))}
          </CardContent>
        </Card>
      </div>
      
      {/* Quick Links/Widgets Section */}
      <section className="grid gap-4 md:grid-cols-2">
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><CalendarClock className="text-primary" /> Quick Schedule</CardTitle>
            <CardDescription>Jump right into scheduling your next post.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" asChild>
              <Link href="/scheduling">Create New Post</Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Zap className="text-primary" /> Automation Hub</CardTitle>
            <CardDescription>View and manage your active automations.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" asChild>
              <Link href="/automations">Manage Automations</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
