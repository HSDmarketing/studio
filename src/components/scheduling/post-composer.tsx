"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import { CalendarIcon, ImagePlus, Video, Save, Send, Trash2, Clock } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { cn } from "@/lib/utils";

// Assuming SocialAccount is defined elsewhere, e.g. in AccountCard
// For demo, using a simplified version
interface SocialAccountChoice {
  id: string;
  platform: string;
  name: string;
}

const postSchema = z.object({
  accountId: z.string().min(1, "Please select an account."),
  caption: z.string().min(1, "Caption cannot be empty.").max(2200, "Caption too long."),
  media: z.any().optional(), // Using 'any' for FileList, refine if needed
  scheduledAt: z.date().optional(),
});

interface PostComposerProps {
  accounts: SocialAccountChoice[];
  onPostScheduled: (data: z.infer<typeof postSchema>) => void;
  onDraftSaved?: (data: z.infer<typeof postSchema>) => void; // Optional draft saving
}

export function PostComposer({ accounts, onPostScheduled, onDraftSaved }: PostComposerProps) {
  const { toast } = useToast();
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<"image" | "video" | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      accountId: "",
      caption: "",
    },
  });

  const handleMediaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setMediaPreview(URL.createObjectURL(file));
      setMediaType(file.type.startsWith("image/") ? "image" : "video");
      // Simulate upload
      setUploadProgress(0);
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        if (progress <= 100) {
          setUploadProgress(progress);
        } else {
          clearInterval(interval);
          setUploadProgress(100);
           toast({ title: "Media Uploaded", description: "File ready for posting." });
        }
      }, 200);
      form.setValue("media", event.target.files);
    } else {
      setMediaPreview(null);
      setMediaType(null);
      setUploadProgress(null);
      form.setValue("media", undefined);
    }
  };

  const removeMedia = () => {
    setMediaPreview(null);
    setMediaType(null);
    setUploadProgress(null);
    form.setValue("media", undefined);
    if(fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  };

  const onSubmit = (data: z.infer<typeof postSchema>) => {
    console.log("Scheduling post:", data);
    onPostScheduled(data);
    toast({ title: "Post Scheduled!", description: `Your post for ${accounts.find(a=>a.id === data.accountId)?.name} is scheduled.` });
    form.reset();
    removeMedia();
  };
  
  const handleSaveDraft = () => {
    const data = form.getValues();
    if (!data.caption && !data.media) {
      toast({ title: "Cannot save empty draft", variant: "destructive" });
      return;
    }
    if (onDraftSaved) {
      onDraftSaved(data);
      toast({ title: "Draft Saved!", description: "Your post has been saved as a draft." });
    } else {
      toast({ title: "Draft saving not implemented." });
    }
  };


  return (
    <Card className="shadow-xl">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Create New Post</CardTitle>
        <CardDescription>Craft your message, add media, and schedule it for the perfect time.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="accountId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Post to Account</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an account" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {accounts.map(account => (
                        <SelectItem key={account.id} value={account.id}>
                          {account.name} ({account.platform})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="caption"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Caption</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What's on your mind?"
                      className="min-h-[120px] resize-y"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel>Media (Image/Video)</FormLabel>
              <FormControl>
                 <Input 
                    type="file" 
                    accept="image/*,video/*" 
                    onChange={handleMediaChange} 
                    className="hidden"
                    id="media-upload"
                    ref={fileInputRef}
                />
              </FormControl>
              <Button type="button" variant="outline" onClick={() => document.getElementById('media-upload')?.click()}>
                <ImagePlus className="mr-2 h-4 w-4" /> Upload Media
              </Button>
              {uploadProgress !== null && (
                <div className="mt-2 space-y-1">
                   <Progress value={uploadProgress} className="w-full h-2" />
                   <p className="text-xs text-muted-foreground">{uploadProgress === 100 ? "Upload complete" : `Uploading... ${uploadProgress}%`}</p>
                </div>
              )}
              {mediaPreview && (
                <div className="mt-4 relative group w-full max-w-sm aspect-square">
                  {mediaType === "image" ? (
                    <Image src={mediaPreview} alt="Media preview" layout="fill" objectFit="cover" className="rounded-md" data-ai-hint="media content social" />
                  ) : (
                    <video src={mediaPreview} controls className="rounded-md w-full h-full object-cover" data-ai-hint="media content social" />
                  )}
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={removeMedia}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
              <FormMessage />
            </FormItem>

            <FormField
              control={form.control}
              name="scheduledAt"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Schedule Date & Time (Optional)</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP HH:mm")
                          ) : (
                            <span>Pick a date and time</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                            const currentHour = field.value?.getHours() ?? new Date().getHours();
                            const currentMinute = field.value?.getMinutes() ?? new Date().getMinutes();
                            if (date) {
                                date.setHours(currentHour);
                                date.setMinutes(currentMinute);
                            }
                            field.onChange(date);
                        }}
                        disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))} // Disable past dates
                        initialFocus
                      />
                      <div className="p-3 border-t border-border">
                        <FormLabel className="text-sm">Time</FormLabel>
                        <Input 
                            type="time"
                            className="mt-1"
                            defaultValue={field.value ? format(field.value, "HH:mm") : format(new Date(), "HH:mm")}
                            onChange={(e) => {
                                const [hours, minutes] = e.target.value.split(':').map(Number);
                                const newDate = field.value ? new Date(field.value) : new Date();
                                newDate.setHours(hours, minutes);
                                field.onChange(newDate);
                            }}
                         />
                      </div>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-between gap-2 pt-6 border-t">
            <Button type="button" variant="outline" onClick={handleSaveDraft} disabled={!onDraftSaved}>
              <Save className="mr-2 h-4 w-4" /> Save Draft
            </Button>
            <Button type="submit" className="w-full sm:w-auto">
              <Send className="mr-2 h-4 w-4" /> {form.getValues("scheduledAt") ? "Schedule Post" : "Post Now"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
