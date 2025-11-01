import { Search, Plus, Bell, Columns } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/Avatar";

interface TopBarProps {
  onCommandClick: () => void;
}

export const TopBar = ({ onCommandClick }: TopBarProps) => {
  return (
    <header className="h-12 border-b border-border bg-background flex items-center justify-between px-4">
      {/* Search trigger */}
      <button
        onClick={onCommandClick}
        className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-border bg-surface hover:bg-surface-hover text-sm text-muted-foreground transition-colors min-w-[280px]"
      >
        <Search className="w-3.5 h-3.5" />
        <span className="text-xs">Search or type a command...</span>
        <kbd className="ml-auto hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5 h-8 text-muted-foreground hover:text-foreground"
        >
          <Columns className="w-3.5 h-3.5" />
        </Button>

        <Button
          variant="default"
          size="sm"
          className="gap-1.5 h-8 bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline text-xs">New Issue</span>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 text-muted-foreground hover:text-foreground"
        >
          <Bell className="w-3.5 h-3.5" />
        </Button>

        <Avatar name="John Doe" size="xs" />
      </div>
    </header>
  );
};
