import type { ComponentProps } from "react";

import type { Icon } from "@tabler/icons-react";

import { Button } from "../ui/button";

export type EditorToolbarButtonProps = {
  label: string;
  icon: Icon;
  onClick?: () => void;
} & ComponentProps<typeof Button>;

export function EditorToolbarButton({
  icon,
  label,
  onClick,
  ...props
}: EditorToolbarButtonProps) {
  const IconComponent = icon;
  return (
    <Button
      variant="ghost"
      size="icon-sm"
      title={label}
      onClick={onClick}
      {...props}
    >
      <IconComponent />
      <span className="sr-only">{label}</span>
    </Button>
  );
}
