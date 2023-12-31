import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <div className="px-6 py-3 flex items-center justify-end border-t">
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">
          Developed by Felizardo
        </span>

        <Separator orientation="vertical" className="h-6" />

        <a
          href="https://github.com/devfel"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="outline">
            <Github className="w-4 h-4 mr-2" />
            DevFel
          </Button>
        </a>
      </div>
    </div>
  );
}
