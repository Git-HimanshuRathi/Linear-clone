import { Inbox as InboxIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const Inbox = () => {
  return (
    <div className="h-full flex flex-col bg-background">
      <div className="border-b border-border px-6 py-4">
        <h1 className="text-lg font-semibold">Inbox</h1>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 max-w-md text-center">
          <InboxIcon className="w-16 h-16 text-muted-foreground/40" />
          <div className="space-y-2">
            <p className="text-muted-foreground text-sm">
              Your inbox is empty
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inbox;
