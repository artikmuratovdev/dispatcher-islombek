import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ITEMS = [
  { id: 1, name: "Admin", const: "2 000 000" },
  { id: 2, name: "Sotuv", const: "1 000 000" },
];

export function SheetSide() {
  return (
    <div className="h-[200px]">
      <Select defaultValue="Admin">
        <SelectTrigger className="h-[42px] bg-white text-ellipsis rounded-lg border-2 border-[#ffcb15] text-[#1b2b56] text-base font-semibold font-inter mt-[50px]">
          <SelectValue placeholder="Kirim" />
        </SelectTrigger>
        <SelectContent className="bg-white rounded-lg border border-[#ffcb15] mt-[9px]">
          {ITEMS.map((item) => (
            <SelectItem
              key={item.id}
              value={item.name}
              className="text-[#1b2b56] text-base font-semibold font-inter bg-white rounded-lg border border-[#ffcb15] mt-[9px] flex items-center gap-x-12"
            >
              {item.name}
              <span className="absolute right-20">{item.const}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
