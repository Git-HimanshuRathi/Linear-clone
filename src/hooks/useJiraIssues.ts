import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { fetchJiraIssues, searchJiraIssues } from "@/services/jiraApi";
import { Issue } from "@/components/NewIssueModal";
import { db } from "@/db/database";
import { useDatabase } from "./useDatabase";

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
 * Hook to get issues from JIRA and merge with SQLite issues
 * Checks SQLite first - if data exists, uses it. Only makes API call if database is empty.
 */
export const useIssues = (options: UseJiraIssuesOptions = {}) => {
  const { isReady } = useDatabase();
  const [localIssues, setLocalIssues] = useState<Issue[]>([]);
  const [hasLocalData, setHasLocalData] = useState(false);

  // Function to load issues from SQLite
  const loadLocalIssues = () => {
    if (isReady) {
      try {
        const issues = db.getIssues();
        const normalizedIssues = issues.map((issue: any) => ({
          ...issue,
          createdBy: issue.createdBy || issue.assignee || "Unknown",
          labels: issue.labels || [],
          links: issue.links || [],
          subIssues: issue.subIssues || [],
          comments: issue.comments || [],
        }));
        setLocalIssues(normalizedIssues);
        setHasLocalData(normalizedIssues.length > 0);
      } catch (error) {
        console.error('Error loading issues from database:', error);
        setLocalIssues([]);
        setHasLocalData(false);
      }
    }
  };

  // Load issues from SQLite on mount and when database becomes ready
  useEffect(() => {
    loadLocalIssues();
  }, [isReady]);

  // Listen for database updates (when new issues are created/updated)
  useEffect(() => {
    if (isReady) {
      // Refresh local issues when storage changes
      const handleStorageChange = () => {
        loadLocalIssues();
      };
      
      // Listen for custom event when issues are updated
      const handleIssuesUpdated = () => {
        // Small delay to ensure database is saved
        setTimeout(loadLocalIssues, 100);
      };
      
      window.addEventListener('issuesUpdated', handleIssuesUpdated);
      // Also listen for storage events (for cross-tab sync)
      window.addEventListener('storage', handleStorageChange);
      
      return () => {
        window.removeEventListener('issuesUpdated', handleIssuesUpdated);
        window.removeEventListener('storage', handleStorageChange);
      };
    }
  }, [isReady]);

  // If API is disabled or no query params, return only local issues
  if (!options.enabled || (!options.projectKey && !options.jql)) {
    return {
      ...useJiraIssues({ ...options, enabled: false }),
      data: localIssues,
      localIssues,
      jiraIssues: [],
      isLoading: !isReady,
      isError: false,
      error: null,
    };
  }

  // Always fetch from API when enabled (ignore local DB presence)
  const shouldFetch = options.enabled && isReady;
  
  const jiraQuery = useJiraIssues({
    ...options,
    enabled: shouldFetch,
  });

  // Do not persist API results into SQLite; always use fresh API data when available
  useEffect(() => {
    // intentionally no-op to avoid overwriting local DB with API subsets
  }, [jiraQuery.data]);

  // Prefer API data; fall back to local issues if API unavailable
  const jiraIssues = jiraQuery.data || [];
  const mergedIssues = jiraIssues.length > 0 ? jiraIssues : localIssues;

  return {
    ...jiraQuery,
    data: mergedIssues,
    localIssues,
    jiraIssues,
    isLoading: !isReady || (shouldFetch && jiraQuery.isLoading),
    isError: jiraQuery.isError && mergedIssues.length === 0,
    error: mergedIssues.length > 0 ? null : jiraQuery.error,
  };
};

