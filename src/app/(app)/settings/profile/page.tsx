"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Loader2, UploadCloud } from "lucide-react";

const profileSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  companyName: z.string().optional(),
  profilePicture: z.any().optional(),
});

export default function ProfileSettingsPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>("https://placehold.co/100x100.png"); // Initial placeholder

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: "Demo User",
      email: "user@example.com",
      companyName: "RepliGo Inc.",
    },
  });

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
      form.setValue("profilePicture", event.target.files);
    }
  };

  async function onSubmit(values: z.infer<typeof profileSchema>) {
    setIsLoading(true);
    console.log("Updating profile:", values);
    // Placeholder for update logic
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    toast({ title: "Profile Updated", description: "Your profile information has been saved." });
  }

  return (
    <Card className="shadow-xl max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Profile Settings</CardTitle>
        <CardDescription>Manage your personal information and account details.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-8">
            <FormField
              control={form.control}
              name="profilePicture"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile Picture</FormLabel>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={avatarPreview || undefined} alt="Profile Picture" data-ai-hint="user avatar"/>
                      <AvatarFallback>{form.getValues("fullName")?.substring(0,2).toUpperCase() || "DU"}</AvatarFallback>
                    </Avatar>
                    <Button type="button" variant="outline" onClick={() => document.getElementById('avatar-upload')?.click()}>
                      <UploadCloud className="mr-2 h-4 w-4" /> Change Picture
                    </Button>
                    <FormControl>
                      <Input 
                        id="avatar-upload"
                        type="file" 
                        accept="image/*" 
                        className="hidden"
                        onChange={(e) => {
                            field.onChange(e.target.files);
                            handleAvatarChange(e);
                        }}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormDescription>This is the email you use to log in.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Your company name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <div>
                <FormLabel>Password</FormLabel>
                <Button type="button" variant="outline" className="mt-2 w-full sm:w-auto" onClick={() => toast({title: "Change Password", description:"Password change functionality would be here."})}>
                  Change Password
                </Button>
                <FormDescription className="mt-1">Update your account password.</FormDescription>
            </div>

          </CardContent>
          <CardFooter className="border-t pt-6">
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
