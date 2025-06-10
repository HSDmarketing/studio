"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Edit3, Trash2, Zap, MessageSquare, UserPlus, Settings2, Eye } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { Label } from "../ui/label";
import { formatDistanceToNow } from 'date-fns';

export interface AutomationTrigger {
  type: "comment_keyword" | "new_follower_dm" | "dm_keyword" | string; // Allow string for flexibility
  keywords?: string[];
}

export interface AutomationAction {
  type: "reply_comment" | "send_dm" | "like_post" | string; // Allow string for flexibility
  responseText?: string;
}

export interface Automation {
  id: string;
  name: string;
  description?: string;
  accountId: string; // ID of the social account it applies to
  accountName?: string; // Display name of the account
  platform?: string; // e.g., "Instagram"
  trigger: AutomationTrigger;
  action: AutomationAction;
  isActive: boolean;
  lastTriggered?: Date;
  triggerCount?: number;
}

interface AutomationItemProps {
  automation: Automation;
  onToggleActive: (automationId: string, isActive: boolean) => void;
  onEdit: (automationId: string) => void;
  onDelete: (automationId: string) => void;
}

export function AutomationItem({ automation, onToggleActive, onEdit, onDelete }: AutomationItemProps) {
  const { toast } = useToast();

  const handleDelete = () => {
    onDelete(automation.id);
    toast({
      title: "Automation Deleted",
      description: `Automation "${automation.name}" has been deleted.`,
    });
  };

  const handleToggle = (checked: boolean) => {
    onToggleActive(automation.id, checked);
    toast({
      title: `Automation ${checked ? "Activated" : "Paused"}`,
      description: `"${automation.name}" is now ${checked ? "active" : "paused"}.`,
    });
  };

  const getTriggerIcon = () => {
    switch (automation.trigger.type) {
      case "comment_keyword": return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case "new_follower_dm": return <UserPlus className="h-4 w-4 text-green-500" />;
      case "dm_keyword": return <Zap className="h-4 w-4 text-purple-500" />;
      default: return <Settings2 className="h-4 w-4 text-gray-500" />;
    }
  };
  
  const getTriggerText = () => {
    switch (automation.trigger.type) {
      case "comment_keyword": return `Comment includes: ${automation.trigger.keywords?.join(", ") || "any keyword"}`;
      case "new_follower_dm": return "New follower";
      case "dm_keyword": return `DM includes: ${automation.trigger.keywords?.join(", ") || "any keyword"}`;
      default: return "Custom trigger";
    }
  };

  const getActionText = () => {
     switch (automation.action.type) {
      case "reply_comment": return `Reply: "${automation.action.responseText?.substring(0,30) || "" }..."`;
      case "send_dm": return `Send DM: "${automation.action.responseText?.substring(0,30) || "" }..."`;
      case "like_post": return "Like the content";
      default: return "Custom action";
    }
  }

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              {getTriggerIcon()} {automation.name}
            </CardTitle>
            <CardDescription className="text-xs mt-1">
              For: {automation.accountName || "Unknown Account"} ({automation.platform || "N/A"})
            </CardDescription>
            {automation.description && <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{automation.description}</p>}
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center space-x-2">
                <Switch
                    id={`active-switch-${automation.id}`}
                    checked={automation.isActive}
                    onCheckedChange={handleToggle}
                    aria-label={automation.isActive ? "Deactivate automation" : "Activate automation"}
                />
                <Label htmlFor={`active-switch-${automation.id}`} className="text-sm">
                    {automation.isActive ? "Active" : "Paused"}
                </Label>
            </div>
            {automation.isActive && <Badge variant="default" className="bg-green-500 hover:bg-green-600">Active</Badge>}
            {!automation.isActive && <Badge variant="secondary">Paused</Badge>}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <div>
            <p className="font-medium text-foreground">Trigger (IF):</p>
            <p className="text-muted-foreground">{getTriggerText()}</p>
        </div>
         <div>
            <p className="font-medium text-foreground">Action (THEN):</p>
            <p className="text-muted-foreground">{getActionText()}</p>
        </div>
        <div className="text-xs text-muted-foreground">
            <p>Triggered: {automation.triggerCount || 0} times</p>
            {automation.lastTriggered && <p>Last triggered: {formatDistanceToNow(new Date(automation.lastTriggered), { addSuffix: true })}</p>}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 border-t pt-4">
        <Button variant="ghost" size="sm" onClick={() => toast({title: "View Logs (Demo)", description:"Automation logs would appear here."})}>
            <Eye className="mr-2 h-4 w-4" /> Logs
        </Button>
        <Button variant="outline" size="sm" onClick={() => onEdit(automation.id)}>
          <Edit3 className="mr-2 h-4 w-4" /> Edit
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm">
              <Trash2 className="mr-2 h-4 w-4" /> Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the automation: "{automation.name}".
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">
                Yes, Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
