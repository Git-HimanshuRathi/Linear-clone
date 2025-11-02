import { useQuery } from "@tanstack/react-query";
import { fetchJiraProjects } from "@/services/jiraApi";
import { Project } from "@/data/mockData";

export interface UseJiraProjectsOptions {
  enabled?: boolean;
}

/**
 * Hook to fetch projects from Apache JIRA
 */
export const useJiraProjects = (options: UseJiraProjectsOptions = {}) => {
  const { enabled = true } = options;

  return useQuery<Project[], Error>({
    queryKey: ["jira-projects"],
    queryFn: () => fetchJiraProjects(),
    enabled,
    staleTime: 10 * 60 * 1000, // Consider data fresh for 10 minutes (projects change less frequently)
    gcTime: 30 * 60 * 1000, // Keep in cache for 30 minutes
    retry: 2,
    retryDelay: 1000,
  });
};

/**
 * Hook to get projects from JIRA and merge with localStorage projects
 */
export const useProjects = (options: UseJiraProjectsOptions = {}) => {
  const jiraQuery = useJiraProjects(options);
  
  // Get local projects from localStorage
  const getLocalProjects = (): Project[] => {
    try {
      const stored = localStorage.getItem("projects");
      if (!stored) return [];
      return JSON.parse(stored);
    } catch {
      return [];
    }
  };

  // If API is disabled or not enabled, return only local projects
  if (!options.enabled) {
    const localProjects = getLocalProjects();
    return {
      ...jiraQuery,
      data: localProjects,
      localProjects,
      jiraProjects: [],
      isLoading: false,
      isError: false,
      error: null,
    };
  }

  // Merge JIRA projects with local projects (avoid duplicates by ID)
  const localProjects = getLocalProjects();
  const jiraProjects = jiraQuery.data || [];
  
  // Create a map of JIRA project IDs to avoid duplicates
  const jiraProjectIds = new Set(jiraProjects.map(project => project.id));
  
  // Only include local projects that don't have a corresponding JIRA project
  const uniqueLocalProjects = localProjects.filter(project => !jiraProjectIds.has(project.id));
  
  const mergedProjects = [...jiraProjects, ...uniqueLocalProjects];

  return {
    ...jiraQuery,
    data: mergedProjects,
    localProjects,
    jiraProjects,
  };
};

