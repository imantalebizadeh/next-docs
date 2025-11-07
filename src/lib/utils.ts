import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges class values into a single class string.
 * @param inputs - The class values to merge.
 * @returns The merged class values.
 */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
