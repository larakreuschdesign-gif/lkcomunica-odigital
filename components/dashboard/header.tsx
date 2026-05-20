'use client';

import { Bell, Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  title?: string;
  subtitle?: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
}

export function DashboardHeader({ title, subtitle, action }: DashboardHeaderProps) {
  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="flex items-center justify-between p-6">
        <div className="flex-1">
          {title && <h1 className="text-3xl font-bold text-foreground">{title}</h1>}
          {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
        </div>

        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="hidden md:block relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar..."
              className="pl-10 w-64"
            />
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="icon">
            <Bell className="w-5 h-5 text-muted-foreground" />
          </Button>

          {/* User */}
          <Button variant="ghost" size="icon">
            <User className="w-5 h-5 text-muted-foreground" />
          </Button>

          {/* Action Button */}
          {action && (
            <Button
              onClick={action.onClick}
              className="ml-2"
            >
              {action.label}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
