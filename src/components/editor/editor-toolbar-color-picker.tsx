import type { Icon } from "@tabler/icons-react";

import {
  ColorPicker,
  ColorPickerAlphaSlider,
  ColorPickerArea,
  ColorPickerEyeDropper,
  ColorPickerFormatSelect,
  ColorPickerHueSlider,
  ColorPickerInput,
} from "@/components/ui/color-picker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "../ui/button";

export function EditorToolbarColorPicker({
  value,
  onValueChange,
  icon,
}: {
  value: string;
  onValueChange: (color: string) => void;
  icon: Icon;
}) {
  const IconComponent = icon;

  return (
    <ColorPicker
      value={value}
      onValueChange={onValueChange}
      inline
      defaultFormat="hex"
    >
      <Popover modal>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon-sm" title="Text Color">
            <IconComponent style={{ color: value }} />
            <span className="sr-only">Text Color</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <div className="flex flex-col gap-4 rounded-lg border p-4">
            <ColorPickerArea />
            <div className="flex items-center gap-2">
              <ColorPickerEyeDropper />
              <div className="flex flex-1 flex-col gap-2">
                <ColorPickerHueSlider />
                <ColorPickerAlphaSlider />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ColorPickerFormatSelect />
              <ColorPickerInput />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </ColorPicker>
  );
}
