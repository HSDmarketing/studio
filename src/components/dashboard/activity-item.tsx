import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { LucideIcon } from "lucide-react";

interface ActivityItemProps {
  actorName?: string;
  actorImage?: string;
  action: string;
  target?: string;
  time: string;
  icon?: LucideIcon;
}

export function ActivityItem({ actorName, actorImage, action, target, time, icon: Icon }: ActivityItemProps) {
  return (
    <div className="flex items-center gap-4 p-3 hover:bg-muted/50 rounded-lg transition-colors">
      {Icon && <Icon className="h-5 w-5 text-muted-foreground" />}
      {!Icon && actorImage && (
        <Avatar className="h-9 w-9">
          <AvatarImage src={actorImage} alt={actorName} data-ai-hint="user avatar" />
          <AvatarFallback>{actorName ? actorName.substring(0, 2).toUpperCase() : '??'}</AvatarFallback>
        </Avatar>
      )}
      <div className="grid gap-1 text-sm">
        <p className="font-medium text-foreground">
          {actorName && <span className="font-semibold">{actorName}</span>} {action} {target && <span className="font-semibold text-primary">{target}</span>}
        </p>
        <p className="text-xs text-muted-foreground">{time}</p>
      </div>
    </div>
  );
}
