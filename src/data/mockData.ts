import { Issue } from "@/components/NewIssueModal";
import { Task } from "@/components/Kanban/KanbanBoard";

// Realistic team members matching Linear style
export const teamMembers = [
  { id: "LB", name: "LB Lakshya Bagani", initials: "LB", avatar: "" },
  { id: "SC", name: "SC Sarah Chen", initials: "SC", avatar: "" },
  { id: "MJ", name: "MJ Mike Johnson", initials: "MJ", avatar: "" },
  { id: "ED", name: "ED Emily Davis", initials: "ED", avatar: "" },
  { id: "DL", name: "DL David Lee", initials: "DL", avatar: "" },
  { id: "AS", name: "AS Alex Smith", initials: "AS", avatar: "" },
  { id: "RM", name: "RM Rachel Martinez", initials: "RM", avatar: "" },
];

// Dummy data arrays removed - issues now come from JIRA API or user-created issues
// Kanban tasks and inbox notifications start empty and are user-created

// Inbox notifications
export interface InboxNotification {
  id: string;
  type: "mention" | "assign" | "comment" | "status_change" | "project_update";
  title: string;
  description: string;
  issueId?: string;
  issueNumber?: string;
  projectId?: string;
  author: string;
  timestamp: string;
  read: boolean;
}

// Dummy inbox notifications removed - inbox starts empty

// Projects
export interface Project {
  id: string;
  name: string;
  description: string;
  subtitle?: string;
  color: string;
  icon: string;
  issueCount: number;
  completedIssueCount: number;
  status: "active" | "archived" | "completed";
  health?: "On track" | "At risk" | "Off track";
  healthHours?: string;
  priority?: number;
  lead?: {
    name: string;
    avatar?: string;
  };
  targetDate?: string;
}

export const initialProjects: Project[] = [
  {
    id: "p1",
    name: "Create Linear Clone-Hackathon",
    description: "Basic UI Creation Nov 2",
    subtitle: "Basic UI Creation Nov 2",
    color: "#5E6AD2",
    icon: "🤖",
    issueCount: 24,
    completedIssueCount: 18,
    status: "active",
    health: "On track",
    healthHours: "20h",
    priority: 2,
    lead: {
      name: "Aadit Dhariwal",
    },
    targetDate: "2025-01-15",
  },
  {
    id: "p2",
    name: "Mobile App Redesign",
    description: "Complete redesign of mobile application with new UI/UX",
    color: "#0BC5EA",
    icon: "📱",
    issueCount: 42,
    completedIssueCount: 35,
    status: "active",
    health: "On track",
    healthHours: "15h",
    priority: 1,
    lead: {
      name: "Aadit Dhariwal",
    },
    targetDate: "2025-02-01",
  },
  {
    id: "p3",
    name: "API V2 Migration",
    description: "Migrate all endpoints to new API version with backward compatibility",
    color: "#F59E0B",
    icon: "🔧",
    issueCount: 31,
    completedIssueCount: 28,
    status: "active",
    health: "At risk",
    healthHours: "8h",
    priority: 3,
    lead: {
      name: "Aadit Dhariwal",
    },
    targetDate: "2025-01-20",
  },
  {
    id: "p4",
    name: "Performance Optimization",
    description: "Improve application performance and reduce load times",
    color: "#10B981",
    icon: "⚡",
    issueCount: 15,
    completedIssueCount: 12,
    status: "active",
    health: "On track",
    healthHours: "12h",
    priority: 2,
    lead: {
      name: "Aadit Dhariwal",
    },
    targetDate: "2025-01-25",
  },
];

// Initialize minimal data in localStorage (only UI essentials, not dummy issues)
// Issues come from JIRA API or user-created issues
export const initializeMockData = () => {
  // Only initialize team members and projects if they don't exist
  // These are for UI purposes only
  if (!localStorage.getItem("projects")) {
    localStorage.setItem("projects", JSON.stringify(initialProjects));
  }
  
  if (!localStorage.getItem("teamMembers")) {
    localStorage.setItem("teamMembers", JSON.stringify(teamMembers));
  }
  
  // Don't initialize issues, kanbanTasks, or inboxNotifications - use real data instead
};

