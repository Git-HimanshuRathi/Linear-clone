import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Filter, SlidersHorizontal, CircleDot, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NewIssueModal, Issue } from "@/components/NewIssueModal";

const tabs = [
  { name: "My issues", href: "/my-issues" },
  { name: "Assigned", href: "/my-issues/assigned" },
  { name: "Created", href: "/my-issues/created" },
  { name: "Subscribed", href: "/my-issues/subscribed" },
  { name: "Activity", href: "/my-issues/activity" },
];

const MyIssues = () => {
  const [isNewIssueModalOpen, setIsNewIssueModalOpen] = useState(false);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    Backlog: true,
    Todo: true,
    "In Progress": true,
    Done: true,
    Cancelled: true,
    Duplicate: true,
  });

  useEffect(() => {
    loadIssues();
  }, []);

  const loadIssues = () => {
    const storedIssues = JSON.parse(localStorage.getItem("issues") || "[]");
    setIssues(storedIssues);
  };

  const toggleSection = (status: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [status]: !prev[status],
    }));
  };

  const getIssuesByStatus = (status: string) => {
    return issues.filter((issue) => issue.status === status);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${months[date.getMonth()]} ${date.getDate()}`;
  };

  const statusOrder = ["Backlog", "Todo", "In Progress", "Done", "Cancelled", "Duplicate"];
  const hasIssues = issues.length > 0;

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Tabs */}
      <div className="border-b border-border px-4">
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

      {/* Filter and Display buttons */}
      <div className="border-b border-border flex items-center justify-between px-4 py-2">
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

      {/* Content */}
      {hasIssues ? (
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {statusOrder.map((status) => {
            const statusIssues = getIssuesByStatus(status);
            if (statusIssues.length === 0) return null;

            const isExpanded = expandedSections[status];

            return (
              <div key={status} className="mb-4">
                <button
                  onClick={() => toggleSection(status)}
                  className="flex items-center gap-2 w-full py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronUp className="w-4 h-4" />
                  )}
                  <span className="font-medium">{status}</span>
                  <span className="text-xs">{statusIssues.length}</span>
                </button>

                {isExpanded && (
                  <div className="ml-6 space-y-1">
                    {statusIssues.map((issue) => (
                      <div
                        key={issue.id}
                        className="flex items-center gap-3 px-2 py-1.5 rounded-md hover:bg-surface transition-colors"
                      >
                        <div className="w-4 h-4 rounded border border-border border-dashed"></div>
                        <div className="flex-1 flex items-center gap-2">
                          <span className="text-sm text-foreground">{issue.issueNumber}</span>
                          <span className="text-sm text-muted-foreground">{issue.title}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded bg-primary flex items-center justify-center text-[10px] font-medium text-primary-foreground">
                            LB
                          </div>
                          <span className="text-xs text-muted-foreground">{formatDate(issue.createdAt)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
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

            <Button 
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={() => setIsNewIssueModalOpen(true)}
            >
              Create new issue
            </Button>
          </div>
        </div>
      )}

      <NewIssueModal 
        open={isNewIssueModalOpen} 
        onOpenChange={setIsNewIssueModalOpen}
        onIssueCreated={loadIssues}
      />
    </div>
  );
};

export default MyIssues;
