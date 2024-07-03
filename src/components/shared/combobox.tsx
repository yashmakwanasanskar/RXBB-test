
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ComboboxProps } from "@/types";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";

export default function ComboboxDemo({
  data,
  buttonClassName = "",
  popOverClassName = "",
  icon = "",
  placeholder = "",
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3  pointer-events-none">
              <img
                src={icon}
                alt="Input Icon"
                width={24}
                height={24}
                className="w-5 h-5"
              />
            </div>
          )}
          <div>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className={`${
                icon && "pl-10"
              } w-[200px] justify-between text-[#7E7E7E] xl:text-sm text-xs ${buttonClassName}`}>
              {value
                ? data.find((item) => item.value === value)?.label
                : placeholder
                ? placeholder
                : "Select a Form"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className={`w-[200px] p-0 ${popOverClassName}`}>
        <Command>
          <CommandInput
            className=" xl:text-sm text-xs"
            placeholder="Search..."
          />
          <CommandEmpty className=" xl:text-sm text-xs">
            Not found.
          </CommandEmpty>
          <CommandGroup>
            {data.map((item) => {
              return (
                <CommandItem
                  className=" xl:text-sm text-xs"
                  key={item.value}
                  value={item.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}>
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === item.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item.label}
                </CommandItem>
              );
            })}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
