import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

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
        <Button
          variant="ghost"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "dark" ? (
            <Sun className="w-4 h-4" />
          ) : (
            <Moon className="w-4 h-4 m-0 p-0" />
          )}
        </Button>
      </div>
    </div>
  );
}
