import { useQuery } from "@tanstack/react-query";
import { fetchJiraIssues, searchJiraIssues } from "@/services/jiraApi";
import { Issue } from "@/components/NewIssueModal";

export interface UseJiraIssuesOptions {
  projectKey?: string;
  jql?: string;
  maxResults?: number;
  enabled?: boolean;
}

/**
 * Hook to fetch issues from Apache JIRA
 */
export const useJiraIssues = (options: UseJiraIssuesOptions = {}) => {
  const {
    projectKey = "FLINK",
    jql,
    maxResults = 50,
    enabled = true,
  } = options;

  return useQuery<Issue[], Error>({
    queryKey: ["jira-issues", projectKey, jql, maxResults],
    queryFn: () => {
      if (jql) {
        return searchJiraIssues(jql, maxResults);
      }
      return fetchJiraIssues(projectKey, maxResults);
    },
    enabled,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
    retry: 2,
    retryDelay: 1000,
  });
};

/**
 * Hook to get issues from JIRA and merge with localStorage issues
 */
export const useIssues = (options: UseJiraIssuesOptions = {}) => {
  const jiraQuery = useJiraIssues(options);
  
  // Get local issues from localStorage
  const getLocalIssues = (): Issue[] => {
    try {
      const stored = localStorage.getItem("issues");
      if (!stored) return [];
      const parsed = JSON.parse(stored);
      // Ensure all issues have required fields
      return parsed.map((issue: Issue) => ({
        ...issue,
        createdBy: issue.createdBy || issue.assignee || "Unknown",
      }));
    } catch {
      return [];
    }
  };

  // If API is disabled or not enabled, return only local issues
  if (!options.enabled || (!options.projectKey && !options.jql)) {
    const localIssues = getLocalIssues();
    return {
      ...jiraQuery,
      data: localIssues,
      localIssues,
      jiraIssues: [],
      isLoading: false,
      isError: false,
      error: null,
    };
  }

  // Merge JIRA issues with local issues (avoid duplicates by ID)
  const localIssues = getLocalIssues();
  const jiraIssues = jiraQuery.data || [];
  
  // Create a map of JIRA issue IDs to avoid duplicates
  const jiraIssueIds = new Set(jiraIssues.map(issue => issue.id));
  
  // Only include local issues that don't have a corresponding JIRA issue
  const uniqueLocalIssues = localIssues.filter(issue => !jiraIssueIds.has(issue.id));
  
  const mergedIssues = [...jiraIssues, ...uniqueLocalIssues];

  return {
    ...jiraQuery,
    data: mergedIssues,
    localIssues,
    jiraIssues,
  };
};

