import { MoreHorizontal, Settings, HelpCircle, Book, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const More = () => {
  return (
    <div className="h-full flex flex-col bg-background">
      <div className="border-b border-border px-6 py-4">
        <h1 className="text-lg font-semibold">More</h1>
      </div>

      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="hover:bg-surface-hover transition-colors cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Settings
                </CardTitle>
                <CardDescription>
                  Configure your workspace preferences and integrations
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:bg-surface-hover transition-colors cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5" />
                  Help & Support
                </CardTitle>
                <CardDescription>
                  Get help, browse documentation, and contact support
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:bg-surface-hover transition-colors cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Book className="w-5 h-5" />
                  Documentation
                </CardTitle>
                <CardDescription>
                  Learn how to use Linear effectively with our guides
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:bg-surface-hover transition-colors cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Keyboard Shortcuts
                </CardTitle>
                <CardDescription>
                  View all available keyboard shortcuts for faster navigation
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default More;

