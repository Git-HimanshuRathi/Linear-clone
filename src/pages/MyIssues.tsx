import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Filter, SlidersHorizontal, CircleDot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const tabs = [
  { name: "My issues", href: "/my-issues" },
  { name: "Assigned", href: "/my-issues/assigned" },
  { name: "Created", href: "/my-issues/created" },
  { name: "Subscribed", href: "/my-issues/subscribed" },
  { name: "Activity", href: "/my-issues/activity" },
];

const MyIssues = () => {
  return (
    <div className="h-full flex flex-col bg-background">
      {/* Tabs and filters */}
      <div className="border-b border-border flex items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <nav className="flex items-center gap-1">
            {tabs.map((tab) => (
              <NavLink
                key={tab.name}
                to={tab.href}
                end
                className={({ isActive }) =>
                  cn(
                    "px-3 py-3 text-sm font-medium border-b-2 transition-colors",
                    isActive
                      ? "border-primary text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  )
                }
              >
                {tab.name}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 h-8 text-muted-foreground hover:text-foreground"
          >
            <Filter className="w-3.5 h-3.5" />
            <span className="text-xs">Filter</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 h-8 text-muted-foreground hover:text-foreground"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="text-xs">Display</span>
          </Button>
        </div>
      </div>

      {/* Empty state */}
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 max-w-md text-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-full border-2 border-muted-foreground/20 flex items-center justify-center">
              <CircleDot className="w-12 h-12 text-muted-foreground/40" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full border-2 border-muted-foreground/20 flex items-center justify-center bg-background">
              <div className="w-3 h-3 rounded-full bg-muted-foreground/20"></div>
            </div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 rounded-full border-2 border-muted-foreground/20 bg-background"></div>
            <div className="absolute top-1/2 -right-8 w-10 h-1 bg-muted-foreground/20 rounded-full"></div>
            <div className="absolute top-1/4 -left-10 w-8 h-1 bg-muted-foreground/20 rounded-full"></div>
          </div>

          <div className="space-y-2">
            <p className="text-muted-foreground text-sm">
              No issues assigned to you
            </p>
          </div>

          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Create new issue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MyIssues;
