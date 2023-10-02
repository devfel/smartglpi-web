import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { useState, useEffect } from "react";

export function Header() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="px-6 py-3 flex items-center justify-between border-b">
      <h1 className="text-xl font-bold">Smart GLPI</h1>

      <div className="flex items-center gap-3">
        <Button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
          <Sun className="w-4 h-4 me-2" />
          <Separator orientation="vertical" className="h-6" />
          <Moon className="w-4 h-4 ms-2" />
        </Button>
      </div>
    </div>
  );
}
