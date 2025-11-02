import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Inbox, CheckSquare, PenSquare, FolderKanban, LayoutGrid, Users, UserSquare, GripVertical, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarItem {
  id: string;
  name: string;
  icon: React.ElementType;
  visibility: "always" | "badged" | "more" | "never";
  allowedOptions?: ("always" | "badged" | "more" | "never")[];
}

interface CustomizeSidebarModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CustomizeSidebarModal = ({ open, onOpenChange }: CustomizeSidebarModalProps) => {
  const [badgeStyle, setBadgeStyle] = useState<"count" | "dot">("count");

  const personalItems: SidebarItem[] = [
    { id: "inbox", name: "Inbox", icon: Inbox, visibility: "always", allowedOptions: ["always", "badged"] },
    { id: "my-issues", name: "My issues", icon: CheckSquare, visibility: "always", allowedOptions: ["always", "never"] },
    { id: "drafts", name: "Drafts", icon: PenSquare, visibility: "badged" },
  ];

  const workspaceItems: SidebarItem[] = [
    { id: "projects", name: "Projects", icon: FolderKanban, visibility: "always" },
    { id: "views", name: "Views", icon: LayoutGrid, visibility: "always" },
    { id: "members", name: "Members", icon: Users, visibility: "more" },
    { id: "teams", name: "Teams", icon: UserSquare, visibility: "more" },
  ];

  const getVisibilityLabel = (option: string) => {
    switch (option) {
      case "always":
        return "Always show";
      case "badged":
        return "When badged";
      case "more":
        return "Hide in more menu";
      case "never":
        return "Never show";
      default:
        return "Always show";
    }
  };

  const renderItem = (item: SidebarItem) => {
    const Icon = item.icon;
    const defaultOptions: ("always" | "badged" | "more" | "never")[] = ["always", "badged", "more"];
    const options = item.allowedOptions || defaultOptions;
    
    return (
      <div key={item.id} className="flex items-center gap-3 py-2">
        <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab" />
        <Icon className="w-4 h-4 text-foreground" />
        <span className="flex-1 text-sm text-foreground">{item.name}</span>
        <Select defaultValue={item.visibility}>
          <SelectTrigger className="w-[140px] h-8 text-xs bg-surface border-border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option} value={option} className={option === "more" ? "!pl-2" : ""}>
                {getVisibilityLabel(option)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-surface border-border max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-foreground">
            Customize sidebar
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Default badge style */}
          <div className="flex items-center justify-between">
            <label className="text-sm text-foreground">Default badge style</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center justify-between gap-2 w-[120px] h-8 px-3 rounded-md border border-border bg-surface text-xs hover:bg-surface-hover transition-colors">
                  <div className="flex items-center gap-1.5">
                    {badgeStyle === "count" ? (
                      <>
                        <span className="px-1.5 py-0.5 rounded bg-surface-hover text-foreground">1</span>
                        <span className="text-foreground">Count</span>
                      </>
                    ) : (
                      <>
                        <span className="w-2 h-2 rounded-full bg-foreground"></span>
                        <span className="text-foreground">Dot</span>
                      </>
                    )}
                  </div>
                  <ChevronDown className="w-3 h-3 text-muted-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[120px]">
                <DropdownMenuItem onClick={() => setBadgeStyle("count")}>
                  <div className="flex items-center gap-1.5 w-full">
                    <span className="px-1.5 py-0.5 rounded bg-surface-hover text-xs text-foreground">1</span>
                    <span>Count</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setBadgeStyle("dot")}>
                  <div className="flex items-center gap-1.5 w-full">
                    <span className="w-2 h-2 rounded-full bg-foreground"></span>
                    <span>Dot</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Personal section */}
          <div className="space-y-3">
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Personal
            </h3>
            <div className="space-y-1">
              {personalItems.map(renderItem)}
            </div>
          </div>

          {/* Workspace section */}
          <div className="space-y-3">
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Workspace
            </h3>
            <div className="space-y-1">
              {workspaceItems.map(renderItem)}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CustomizeSidebarModal;

