import { FileUp, Upload, Github, FolderKanban, Package, LayoutGrid } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ImportIssues = () => {
  const importSources = [
    { name: "GitHub", icon: Github, description: "Import issues and pull requests from GitHub repositories" },
    { name: "Jira", icon: FolderKanban, description: "Migrate your existing Jira issues and projects" },
    { name: "Asana", icon: Package, description: "Import tasks and projects from Asana" },
    { name: "Trello", icon: LayoutGrid, description: "Bring your Trello boards and cards into Linear" },
    { name: "CSV File", icon: Upload, description: "Upload a CSV file with your issues data" },
  ];

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="border-b border-border px-6 py-4">
        <h1 className="text-lg font-semibold">Import issues</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Import your existing issues from other project management tools
        </p>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {importSources.length === 0 ? (
            <div className="flex flex-col items-center gap-4 text-center py-12">
              <FileUp className="w-16 h-16 text-muted-foreground/40" />
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-foreground">No import sources available</h2>
                <p className="text-muted-foreground text-sm">
                  Import options will appear here when configured
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {importSources.map((source) => (
                <Card key={source.name} className="hover:bg-surface-hover transition-colors cursor-pointer">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <source.icon className="w-6 h-6" />
                      {source.name}
                    </CardTitle>
                    <CardDescription>{source.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" size="sm" className="w-full">
                      Import from {source.name}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImportIssues;

