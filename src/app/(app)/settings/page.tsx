import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Settings - ReplyDo',
};

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">General Settings</CardTitle>
          <CardDescription>This is a placeholder for general application settings.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Settings content will go here. You might manage your profile, notifications, billing, team members, etc.</p>
        </CardContent>
      </Card>
    </div>
  );
}
