/** biome-ignore-all lint/a11y/noNoninteractiveElementInteractions: we need to add event listeners to the ruler */
/** biome-ignore-all lint/a11y/noStaticElementInteractions: we need to add event listeners to the ruler */

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type EditorRulerProps = {
  leftMargin: number;
  rightMargin: number;
  onLeftMarginChange: (margin: number) => void;
  onRightMarginChange: (margin: number) => void;
  containerWidth?: number;
  onGuideLineChange?: (
    margin: number | null,
    side: "left" | "right" | null
  ) => void;
};

export function EditorRuler({
  leftMargin,
  rightMargin,
  onLeftMarginChange,
  onRightMarginChange,
  containerWidth = 896,
  onGuideLineChange,
}: EditorRulerProps) {
  const rulerRef = useRef<HTMLDivElement>(null);
  const [isDraggingLeft, setIsDraggingLeft] = useState(false);
  const [isDraggingRight, setIsDraggingRight] = useState(false);
  const tickInterval = 1; // 10px = 10cm
  const majorTickInterval = 10; // 100px = 100cm
  const maxTick = ((containerWidth / tickInterval) * tickInterval) / 10;

  useEffect(() => {
    const isDragging = isDraggingLeft || isDraggingRight;

    // Hide guide line when not dragging
    if (!isDragging) {
      onGuideLineChange?.(null, null);
      return;
    }

    const maxMargin = containerWidth * 0.4; // Max 40% of width
    const minMargin = 0;

    const calculateLeftMargin = (x: number) =>
      Math.max(minMargin, Math.min(maxMargin, x));

    const calculateRightMargin = (x: number) =>
      Math.max(minMargin, Math.min(maxMargin, containerWidth - x));

    const handleMouseMove = (e: MouseEvent) => {
      if (!rulerRef.current) {
        return;
      }

      const rect = rulerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;

      if (isDraggingLeft) {
        const newMargin = calculateLeftMargin(x);
        onLeftMarginChange(newMargin);
        onGuideLineChange?.(newMargin, "left");
      }

      if (isDraggingRight) {
        const newMargin = calculateRightMargin(x);
        onRightMarginChange(newMargin);
        onGuideLineChange?.(newMargin, "right");
      }
    };

    const handleMouseUp = () => {
      setIsDraggingLeft(false);
      setIsDraggingRight(false);
      onGuideLineChange?.(null, null);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [
    isDraggingLeft,
    isDraggingRight,
    containerWidth,
    onLeftMarginChange,
    onRightMarginChange,
    onGuideLineChange,
  ]);

  return (
    <div className="relative h-8 w-full select-none">
      <div
        ref={rulerRef}
        style={{ width: `${containerWidth}px` }}
        className="relative mx-auto flex h-full items-end justify-between"
      >
        {Array.from({ length: maxTick }, (_, i) => {
          const isMajor = i % majorTickInterval === 0;
          const isMiddle = i % (majorTickInterval / 2) === 0;

          return (
            <div
              key={`tick-${i + 1}`}
              className={cn(
                "relative h-2 w-px bg-primary/20",
                isMajor && "h-4 bg-primary",
                isMiddle && "bg-primary/50"
              )}
            >
              {isMajor && (
                <span className="-top-4 -translate-x-1/2 absolute left-1/2 whitespace-nowrap text-[10px] text-foreground">
                  {i}
                </span>
              )}
            </div>
          );
        })}

        {/* Left margin indicator */}
        <div
          className={cn(
            "absolute top-0 h-full w-0.5 cursor-ew-resize bg-primary transition-colors",
            isDraggingLeft && "bg-primary/80"
          )}
          style={{ left: `${leftMargin}px` }}
          onMouseDown={(e) => {
            e.preventDefault();
            setIsDraggingLeft(true);
          }}
        >
          <div className="-top-1 -translate-x-1/2 absolute left-1/2 h-2 w-2 rounded-full bg-primary" />
          <div className="-bottom-1 -translate-x-1/2 absolute left-1/2 h-2 w-2 rounded-full bg-primary" />
        </div>

        {/* Right margin indicator */}
        <div
          className={cn(
            "absolute top-0 h-full w-0.5 cursor-ew-resize bg-primary transition-colors",
            isDraggingRight && "bg-primary/80"
          )}
          style={{ right: `${rightMargin}px` }}
          onMouseDown={(e) => {
            e.preventDefault();
            setIsDraggingRight(true);
          }}
        >
          <div className="-top-1 -translate-x-1/2 absolute left-1/2 h-2 w-2 rounded-full bg-primary" />
          <div className="-bottom-1 -translate-x-1/2 absolute left-1/2 h-2 w-2 rounded-full bg-primary" />
        </div>

        <div
          className="absolute top-0 h-full"
          style={{ left: "0", width: `${leftMargin}px` }}
        />
        <div
          className="absolute top-0 h-full"
          style={{ right: "0", width: `${rightMargin}px` }}
        />
      </div>
    </div>
  );
}
