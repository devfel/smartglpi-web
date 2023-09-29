import { RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ButtonLoading() {
  return (
    <Button disabled variant="outline" className="disabled:opacity-100">
      <RotateCw className="mr-2 h-4 w-4 animate-spin" />
      Loading Data
    </Button>
  );
}
