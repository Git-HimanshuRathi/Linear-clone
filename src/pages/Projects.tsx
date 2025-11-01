import { FolderKanban } from "lucide-react";
import { Button } from "@/components/ui/button";

const Projects = () => {
  return (
    <div className="h-full flex flex-col bg-background">
      <div className="border-b border-border px-6 py-4">
        <h1 className="text-lg font-semibold">Projects</h1>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 max-w-md text-center">
          <FolderKanban className="w-16 h-16 text-muted-foreground/40" />
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground">No projects yet</h2>
            <p className="text-muted-foreground text-sm">
              Projects help you organize and track related issues. Create your first project to get started.
            </p>
          </div>
          <Button className="mt-4">
            Create project
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Projects;

