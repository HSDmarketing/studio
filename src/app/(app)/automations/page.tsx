"use client";

import { useState } from "react";
import { AutomationItem, type Automation } from "@/components/automations/automation-item";
import { AutomationForm } from "@/components/automations/automation-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, ListFilter, Bot } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Simplified SocialAccountChoice for demo
interface SocialAccountChoice {
  id: string;
  platform: string;
  name: string;
}
const demoAccounts: SocialAccountChoice[] = [
  { id: "ig1", platform: "Instagram", name: "My Awesome Biz IG" },
  { id: "fb1", platform: "Facebook", name: "My Startup Page FB" },
];


const initialAutomations: Automation[] = [
  { id: "auto1", name: "Welcome New Instagram Followers", accountId: "ig1", accountName: "My Awesome Biz IG", platform: "Instagram", trigger: { type: "new_follower_dm" }, action: { type: "send_dm", responseText: "Hey {{username}}! Thanks for following! Check out our latest offers." }, isActive: true, lastTriggered: new Date(Date.now() - 2 * 60 * 60 * 1000), triggerCount: 15 },
  { id: "auto2", name: "Reply to Price Inquiries (FB)", accountId: "fb1", accountName: "My Startup Page FB", platform: "Facebook", trigger: { type: "comment_keyword", keywords: ["price", "cost", "how much"] }, action: { type: "reply_comment", responseText: "Thanks for asking, {{username}}! We've sent you a DM with pricing details." }, isActive: true, triggerCount: 5, lastTriggered: new Date(Date.now() - 5 * 60 * 60 * 1000) },
  { id: "auto3", name: "Support Keyword DM (IG)", accountId: "ig1", accountName: "My Awesome Biz IG", platform: "Instagram", trigger: { type: "dm_keyword", keywords: ["help", "support", "issue"] }, action: { type: "send_dm", responseText: "Hi {{username}}, sorry you're having trouble. Our support team will get back to you shortly." }, isActive: false, triggerCount: 2 },
];

export default function AutomationsPage() {
  const [automations, setAutomations] = useState<Automation[]>(initialAutomations);
  const [showForm, setShowForm] = useState(false);
  const [editingAutomation, setEditingAutomation] = useState<Automation | undefined>(undefined);
  const { toast } = useToast();

  const handleToggleActive = (automationId: string, isActive: boolean) => {
    setAutomations(prev =>
      prev.map(auto => (auto.id === automationId ? { ...auto, isActive } : auto))
    );
  };

  const handleEdit = (automationId: string) => {
    const autoToEdit = automations.find(auto => auto.id === automationId);
    setEditingAutomation(autoToEdit);
    setShowForm(true);
  };

  const handleDelete = (automationId: string) => {
    setAutomations(prev => prev.filter(auto => auto.id !== automationId));
  };

  const handleFormSubmit = (data: Omit<Automation, 'id' | 'isActive' | 'lastTriggered' | 'triggerCount'>) => {
    const account = demoAccounts.find(acc => acc.id === data.accountId);
    if (editingAutomation) {
      setAutomations(prev =>
        prev.map(auto =>
          auto.id === editingAutomation.id
            ? { ...editingAutomation, ...data, accountName: account?.name, platform: account?.platform }
            : auto
        )
      );
      toast({ title: "Automation Updated", description: `${data.name} has been successfully updated.` });
    } else {
      const newAutomation: Automation = {
        id: String(Date.now()),
        ...data,
        accountName: account?.name,
        platform: account?.platform,
        isActive: true, // Default to active for new automations
        triggerCount: 0,
      };
      setAutomations(prev => [newAutomation, ...prev]);
      toast({ title: "Automation Created", description: `${data.name} is now live.` });
    }
    setShowForm(false);
    setEditingAutomation(undefined);
  };
  
  const handleCancelForm = () => {
    setShowForm(false);
    setEditingAutomation(undefined);
  }

  const activeAutomations = automations.filter(a => a.isActive);
  const pausedAutomations = automations.filter(a => !a.isActive);

  if (showForm) {
    return <AutomationForm accounts={demoAccounts} initialData={editingAutomation} onSubmitForm={handleFormSubmit} onCancel={handleCancelForm} />;
  }

  return (
    <div className="space-y-8">
      <Card className="shadow-xl">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl font-headline flex items-center">
                <Bot className="mr-3 h-7 w-7 text-primary" /> Automation Hub
              </CardTitle>
              <CardDescription>Create, manage, and monitor your social media automations.</CardDescription>
            </div>
            <div className="flex items-center gap-2">
                <Button variant="outline" size="sm"><ListFilter className="mr-2 h-4 w-4" /> Filter</Button>
                <Button onClick={() => { setEditingAutomation(undefined); setShowForm(true); }}>
                    <PlusCircle className="mr-2 h-5 w-5" /> Create New Automation
                </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {automations.length === 0 ? (
            <p className="py-10 text-center text-muted-foreground">
              No automations configured yet. Click &quot;Create New Automation&quot; to start.
            </p>
          ) : (
            <div className="space-y-6">
              {activeAutomations.length > 0 && (
                <div>
                  <h3 className="mb-4 text-lg font-semibold text-green-600">Active Automations ({activeAutomations.length})</h3>
                  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {activeAutomations.map(auto => (
                      <AutomationItem
                        key={auto.id}
                        automation={auto}
                        onToggleActive={handleToggleActive}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                      />
                    ))}
                  </div>
                </div>
              )}
              {pausedAutomations.length > 0 && (
                 <div>
                  <h3 className="mb-4 text-lg font-semibold text-gray-500">Paused Automations ({pausedAutomations.length})</h3>
                  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {pausedAutomations.map(auto => (
                      <AutomationItem
                        key={auto.id}
                        automation={auto}
                        onToggleActive={handleToggleActive}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
      <Card className="shadow-xl">
        <CardHeader>
            <CardTitle className="text-xl font-headline">Automation Best Practices</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
            <p><strong>Be Authentic:</strong> Ensure your automated responses still sound human and helpful.</p>
            <p><strong>Monitor Performance:</strong> Regularly check your automation logs and analytics to refine triggers and responses.</p>
            <p><strong>Respect Platform Rules:</strong> Avoid overly aggressive automation that could violate platform terms of service.</p>
            <p><strong>Personalize:</strong> Use placeholders like {'{{username}}'} to make interactions more personal.</p>
        </CardContent>
      </Card>
    </div>
  );
}
