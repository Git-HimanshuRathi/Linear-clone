import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";

const SubscribeToUpdates = () => {
  const navigate = useNavigate();
  const [changelogEnabled, setChangelogEnabled] = useState(false);
  const [marketingEnabled, setMarketingEnabled] = useState(false);

  const handleContinue = () => {
    navigate("/onboarding/complete");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-lg w-full flex flex-col items-center text-center space-y-8">
        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-4xl font-semibold text-foreground">Subscribe to updates</h1>
          <p className="text-base text-muted-foreground">
            Linear is constantly evolving. Subscribe to learn about changes.
          </p>
        </div>

        {/* Subscription Options */}
        <Card className="w-full bg-surface border-border">
          <CardContent className="p-6 space-y-6">
            {/* Changelog */}
            <div className="flex items-center justify-between">
              <div className="flex-1 text-left space-y-1">
                <h3 className="font-semibold text-foreground">Subscribe to changelog</h3>
                <p className="text-sm text-muted-foreground">
                  Bi-weekly email about new features and improvements
                </p>
              </div>
              <Switch
                checked={changelogEnabled}
                onCheckedChange={setChangelogEnabled}
              />
            </div>

            {/* Marketing */}
            <div className="flex items-center justify-between">
              <div className="flex-1 text-left space-y-1">
                <h3 className="font-semibold text-foreground">Subscribe to marketing and onboarding emails</h3>
                <p className="text-sm text-muted-foreground">
                  Occasional messages to help you get the most out of Linear
                </p>
              </div>
              <Switch
                checked={marketingEnabled}
                onCheckedChange={setMarketingEnabled}
              />
            </div>

            {/* X (Twitter) */}
            <div className="flex items-center justify-between">
              <div className="flex-1 text-left space-y-1">
                <h3 className="font-semibold text-foreground">Follow us on X</h3>
                <p className="text-sm text-muted-foreground">
                  Stay up-to-date on new features and best practices
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => window.open("https://x.com/linear", "_blank")}
              >
                <X className="w-4 h-4" />
                <span>@linear</span>
              </Button>
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

export default SubscribeToUpdates;

