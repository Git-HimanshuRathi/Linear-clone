import { Issue } from "@/components/NewIssueModal";
import { Project } from "@/data/mockData";

// JIRA API Response Types
interface JiraUser {
  displayName: string;
  emailAddress?: string;
  avatarUrls?: {
    "16x16": string;
    "24x24": string;
    "32x32": string;
    "48x48": string;
  };
}

interface JiraIssueFields {
  summary: string;
  description?: string;
  status: {
    name: string;
    statusCategory: {
      key: string;
      name: string;
    };
  };
  priority?: {
    name: string;
    id: string;
  };
  assignee?: JiraUser;
  creator: JiraUser;
  reporter: JiraUser;
  labels: string[];
  created: string;
  updated: string;
  project: {
    key: string;
    name: string;
  };
  issuelinks?: Array<{
    type: {
      name: string;
    };
    outwardIssue?: {
      key: string;
      fields: {
        summary: string;
      };
    };
    inwardIssue?: {
      key: string;
      fields: {
        summary: string;
      };
    };
  }>;
  subtasks?: Array<{
    key: string;
    fields: {
      summary: string;
    };
  }>;
}

interface JiraIssue {
  id: string;
  key: string;
  fields: JiraIssueFields;
  self: string;
}

interface JiraSearchResponse {
  expand: string;
  startAt: number;
  maxResults: number;
  total: number;
  issues: JiraIssue[];
}

// JIRA Project Types
interface JiraProject {
  id: string;
  key: string;
  name: string;
  description?: string;
  avatarUrls?: {
    "16x16": string;
    "24x24": string;
    "32x32": string;
    "48x48": string;
  };
  projectTypeKey?: string;
  simplified?: boolean;
  style?: string;
  lead?: JiraUser;
}

// Map JIRA status to app status
const mapJiraStatus = (jiraStatus: string): string => {
  const statusMap: Record<string, string> = {
    "To Do": "Todo",
    "In Progress": "In Progress",
    "Done": "Done",
    "Closed": "Done",
    "Resolved": "Done",
    "Backlog": "Backlog",
    "In Review": "In Progress",
    "Blocked": "Backlog",
  };
  return statusMap[jiraStatus] || jiraStatus;
};

// Map JIRA priority to app priority
const mapJiraPriority = (jiraPriority?: { name: string }): string => {
  if (!jiraPriority) return "Medium";
  const priorityMap: Record<string, string> = {
    "Highest": "Urgent",
    "High": "High",
    "Medium": "Medium",
    "Low": "Low",
    "Lowest": "Low",
    "Critical": "Urgent",
    "Blocker": "Urgent",
    "Major": "High",
    "Minor": "Low",
    "Trivial": "Low",
  };
  return priorityMap[jiraPriority.name] || "Medium";
};

// Extract user display name from JIRA user object
const getUserDisplayName = (user: JiraUser | null | undefined): string => {
  if (!user) return "Unassigned";
  const name = user.displayName || "Unknown User";
  // Create initials from name (first two words' first letters)
  const parts = name.split(" ").slice(0, 2);
  const initials = parts.map(p => p[0]?.toUpperCase() || "").join("");
  return `${initials} ${name}`;
};

// Convert HTML description to plain text (simple version)
const htmlToPlainText = (html?: string): string => {
  if (!html) return "";
  // Remove HTML tags and decode entities (basic implementation)
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
};

/**
 * Get alternative CORS proxy URLs to try as fallbacks
 */
const getProxyUrls = (): string[] => {
  const customProxy = localStorage.getItem("jiraProxyUrl");
  
  if (customProxy) {
    return [customProxy];
  }
  
  // List of free CORS proxies to try in order
  // Note: Many free proxies have rate limits or may be unreliable
  return [
    "https://api.allorigins.win/raw?url=",
    "https://api.codetabs.com/v1/proxy?quest=",
    // Note: corsproxy.io and cors-anywhere often have restrictions
  ];
};

/**
 * Get the API URL, using a CORS proxy if needed
 * Apache JIRA doesn't allow direct browser requests due to CORS restrictions
 */
const getApiUrl = (endpoint: string, proxyIndex: number = 0): string => {
  const proxies = getProxyUrls();
  const proxy = proxies[proxyIndex % proxies.length];
  
  if (proxy.endsWith("=") || proxy.endsWith("?")) {
    return `${proxy}${encodeURIComponent(endpoint)}`;
  }
  return `${proxy}${encodeURIComponent(endpoint)}`;
};

/**
 * Fetch with retry logic and proxy fallback
 */
const fetchWithRetry = async (
  endpoint: string,
  options: RequestInit = {},
  maxRetries: number = 3,
  timeoutMs: number = 15000
): Promise<Response> => {
  const proxies = getProxyUrls();
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    for (let proxyIndex = 0; proxyIndex < proxies.length; proxyIndex++) {
      try {
        const url = getApiUrl(endpoint, proxyIndex);
        
        // Create abort controller for timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
        
        try {
          const response = await fetch(url, {
            ...options,
            signal: controller.signal,
          });
          
          clearTimeout(timeoutId);
          
          if (response.ok) {
            return response;
          }
          
          // If 408 (timeout), 403 (forbidden), 429 (rate limit), or 500 (server error), try next proxy
          if (response.status === 408 || response.status === 403 || response.status === 429 || response.status === 500) {
            // Skip this proxy for this attempt
            continue;
          }
          
          // For other errors, throw but allow retry
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        } catch (error: any) {
          clearTimeout(timeoutId);
          
          if (error.name === 'AbortError') {
            // Timeout - try next proxy
            continue;
          }
          
          // Network errors or CORS errors - try next proxy
          if (error.message?.includes('CORS') || error.message?.includes('Failed to fetch') || error.message?.includes('NetworkError')) {
            continue;
          }
          
          throw error;
        }
      } catch (error: any) {
        lastError = error;
        // Wait before retrying (exponential backoff)
        if (attempt < maxRetries - 1) {
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
        }
      }
    }
  }
  
  throw lastError || new Error('Failed to fetch after all retries');
};

/**
 * Fetch issues from Apache JIRA
 * @param projectKey - The JIRA project key (e.g., "FLINK", "KAFKA", "SPARK")
 * @param maxResults - Maximum number of issues to fetch (default: 50)
 * @param jql - Custom JQL query (optional)
 */
export const fetchJiraIssues = async (
  projectKey: string = "FLINK",
  maxResults: number = 50,
  jql?: string
): Promise<Issue[]> => {
  try {
    // Build JQL query
    const query = jql || `project=${projectKey} ORDER BY created DESC`;
    const jiraEndpoint = `https://issues.apache.org/jira/rest/api/2/search?jql=${encodeURIComponent(query)}&maxResults=${maxResults}&fields=id,key,summary,description,status,priority,assignee,creator,reporter,labels,created,updated,project,issuelinks,subtasks`;
    
    const response = await fetchWithRetry(
      jiraEndpoint,
      {
        method: "GET",
        headers: {
          "Accept": "application/json",
        },
      },
      2, // max retries
      15000 // 15 second timeout
    );

    const data: JiraSearchResponse = await response.json();

    // Map JIRA issues to app Issue format
    return data.issues.map((jiraIssue): Issue => {
      const fields = jiraIssue.fields;
      
      return {
        id: jiraIssue.id,
        title: fields.summary || "No title",
        description: htmlToPlainText(fields.description) || "",
        status: mapJiraStatus(fields.status.name),
        priority: mapJiraPriority(fields.priority),
        assignee: getUserDisplayName(fields.assignee),
        createdBy: getUserDisplayName(fields.creator || fields.reporter),
        labels: fields.labels || [],
        links: (fields.issuelinks || []).map((link, index) => ({
          id: `link-${jiraIssue.id}-${index}`,
          url: link.outwardIssue 
            ? `https://issues.apache.org/jira/browse/${link.outwardIssue.key}`
            : link.inwardIssue
            ? `https://issues.apache.org/jira/browse/${link.inwardIssue.key}`
            : "",
          title: link.outwardIssue?.fields.summary || link.inwardIssue?.fields.summary || "Related issue",
        })),
        subIssues: (fields.subtasks || []).map((subtask, index) => ({
          id: `subtask-${jiraIssue.id}-${index}`,
          title: subtask.fields.summary,
          status: "Todo",
        })),
        createdAt: fields.created,
        issueNumber: jiraIssue.key,
      };
    });
  } catch (error) {
    console.error("Error fetching JIRA issues:", error);
    throw error;
  }
};

/**
 * Fetch a single issue by key from Apache JIRA
 */
export const fetchJiraIssue = async (issueKey: string): Promise<Issue> => {
  try {
    const jiraEndpoint = `https://issues.apache.org/jira/rest/api/2/issue/${issueKey}?fields=id,key,summary,description,status,priority,assignee,creator,reporter,labels,created,updated,project,issuelinks,subtasks`;
    
    const response = await fetchWithRetry(
      jiraEndpoint,
      {
        method: "GET",
        headers: {
          "Accept": "application/json",
        },
      },
      2, // max retries
      15000 // 15 second timeout
    );

    const jiraIssue: JiraIssue = await response.json();
    const fields = jiraIssue.fields;

    return {
      id: jiraIssue.id,
      title: fields.summary || "No title",
      description: htmlToPlainText(fields.description) || "",
      status: mapJiraStatus(fields.status.name),
      priority: mapJiraPriority(fields.priority),
      assignee: getUserDisplayName(fields.assignee),
      createdBy: getUserDisplayName(fields.creator || fields.reporter),
      labels: fields.labels || [],
      links: (fields.issuelinks || []).map((link, index) => ({
        id: `link-${jiraIssue.id}-${index}`,
        url: link.outwardIssue 
          ? `https://issues.apache.org/jira/browse/${link.outwardIssue.key}`
          : link.inwardIssue
          ? `https://issues.apache.org/jira/browse/${link.inwardIssue.key}`
          : "",
        title: link.outwardIssue?.fields.summary || link.inwardIssue?.fields.summary || "Related issue",
      })),
      subIssues: (fields.subtasks || []).map((subtask, index) => ({
        id: `subtask-${jiraIssue.id}-${index}`,
        title: subtask.fields.summary,
        status: "Todo",
      })),
      createdAt: fields.created,
      issueNumber: jiraIssue.key,
    };
  } catch (error) {
    console.error("Error fetching JIRA issue:", error);
    throw error;
  }
};

/**
 * Search issues using JQL
 */
export const searchJiraIssues = async (jql: string, maxResults: number = 50): Promise<Issue[]> => {
  return fetchJiraIssues("", maxResults, jql);
};

/**
 * Helper to fetch project stats with timeout and error handling
 */
const fetchProjectStats = async (projectKey: string): Promise<{ issueCount: number; completedIssueCount: number }> => {
  try {
    const statsQuery = `project=${projectKey}`;
    const statsEndpoint = `https://issues.apache.org/jira/rest/api/2/search?jql=${encodeURIComponent(statsQuery)}&maxResults=0`;
    
    const statsResponse = await fetchWithRetry(
      statsEndpoint,
      {
        method: "GET",
        headers: {
          "Accept": "application/json",
        },
      },
      2, // fewer retries for stats
      10000 // 10 second timeout
    );

    const statsData: JiraSearchResponse = await statsResponse.json();
    const issueCount = statsData.total || 0;
    
    // Get resolved issues count in parallel but with shorter timeout
    const resolvedQuery = `project=${projectKey} AND status IN (Resolved, Closed, Done)`;
    const resolvedEndpoint = `https://issues.apache.org/jira/rest/api/2/search?jql=${encodeURIComponent(resolvedQuery)}&maxResults=0`;
    
    try {
      const resolvedResponse = await fetchWithRetry(
        resolvedEndpoint,
        {
          method: "GET",
          headers: {
            "Accept": "application/json",
          },
        },
        1, // single retry for resolved count
        8000 // 8 second timeout
      );

      const resolvedData: JiraSearchResponse = await resolvedResponse.json();
      return {
        issueCount,
        completedIssueCount: resolvedData.total || 0,
      };
    } catch {
      // If resolved count fetch fails, just return total count
      return {
        issueCount,
        completedIssueCount: 0,
      };
    }
  } catch (error) {
    // Return default stats on any error
    return { issueCount: 0, completedIssueCount: 0 };
  }
};

/**
 * Process projects in batches to avoid overwhelming the proxy
 */
const processBatch = async <T, R>(
  items: T[],
  batchSize: number,
  processor: (item: T) => Promise<R>,
  delayMs: number = 100
): Promise<R[]> => {
  const results: R[] = [];
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch.map(processor));
    results.push(...batchResults);
    
    // Add delay between batches to avoid overwhelming the proxy
    if (i + batchSize < items.length) {
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }
  return results;
};

/**
 * Fetch all projects from Apache JIRA
 * Optimized to handle large numbers of projects without timing out
 */
export const fetchJiraProjects = async (): Promise<Project[]> => {
  try {
    const jiraEndpoint = `https://issues.apache.org/jira/rest/api/2/project`;

    const response = await fetchWithRetry(
      jiraEndpoint,
      {
        method: "GET",
        headers: {
          "Accept": "application/json",
        },
      },
      3, // max retries
      20000 // 20 second timeout for initial fetch
    );

    const projects: JiraProject[] = await response.json();

    // Limit to first 50 projects to avoid timeout issues
    // Stats fetching for all projects would take too long
    const limitedProjects = projects.slice(0, 50);

    // Check if stats fetching is disabled (due to proxy reliability issues)
    const fetchStats = localStorage.getItem("jiraFetchStats") !== "false"; // Default to true
    const statsLimit = fetchStats ? 5 : 0; // Only fetch stats for first 5 projects if enabled

    // Process projects in smaller batches with delays
    // Only fetch stats for first few projects to avoid timeout
    const projectsWithStats = await processBatch(
      limitedProjects.slice(0, statsLimit),
      2, // Process 2 at a time (reduced to be more conservative)
      async (jiraProject) => {
        try {
          const { issueCount, completedIssueCount } = await fetchProjectStats(jiraProject.key);

          // Generate color based on project key hash
          const colorPalette = [
            "#5E6AD2", "#0BC5EA", "#F59E0B", "#10B981", "#EF4444", 
            "#8B5CF6", "#EC4899", "#06B6D4", "#F97316", "#84CC16"
          ];
          const colorIndex = jiraProject.key.charCodeAt(0) % colorPalette.length;
          const color = colorPalette[colorIndex];

          return {
            id: jiraProject.id,
            name: jiraProject.name,
            description: htmlToPlainText(jiraProject.description) || "",
            subtitle: jiraProject.key,
            color,
            icon: jiraProject.name.charAt(0).toUpperCase(),
            issueCount,
            completedIssueCount,
            status: "active" as const,
            health: issueCount > 0 
              ? completedIssueCount / issueCount > 0.7 
                ? "On track" 
                : completedIssueCount / issueCount > 0.4 
                ? "At risk" 
                : "Off track"
              : "On track",
            lead: jiraProject.lead ? {
              name: jiraProject.lead.displayName,
              avatar: jiraProject.lead.avatarUrls?.["48x48"],
            } : undefined,
          };
        } catch (error) {
          console.error(`Error processing project ${jiraProject.key}:`, error);
          // Return project with default stats
          const colorPalette = ["#5E6AD2", "#0BC5EA", "#F59E0B", "#10B981", "#EF4444"];
          const colorIndex = jiraProject.key.charCodeAt(0) % colorPalette.length;
          return {
            id: jiraProject.id,
            name: jiraProject.name,
            description: htmlToPlainText(jiraProject.description) || "",
            subtitle: jiraProject.key,
            color: colorPalette[colorIndex],
            icon: jiraProject.name.charAt(0).toUpperCase(),
            issueCount: 0,
            completedIssueCount: 0,
            status: "active" as const,
            health: "On track",
            lead: jiraProject.lead ? {
              name: jiraProject.lead.displayName,
            } : undefined,
          };
        }
      },
      1000 // 1000ms delay between batches (increased to reduce load on proxies)
    );

    // Add remaining projects without stats (faster)
    const remainingProjects = limitedProjects.slice(statsLimit).map((jiraProject) => {
      const colorPalette = ["#5E6AD2", "#0BC5EA", "#F59E0B", "#10B981", "#EF4444"];
      const colorIndex = jiraProject.key.charCodeAt(0) % colorPalette.length;
      return {
        id: jiraProject.id,
        name: jiraProject.name,
        description: htmlToPlainText(jiraProject.description) || "",
        subtitle: jiraProject.key,
        color: colorPalette[colorIndex],
        icon: jiraProject.name.charAt(0).toUpperCase(),
        issueCount: 0,
        completedIssueCount: 0,
        status: "active" as const,
        health: "On track",
        lead: jiraProject.lead ? {
          name: jiraProject.lead.displayName,
        } : undefined,
      };
    });

    return [...projectsWithStats, ...remainingProjects];
  } catch (error) {
    console.error("Error fetching JIRA projects:", error);
    throw error;
  }
};

/**
 * Fetch a single project by key from Apache JIRA
 */
export const fetchJiraProject = async (projectKey: string): Promise<Project> => {
  try {
    const jiraEndpoint = `https://issues.apache.org/jira/rest/api/2/project/${projectKey}`;

    const response = await fetchWithRetry(
      jiraEndpoint,
      {
        method: "GET",
        headers: {
          "Accept": "application/json",
        },
      },
      2, // max retries
      15000 // 15 second timeout
    );

    const jiraProject: JiraProject = await response.json();

    // Fetch issue counts
    const statsQuery = `project=${jiraProject.key}`;
    const statsEndpoint = `https://issues.apache.org/jira/rest/api/2/search?jql=${encodeURIComponent(statsQuery)}&maxResults=0`;
    
    let issueCount = 0;
    let completedIssueCount = 0;

    try {
      const statsResponse = await fetchWithRetry(
        statsEndpoint,
        {
          method: "GET",
          headers: {
            "Accept": "application/json",
          },
        },
        1, // single retry
        10000 // 10 second timeout
      );

      const statsData: JiraSearchResponse = await statsResponse.json();
      issueCount = statsData.total || 0;
      
      const resolvedQuery = `project=${jiraProject.key} AND status IN (Resolved, Closed, Done)`;
      const resolvedEndpoint = `https://issues.apache.org/jira/rest/api/2/search?jql=${encodeURIComponent(resolvedQuery)}&maxResults=0`;
      
      try {
        const resolvedResponse = await fetchWithRetry(
          resolvedEndpoint,
          {
            method: "GET",
            headers: {
              "Accept": "application/json",
            },
          },
          1, // single retry
          8000 // 8 second timeout
        );

        const resolvedData: JiraSearchResponse = await resolvedResponse.json();
        completedIssueCount = resolvedData.total || 0;
      } catch {
        // If resolved count fetch fails, just use 0
      }
    } catch {
      // If stats fetch fails, just use 0
    }

    const colorPalette = [
      "#5E6AD2", "#0BC5EA", "#F59E0B", "#10B981", "#EF4444", 
      "#8B5CF6", "#EC4899", "#06B6D4", "#F97316", "#84CC16"
    ];
    const colorIndex = jiraProject.key.charCodeAt(0) % colorPalette.length;
    const color = colorPalette[colorIndex];

    return {
      id: jiraProject.id,
      name: jiraProject.name,
      description: htmlToPlainText(jiraProject.description) || "",
      subtitle: jiraProject.key,
      color,
      icon: jiraProject.name.charAt(0).toUpperCase(),
      issueCount,
      completedIssueCount,
      status: "active" as const,
      health: issueCount > 0 
        ? completedIssueCount / issueCount > 0.7 
          ? "On track" 
          : completedIssueCount / issueCount > 0.4 
          ? "At risk" 
          : "Off track"
        : "On track",
      lead: jiraProject.lead ? {
        name: jiraProject.lead.displayName,
        avatar: jiraProject.lead.avatarUrls?.["48x48"],
      } : undefined,
    };
  } catch (error) {
    console.error("Error fetching JIRA project:", error);
    throw error;
  }
};

