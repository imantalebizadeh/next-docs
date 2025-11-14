import type { ComponentProps } from "react";

import type { LucideIcon } from "lucide-react";

import { Toggle } from "../ui/toggle";

export type EditorToolbarToggleProps = {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
} & ComponentProps<typeof Toggle>;

export function EditorToolbarToggle({
  icon,
  label,
  onClick,
  ...props
}: EditorToolbarToggleProps) {
  const IconComponent = icon;
  return (
    <Toggle
      variant="default"
      size="sm"
      title={label}
      onClick={onClick}
      {...props}
    >
      <IconComponent />
      <span className="sr-only">{label}</span>
    </Toggle>
  );
}
