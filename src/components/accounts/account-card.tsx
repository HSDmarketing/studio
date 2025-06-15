"use client";

import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, AlertTriangle, Trash2, Edit3, RotateCcw } from "lucide-react";
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

export interface SocialAccount {
  id: string;
  platform: "Instagram" | "Facebook" | "X"; // Add more platforms as needed
  name: string; // e.g., Instagram Business Account Name or Page Name
  username: string; // e.g., @username or Page ID
  profilePictureUrl: string;
  status: "connected" | "disconnected" | "needs_reauth";
  dataAiHint?: string;
}

interface AccountCardProps {
  account: SocialAccount;
  onRemove: (accountId: string) => void;
  onReconnect?: (accountId: string) => void; // Optional, if re-auth flow is separate
}

export function AccountCard({ account, onRemove, onReconnect }: AccountCardProps) {
  const { toast } = useToast();

  const handleRemove = () => {
    // Simulate removal
    onRemove(account.id);
    toast({
      title: `${account.platform} account removed`,
      description: `${account.name} (${account.username}) has been disconnected.`,
    });
  };
  
  const handleReconnect = () => {
    if (onReconnect) {
      onReconnect(account.id);
    }
    toast({
      title: `Reconnecting ${account.platform} account`,
      description: `Starting OAuth flow for ${account.name}. (Demo)`,
    });
  }

  const getStatusBadge = () => {
    switch (account.status) {
      case "connected":
        return <Badge variant="default" className="bg-green-500 hover:bg-green-600"><CheckCircle2 className="mr-1 h-3 w-3" />Connected</Badge>;
      case "disconnected":
        return <Badge variant="destructive"><XCircle className="mr-1 h-3 w-3" />Disconnected</Badge>;
      case "needs_reauth":
        return <Badge variant="outline" className="border-yellow-500 text-yellow-600"><AlertTriangle className="mr-1 h-3 w-3" />Needs Re-authentication</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 w-full">
      <CardHeader className="flex flex-row items-start gap-4">
        <Image
          src={account.profilePictureUrl}
          alt={`${account.name} profile picture`}
          width={60}
          height={60}
          className="rounded-full border-2 border-primary"
          data-ai-hint={account.dataAiHint || `${account.platform.toLowerCase()} logo`}
        />
        <div className="flex-1">
          <CardTitle className="text-lg font-headline">{account.name}</CardTitle>
          <CardDescription className="text-sm">{account.username} - {account.platform}</CardDescription>
          <div className="mt-2">{getStatusBadge()}</div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground">
          {account.status === "connected" && "Ready to automate and schedule posts."}
          {account.status === "disconnected" && "This account is no longer active. Reconnect to resume services."}
          {account.status === "needs_reauth" && "Permissions may have expired. Please re-authenticate to continue."}
        </p>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        {account.status === "needs_reauth" && onReconnect && (
          <Button variant="outline" size="sm" onClick={handleReconnect}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Reconnect
          </Button>
        )}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm">
              <Trash2 className="mr-2 h-4 w-4" />
              Remove
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will disconnect the account <span className="font-semibold">{account.name} ({account.username})</span> from ReplyDo.
                You will need to re-authenticate to use it again.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleRemove} className="bg-destructive hover:bg-destructive/90">
                Yes, Remove
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
