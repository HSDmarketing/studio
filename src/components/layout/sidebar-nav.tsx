
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  CalendarClock,
  Bot,
  BarChart3,
  Settings,
  LogOut,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  children?: NavItem[];
}

const navItems: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/accounts", label: "Accounts", icon: Users },
  { href: "/scheduling", label: "Scheduling", icon: CalendarClock },
  { href: "/automations", label: "Automations", icon: Bot },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
];

const settingsNavItems: NavItem[] = [
 { href: "/settings/profile", label: "Profile", icon: Settings },
 { href: "/settings/billing", label: "Billing", icon: Settings },
]

export function SidebarNav() {
  const pathname = usePathname();
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});

  const toggleSubmenu = (label: string) => {
    setOpenSubmenus(prev => ({ ...prev, [label]: !prev[label] }));
  };

  const renderNavItem = (item: NavItem, isSubItem = false) => {
    const isActive = pathname === item.href || (item.children && item.children.some(child => pathname.startsWith(child.href)));
    const Comp = isSubItem ? SidebarMenuSubButton : SidebarMenuButton;

    if (item.children) {
      return (
        <SidebarMenuItem key={item.label}>
          <Comp
            onClick={() => toggleSubmenu(item.label)}
            className={cn("justify-between", isActive && "bg-sidebar-accent text-sidebar-accent-foreground")}
            tooltip={item.label}
            aria-expanded={openSubmenus[item.label]}
          >
            <div className="flex items-center gap-2">
              <item.icon />
              <span>{item.label}</span>
            </div>
            <ChevronDown className={cn("h-4 w-4 transition-transform", openSubmenus[item.label] && "rotate-180")} />
          </Comp>
          {openSubmenus[item.label] && (
            <SidebarMenuSub>
              {item.children.map(child => (
                <SidebarMenuSubItem key={child.href}>
                   <Link href={child.href}>
                    <SidebarMenuSubButton isActive={pathname === child.href} asChild={!isSubItem}>
                        <child.icon className="mr-2 h-4 w-4" />
                        {child.label}
                    </SidebarMenuSubButton>
                  </Link>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          )}
        </SidebarMenuItem>
      );
    }

    return (
      <SidebarMenuItem key={item.label}>
        <Link href={item.href}>
          <Comp isActive={isActive} tooltip={item.label} asChild={!isSubItem}>
            <item.icon />
            <span>{item.label}</span>
          </Comp>
        </Link>
      </SidebarMenuItem>
    );
  };
  

  return (
    <>
      <SidebarMenu>
        {navItems.map(item => renderNavItem(item))}
      </SidebarMenu>

      <div className="mt-auto">
        <SidebarMenu>
           {renderNavItem({ href: "/settings", label: "Settings", icon: Settings, children: settingsNavItems })}
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="w-full justify-start" tooltip="User Profile">
                  <Avatar className="h-7 w-7 mr-2">
                    <AvatarImage src="https://placehold.co/100x100.png" alt="User Avatar" data-ai-hint="user avatar" />
                    <AvatarFallback>UR</AvatarFallback>
                  </Avatar>
                  <span className="truncate">User Name</span>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="right" align="start" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/settings/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive-foreground focus:bg-destructive"
                  onClick={() => console.log("Logout action")}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </div>
    </>
  );
}
