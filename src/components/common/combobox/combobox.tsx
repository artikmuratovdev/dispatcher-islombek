import * as React from "react";
import * as Popover from "@radix-ui/react-popover";
import { ChevronDown, CircleX } from "lucide-react";
import { ComboboxProps } from "./types";
import { client } from "@/app/api/order/types";

export const Combobox: React.FC<ComboboxProps> = ({
  clients,
  value,
  onChange,
  setValues,
  changeBreadPrices,
  placeholder = "Qidirish...",
}) => {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  React.useEffect(() => {
    const selected = clients.find((client) => client._id === value);
    if (selected) {
      setInputValue(selected.fullName);
    } else {
      setInputValue("");
    }
  }, [value, clients]);

  const filteredOptions = React.useMemo(
    () =>
      clients
        .filter(
          (client) =>
            client.fullName.toLowerCase() !== "boshqa" &&
            client.fullName.toLowerCase().includes(inputValue.toLowerCase())
        )
        .sort((a, b) => a.fullName.localeCompare(b.fullName)),
    [inputValue, clients]
  );

  const handleSelect = (client: client) => {
    setInputValue(client.fullName);
    onChange(client._id);
    setValues?.(client);
    if (client.fullName) {
      changeBreadPrices?.({ fullName: client.fullName, id: client._id });
    }
    setOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange("");
    if (!open) setOpen(true);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setInputValue("");
    onChange("");
  };

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button
          type="button"
          className="w-full h-10 rounded-lg border border-yellow bg-white px-3 text-base font-semibold text-main placeholder:text-muted-foreground outline-none text-left flex items-center justify-between"
        >
          <span className="truncate">{inputValue || placeholder}</span>
          <ChevronDown className="text-yellow-300" />
        </button>
      </Popover.Trigger>

      <Popover.Content
        className="z-50 mt-1 w-[var(--radix-popover-trigger-width)] rounded-lg border border-yellow bg-white shadow-md"
        align="start"
        sideOffset={-45}
      >
        <div className="max-h-60 overflow-auto">
          {/* Search input */}
          <div className="flex items-center justify-between pr-3 border-b border-yellow">
            <input
              type="text"
              placeholder={placeholder}
              value={inputValue}
              onChange={handleInputChange}
              onFocus={() => setOpen(true)}
              className="w-full h-10 rounded-lg bg-white px-3 pr-8 text-base font-semibold text-main placeholder:text-muted-foreground outline-none"
            />
            <CircleX
              onClick={handleClear}
              className="text-black cursor-pointer ml-2 shrink-0"
            />
          </div>

          {/* "Boshqa" option */}
          <div
            onClick={() =>
              handleSelect({ _id: "boshqa", fullName: "Boshqa" } as client)
            }
            className="cursor-pointer px-3 py-2 hover:bg-accent hover:text-accent-foreground text-base font-semibold text-main"
          >
            Boshqa
          </div>

          {/* Filtered options */}
          {filteredOptions.map((client) => (
            <div
              key={client._id}
              onClick={() => handleSelect(client)}
              className="cursor-pointer px-3 py-2 hover:bg-accent hover:text-accent-foreground text-base font-semibold text-main"
            >
              {client.fullName}
            </div>
          ))}
        </div>
      </Popover.Content>
    </Popover.Root>
  );
};
