import { Github, Check, Link2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const LinkGitHub = () => {
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = () => {
    // Simulate GitHub connection
    setIsConnected(true);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
  };

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="border-b border-border px-6 py-4">
        <h1 className="text-lg font-semibold">Link GitHub</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Connect your GitHub account to sync pull requests and issues
        </p>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          {!isConnected ? (
            <Card className="bg-surface border-border">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Github className="w-8 h-8 text-foreground" />
                  <div>
                    <CardTitle>Connect with GitHub</CardTitle>
                    <CardDescription>
                      Automate issue workflow when GitHub pull requests are opened and merged.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground">
                      Linear links the issue and the GitHub pull request automatically.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground">
                      Linear syncs the issue status when a pull request is opened, closed, merged, or reverted.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground">
                      Linear will not ask for code read permissions.
                    </p>
                  </div>
                </div>
                <Button
                  onClick={handleConnect}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Github className="w-4 h-4 mr-2" />
                  Authenticate with GitHub
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-surface border-border">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Github className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>GitHub Connected</CardTitle>
                    <CardDescription>
                      Your GitHub account is connected and syncing
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-background border border-border">
                  <div className="flex items-center gap-3">
                    <Github className="w-5 h-5 text-foreground" />
                    <div>
                      <p className="text-sm font-medium text-foreground">GitHub Account</p>
                      <p className="text-xs text-muted-foreground">Connected</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    <span className="text-xs text-muted-foreground">Active</span>
                  </div>
                </div>
                <Button
                  onClick={handleDisconnect}
                  variant="outline"
                  className="w-full"
                >
                  <Link2 className="w-4 h-4 mr-2" />
                  Disconnect GitHub
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default LinkGitHub;

