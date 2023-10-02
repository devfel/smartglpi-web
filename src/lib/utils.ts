import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateSimilarityPercentageLinear(x: number) {
  // Create the Function
  const linearAdjustment = 1.33; //increase the results in 33%
  let remove90PercentAdj = (x - 0.9) * 10 * linearAdjustment; //remove the 0.90  from the backend value
  if (remove90PercentAdj < 0) remove90PercentAdj = 0; //if the value is negative, set to 0
  if (remove90PercentAdj > 1) remove90PercentAdj = 1; //if the value is greater than 1, set to 1 (100%
  return remove90PercentAdj * 100;
}
