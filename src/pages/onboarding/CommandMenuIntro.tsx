import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const CommandMenuIntro = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/onboarding/github");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-lg w-full flex flex-col items-center text-center space-y-8">
        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-4xl font-semibold text-foreground">Meet the command menu</h1>
          <p className="text-base text-muted-foreground">
            Complete any action in seconds by typing it into the command menu.
          </p>
        </div>

        {/* Instruction Card */}
        <Card className="w-full bg-surface border-border">
          <CardContent className="p-6">
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">Try opening the command menu with:</p>
              <div className="flex items-center justify-center gap-2">
                <kbd className="px-3 py-1.5 text-sm font-semibold bg-background border border-border rounded-md text-foreground">
                  Ctrl
                </kbd>
                <span className="text-muted-foreground">+</span>
                <kbd className="px-3 py-1.5 text-sm font-semibold bg-background border border-border rounded-md text-foreground">
                  K
                </kbd>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Continue Button */}
        <Button
          onClick={handleContinue}
          size="lg"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default CommandMenuIntro;

