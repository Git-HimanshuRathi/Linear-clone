import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const InviteCoWorkers = () => {
  const navigate = useNavigate();
  const [emails, setEmails] = useState("");

  const handleContinue = () => {
    navigate("/onboarding/command-menu");
  };

  const handleLater = () => {
    navigate("/onboarding/command-menu");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-lg w-full flex flex-col items-center text-center space-y-8">
        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-4xl font-semibold text-foreground">Invite co-workers to your team</h1>
          <p className="text-base text-muted-foreground">
            Linear is meant to be used with your team. Invite some co-workers to test it out with.
          </p>
        </div>

        {/* Invitation Form */}
        <Card className="w-full bg-surface border-border">
          <CardContent className="p-6">
            <div className="space-y-4">
              <label className="text-sm font-medium text-foreground text-left block">Email</label>
              <Input
                type="email"
                placeholder="email@example.com, email2@example.com..."
                value={emails}
                onChange={(e) => setEmails(e.target.value)}
                className="w-full bg-background border-primary/20 focus-visible:border-primary"
              />
              <div className="flex justify-end">
                <Button
                  onClick={() => {
                    // Handle sending invites
                    console.log("Sending invites to:", emails);
                  }}
                  size="sm"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Send invites
                </Button>
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

        {/* Skip Link */}
        <button
          onClick={handleLater}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          I'll do this later
        </button>
      </div>
    </div>
  );
};

export default InviteCoWorkers;

