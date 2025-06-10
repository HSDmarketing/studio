"use client";

import Image from "next/image";
import { format, formatDistanceToNow } from "date-fns";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarClock, Edit3, Trash2, Image as ImageIcon, Video as VideoIcon, AlertTriangle } from "lucide-react";
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

export interface ScheduledPost {
  id: string;
  accountId: string;
  accountName: string;
  platform: string; // "Instagram", "Facebook", etc.
  caption: string;
  mediaUrl?: string; // URL of uploaded image/video
  mediaType?: "image" | "video";
  scheduledAt: Date;
  status: "scheduled" | "posted" | "failed" | "draft";
  dataAiHint?: string; // For platform icon
}

interface ScheduledPostItemProps {
  post: ScheduledPost;
  onEdit: (postId: string) => void;
  onDelete: (postId: string) => void;
}

export function ScheduledPostItem({ post, onEdit, onDelete }: ScheduledPostItemProps) {
  const { toast } = useToast();

  const handleDelete = () => {
    onDelete(post.id);
    toast({
      title: "Post Deleted",
      description: `The post scheduled for ${format(post.scheduledAt, "PPp")} has been deleted.`,
    });
  };

  const getStatusBadge = () => {
    switch (post.status) {
      case "scheduled":
        return <Badge variant="default" className="bg-blue-500 hover:bg-blue-600">Scheduled</Badge>;
      case "posted":
        return <Badge variant="default" className="bg-green-500 hover:bg-green-600">Posted</Badge>;
      case "failed":
        return <Badge variant="destructive"><AlertTriangle className="mr-1 h-3 w-3" />Failed</Badge>;
      case "draft":
        return <Badge variant="secondary">Draft</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };
  
  const platformIcon = () => {
    // Simplified, ideally map platform string to icon component
    if (post.platform.toLowerCase().includes("instagram")) return <ImageIcon className="h-4 w-4 text-pink-500" />;
    if (post.platform.toLowerCase().includes("facebook")) return <ImageIcon className="h-4 w-4 text-blue-600" />;
    return <ImageIcon className="h-4 w-4 text-muted-foreground" />;
  }

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {post.mediaUrl && post.mediaType === "image" && (
        <div className="aspect-video w-full relative bg-muted">
          <Image src={post.mediaUrl} alt="Post media" layout="fill" objectFit="cover" data-ai-hint="social media content"/>
        </div>
      )}
      {post.mediaUrl && post.mediaType === "video" && (
         <div className="aspect-video w-full relative bg-black flex items-center justify-center">
            <VideoIcon className="h-16 w-16 text-muted-foreground" />
            <p className="absolute bottom-2 left-2 text-xs text-white bg-black/50 px-1 py-0.5 rounded">Video Preview</p>
         </div>
      )}
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle className="text-base font-semibold leading-tight flex items-center gap-2">
                    {platformIcon()} {post.accountName}
                </CardTitle>
                <CardDescription className="text-xs mt-1">
                    {post.status === "draft" ? "Saved as draft" : `Scheduled for: ${format(post.scheduledAt, "MMM d, yyyy 'at' h:mm a")}`}
                </CardDescription>
            </div>
            {getStatusBadge()}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3" title={post.caption}>
          {post.caption}
        </p>
        {post.status === "failed" && <p className="text-xs text-destructive mt-2">Post failed. Check logs for details.</p>}
      </CardContent>
      <CardFooter className="flex justify-end gap-2 border-t pt-4">
        <Button variant="outline" size="sm" onClick={() => onEdit(post.id)}>
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
                This action cannot be undone. This will permanently delete the scheduled post.
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
