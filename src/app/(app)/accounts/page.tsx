"use client";

import { useState } from "react";
import { AccountCard, type SocialAccount } from "@/components/accounts/account-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Instagram, Facebook, Twitter } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const initialAccounts: SocialAccount[] = [
  { id: "1", platform: "Instagram", name: "My Awesome Biz", username: "@myawesomebiz", profilePictureUrl: "https://placehold.co/100x100.png", status: "connected", dataAiHint: "instagram logo" },
  { id: "2", platform: "Facebook", name: "My Startup Page", username: "mystartupfb", profilePictureUrl: "https://placehold.co/100x100.png", status: "needs_reauth", dataAiHint: "facebook logo" },
  { id: "3", platform: "X", name: "My X Profile", username: "@myxprofile", profilePictureUrl: "https://placehold.co/100x100.png", status: "disconnected", dataAiHint: "twitter logo" },
];

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<SocialAccount[]>(initialAccounts);
  const { toast } = useToast();

  const handleRemoveAccount = (accountId: string) => {
    setAccounts(prevAccounts => prevAccounts.filter(acc => acc.id !== accountId));
  };

  const handleConnectPlatform = (platform: "Instagram" | "Facebook" | "X") => {
    // Placeholder for OAuth flow
    toast({
      title: `Connecting to ${platform}`,
      description: `You would now be redirected to ${platform} for authentication. (Demo)`,
    });
    // In a real app, this would trigger an OAuth flow and then add the account
    // For demo, let's add a placeholder account after a delay
    setTimeout(() => {
        const newAccountId = String(Date.now());
        const newAccount: SocialAccount = {
            id: newAccountId,
            platform: platform,
            name: `New ${platform} Account`,
            username: `@new_${platform.toLowerCase()}_${newAccountId.slice(-4)}`,
            profilePictureUrl: "https://placehold.co/100x100.png",
            status: "connected",
            dataAiHint: `${platform.toLowerCase()} logo`
        };
        setAccounts(prev => [...prev, newAccount]);
        toast({
            title: `${platform} Account Connected!`,
            description: `${newAccount.name} is now ready.`
        });
    }, 2000);
  };
  
  const handleReconnectAccount = (accountId: string) => {
    // Placeholder for re-OAuth flow
    const account = accounts.find(acc => acc.id === accountId);
    if (account) {
      toast({
        title: `Reconnecting ${account.platform} account`,
        description: `Starting OAuth flow for ${account.name}. (Demo)`,
      });
       // Simulate successful reconnection
      setTimeout(() => {
        setAccounts(prev => prev.map(acc => acc.id === accountId ? {...acc, status: "connected"} : acc));
        toast({ title: "Account Reconnected!", description: `${account.name} is active again.`});
      }, 1500);
    }
  };

  return (
    <div className="space-y-8">
      <Card className="shadow-xl">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl font-headline">Connect Accounts</CardTitle>
              <CardDescription>Add and manage your social media profiles for automation.</CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full sm:w-auto">
                  <PlusCircle className="mr-2 h-5 w-5" /> Add New Account
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add a new social media account</DialogTitle>
                  <DialogDescription>
                    Choose a platform to connect. You&apos;ll be guided through the authentication process.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <DialogClose asChild>
                    <Button variant="outline" className="justify-start text-lg p-6" onClick={() => handleConnectPlatform("Instagram")}>
                      <Instagram className="mr-3 h-6 w-6 text-[#E1306C]" /> Connect Instagram Business
                    </Button>
                  </DialogClose>
                  <DialogClose asChild>
                  <Button variant="outline" className="justify-start text-lg p-6" onClick={() => handleConnectPlatform("Facebook")}>
                    <Facebook className="mr-3 h-6 w-6 text-[#1877F2]" /> Connect Facebook Page
                  </Button>
                  </DialogClose>
                   <DialogClose asChild>
                  <Button variant="outline" className="justify-start text-lg p-6" onClick={() => handleConnectPlatform("X")}>
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="mr-3 h-6 w-6 fill-current"><g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></g></svg>
                    Connect X (Twitter)
                  </Button>
                  </DialogClose>
                </div>
                 <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">Cancel</Button>
                    </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {accounts.length === 0 ? (
            <p className="py-10 text-center text-muted-foreground">
              No accounts connected yet. Click &quot;Add New Account&quot; to get started.
            </p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {accounts.map(account => (
                <AccountCard key={account.id} account={account} onRemove={handleRemoveAccount} onReconnect={handleReconnectAccount}/>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="shadow-xl">
        <CardHeader>
            <CardTitle className="text-xl font-headline">Understanding Account Statuses</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
            <p><strong className="text-green-600">Connected:</strong> The account is active and ReplyDo can access it.</p>
            <p><strong className="text-yellow-600">Needs Re-authentication:</strong> Permissions might have expired. Reconnect the account.</p>
            <p><strong className="text-red-600">Disconnected:</strong> The account is no longer linked. You'll need to add it again or reconnect.</p>
        </CardContent>
      </Card>
    </div>
  );
}
