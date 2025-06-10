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
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import type { Automation } from "./automation-item"; // Assuming type definition exists

const automationSchema = z.object({
  name: z.string().min(3, "Automation name must be at least 3 characters."),
  description: z.string().optional(),
  accountId: z.string().min(1, "Please select an account."),
  triggerType: z.enum(["comment_keyword", "new_follower_dm", "dm_keyword"]),
  triggerKeywords: z.string().optional(), // Comma-separated
  actionType: z.enum(["reply_comment", "send_dm", "like_post"]),
  responseText: z.string().optional(), // For replies or DMs
});

// Simplified SocialAccountChoice for demo
interface SocialAccountChoice {
  id: string;
  platform: string;
  name: string;
}

interface AutomationFormProps {
  accounts: SocialAccountChoice[];
  initialData?: Partial<Automation>; // For editing
  onSubmitForm: (data: Omit<Automation, 'id' | 'isActive' | 'lastTriggered' | 'triggerCount'>) => void;
  onCancel: () => void;
}

export function AutomationForm({ accounts, initialData, onSubmitForm, onCancel }: AutomationFormProps) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof automationSchema>>({
    resolver: zodResolver(automationSchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      accountId: initialData?.accountId || "",
      triggerType: initialData?.trigger?.type || "comment_keyword",
      triggerKeywords: initialData?.trigger?.keywords?.join(", ") || "",
      actionType: initialData?.action?.type || "reply_comment",
      responseText: initialData?.action?.responseText || "",
    },
  });

  const currentTriggerType = form.watch("triggerType");

  function onSubmit(values: z.infer<typeof automationSchema>) {
    const submissionData = {
        name: values.name,
        description: values.description,
        accountId: values.accountId,
        trigger: {
            type: values.triggerType,
            keywords: values.triggerKeywords ? values.triggerKeywords.split(',').map(k => k.trim()).filter(Boolean) : undefined,
        },
        action: {
            type: values.actionType,
            responseText: values.responseText,
        }
    };
    onSubmitForm(submissionData);
    toast({ title: initialData?.id ? "Automation Updated" : "Automation Created", description: `${values.name} has been saved.` });
  }

  return (
    <Card className="shadow-xl w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">
          {initialData?.id ? "Edit Automation" : "Create New Automation"}
        </CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Automation Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Welcome New Followers" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Briefly describe what this automation does." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="accountId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Account</FormLabel>
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
              name="triggerType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trigger (IF THIS HAPPENS...)</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a trigger type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="comment_keyword">Comment contains keywords</SelectItem>
                      <SelectItem value="new_follower_dm">New follower</SelectItem>
                      <SelectItem value="dm_keyword">Direct Message contains keywords</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {(currentTriggerType === "comment_keyword" || currentTriggerType === "dm_keyword") && (
              <FormField
                control={form.control}
                name="triggerKeywords"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trigger Keywords</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., price, help, interested" {...field} />
                    </FormControl>
                    <FormDescription>Comma-separated keywords.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="actionType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Action (...THEN DO THAT)</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an action type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="reply_comment">Reply to comment</SelectItem>
                      <SelectItem value="send_dm">Send a Direct Message</SelectItem>
                      <SelectItem value="like_post">Like the post/comment</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {(form.getValues("actionType") === "reply_comment" || form.getValues("actionType") === "send_dm") && (
              <FormField
                control={form.control}
                name="responseText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Response Message</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter your reply or DM text. Use {{username}} for personalization." {...field} />
                    </FormControl>
                    <FormDescription>
                      You can use placeholders like {'{{username}}'} for the user's name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </CardContent>
          <CardFooter className="flex justify-end gap-2 pt-6 border-t">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              {initialData?.id ? "Save Changes" : "Create Automation"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
