import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { Props } from "./types";

export const BottomSheet = ({ children, open, setOpen, className }: Props) => (
  <Drawer open={open} onClose={() => setOpen && setOpen(false)}>
    <DrawerContent className="bg-[#1b2b56] border-none rounded-t-[30px] px-2 pb-4 pt-[7px]">
      <div
        className={cn(
          "mx-auto w-full max-h-[90vh] overflow-y-auto px-2",
          className
        )}
      >
        {children}
      </div>
    </DrawerContent>
  </Drawer>
);
