
"use client";

import { useState, useEffect } from "react";
import * as z from "zod";
import { PostComposer } from "@/components/scheduling/post-composer";
import { ScheduledPostItem, type ScheduledPost } from "@/components/scheduling/scheduled-post-item";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ListFilter, CalendarDays, PlusCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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

// For PostComposer schema
const postSchema = z.object({
  accountId: z.string().min(1, "Please select an account."),
  caption: z.string().min(1, "Caption cannot be empty.").max(2200, "Caption too long."),
  media: z.any().optional(),
  scheduledAt: z.date().optional(),
});

// Moved initialScheduledPosts definition inside useEffect
// const initialScheduledPosts: ScheduledPost[] = [ ... ];

export default function SchedulingPage() {
  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>([]); // Initialize with empty array
  const [isComposerOpen, setIsComposerOpen] = useState(true); // Default to open for new page
  const { toast } = useToast();

  useEffect(() => {
    // Define and set initial posts on the client side
    const initialPosts: ScheduledPost[] = [
      { id: "sp1", accountId: "ig1", accountName: "My Awesome Biz IG", platform: "Instagram", caption: "Exciting news coming soon! #StayTuned #BigAnnouncement", scheduledAt: new Date(Date.now() + 3 * 60 * 60 * 1000), status: "scheduled", mediaUrl: "https://placehold.co/600x400.png", mediaType: "image", dataAiHint: "announcement graphic" },
      { id: "sp2", accountId: "fb1", accountName: "My Startup Page FB", platform: "Facebook", caption: "Check out our latest blog post on scaling your business. Link in bio!", scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000), status: "scheduled", dataAiHint: "blog graphic" },
      { id: "sp3", accountId: "ig1", accountName: "My Awesome Biz IG", platform: "Instagram", caption: "Throwback to our first product launch! #TBT", scheduledAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), status: "posted", mediaUrl: "https://placehold.co/600x400.png", mediaType: "image", dataAiHint: "product launch" },
      { id: "sp4", accountId: "ig1", accountName: "My Awesome Biz IG", platform: "Instagram", caption: "This is a draft post.", scheduledAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), status: "draft", dataAiHint: "content placeholder" },
    ];
    setScheduledPosts(initialPosts);
  }, []); // Empty dependency array ensures this runs once on mount


  const handlePostScheduled = (data: z.infer<typeof postSchema>) => {
    const account = demoAccounts.find(acc => acc.id === data.accountId);
    if (!account) return;

    const newPost: ScheduledPost = {
      id: String(Date.now()),
      accountId: data.accountId,
      accountName: account.name,
      platform: account.platform,
      caption: data.caption,
      // mediaUrl and mediaType would be set after actual upload to Firebase Storage
      mediaUrl: data.media ? "https://placehold.co/600x400.png" : undefined, // Placeholder
      mediaType: data.media ? (data.media[0]?.type.startsWith("image/") ? "image" : "video") : undefined, // Placeholder
      scheduledAt: data.scheduledAt || new Date(), // Post now if not scheduled
      status: data.scheduledAt ? "scheduled" : "posted", // simplistic
      dataAiHint: "social media post"
    };
    setScheduledPosts(prev => [newPost, ...prev].sort((a,b) => (a.scheduledAt.getTime() - b.scheduledAt.getTime())));
    setIsComposerOpen(false); // Close composer after scheduling
  };
  
  const handleDraftSaved = (data: z.infer<typeof postSchema>) => {
    const account = demoAccounts.find(acc => acc.id === data.accountId);
     const newDraft: ScheduledPost = {
      id: String(Date.now()),
      accountId: data.accountId || "unknown", // Handle case where account not selected for draft
      accountName: account?.name || "Unknown Account",
      platform: account?.platform || "Unknown",
      caption: data.caption,
      mediaUrl: data.media ? "https://placehold.co/600x400.png" : undefined,
      mediaType: data.media ? (data.media[0]?.type.startsWith("image/") ? "image" : "video") : undefined,
      scheduledAt: data.scheduledAt || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Default future date for draft
      status: "draft",
      dataAiHint: "draft content"
    };
    setScheduledPosts(prev => [newDraft, ...prev]);
    setIsComposerOpen(false);
  };

  const handleEditPost = (postId: string) => {
    const postToEdit = scheduledPosts.find(p => p.id === postId);
    if (postToEdit) {
      // In a real app, you'd populate the composer with postToEdit data
      toast({ title: "Edit Post", description: `Editing post: ${postToEdit.caption.substring(0,20)}... (Demo - composer not populated)`});
      setIsComposerOpen(true); // Open composer for editing
      // Logic to populate composer form with postToEdit data
    }
  };

  const handleDeletePost = (postId: string) => {
    setScheduledPosts(prev => prev.filter(p => p.id !== postId));
  };

  const upcomingPosts = scheduledPosts.filter(p => p.status === "scheduled" && p.scheduledAt >= new Date()).sort((a,b) => a.scheduledAt.getTime() - b.scheduledAt.getTime());
  const pastPosts = scheduledPosts.filter(p => p.status === "posted" || p.status === "failed" || (p.status === "scheduled" && p.scheduledAt < new Date())).sort((a,b) => b.scheduledAt.getTime() - a.scheduledAt.getTime());
  const draftPosts = scheduledPosts.filter(p => p.status === "draft").sort((a,b) => b.scheduledAt.getTime() - a.scheduledAt.getTime());


  return (
    <div className="space-y-8">
      {isComposerOpen && (
        <PostComposer 
            accounts={demoAccounts} 
            onPostScheduled={handlePostScheduled}
            onDraftSaved={handleDraftSaved}
        />
      )}
      
      {!isComposerOpen && (
        <div className="flex justify-end">
            <Button onClick={() => setIsComposerOpen(true)}>
                <PlusCircle className="mr-2 h-4 w-4" /> Create New Post
            </Button>
        </div>
      )}

      <Card className="shadow-xl">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl font-headline">Manage Your Posts</CardTitle>
              <CardDescription>View, edit, or delete your scheduled content, drafts, and post history.</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm"><ListFilter className="mr-2 h-4 w-4" /> Filter</Button>
              <Button variant="outline" size="sm"><CalendarDays className="mr-2 h-4 w-4" /> Calendar View</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="upcoming">
            <TabsList className="grid w-full grid-cols-3 sm:max-w-md mb-6">
              <TabsTrigger value="upcoming">Upcoming ({upcomingPosts.length})</TabsTrigger>
              <TabsTrigger value="drafts">Drafts ({draftPosts.length})</TabsTrigger>
              <TabsTrigger value="history">History ({pastPosts.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming">
              {upcomingPosts.length === 0 ? (
                <p className="py-10 text-center text-muted-foreground">No upcoming posts scheduled.</p>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {upcomingPosts.map(post => (
                    <ScheduledPostItem key={post.id} post={post} onEdit={handleEditPost} onDelete={handleDeletePost} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="drafts">
              {draftPosts.length === 0 ? (
                <p className="py-10 text-center text-muted-foreground">No drafts saved.</p>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {draftPosts.map(post => (
                    <ScheduledPostItem key={post.id} post={post} onEdit={handleEditPost} onDelete={handleDeletePost} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="history">
              {pastPosts.length === 0 ? (
                <p className="py-10 text-center text-muted-foreground">No post history yet.</p>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {pastPosts.map(post => (
                    <ScheduledPostItem key={post.id} post={post} onEdit={handleEditPost} onDelete={handleDeletePost} />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
