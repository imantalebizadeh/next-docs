import { useCallback, useEffect, useRef } from "react";

/**
 * Returns a debounced version of the provided callback function.
 * The debounced function will delay invoking the callback until after
 * the specified delay has elapsed since the last time it was invoked.
 *
 * @param callback - The function to debounce
 * @param delay - The delay in milliseconds (defaults to 0, meaning no debounce)
 * @returns A debounced version of the callback
 */
export function useDebounce<T extends (...args: Parameters<T>) => void>(
  callback: T,
  delay = 0
): T {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const callbackRef = useRef(callback);

  // Keep callback ref up to date
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Cleanup timeout on unmount
  useEffect(
    () => () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    },
    []
  );

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // If delay is 0 or undefined, call immediately without debouncing
      if (!delay) {
        callbackRef.current(...args);
        return;
      }

      timeoutRef.current = setTimeout(() => {
        callbackRef.current(...args);
      }, delay);
    },
    [delay]
  ) as T;

  return debouncedCallback;
}
