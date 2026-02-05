import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Props } from "./types";
import { Edit, Third } from "@/icons";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components";
import { useDeleteOrderMutation, useGetActiveDispatchesQuery } from "@/app/api";
import toast from "react-hot-toast";

export const PopoverAnchor = ({
  open,
  setOpen,
  id,
  title,
  children,
}: Props) => {
  const navigate = useNavigate();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="cursor-pointer">
          <Third />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-52">
        <div
          className="flex items-center gap-2 mb-2 cursor-pointer"
          onClick={() => navigate(`/orders/active-order/${id}`)}
        >
          <Edit />
          <h3 className="text-blue-950 text-sm font-semibold">
            Buyurtmani ko'rish
          </h3>
        </div>
        <div className="h-[1px] bg-gray-200 mb-2"></div>
        <DeletePopover
          title={title}
          id={id}
          setOpenTag={setOpen}
          trigger={children}
        />
      </PopoverContent>
    </Popover>
  );
};

type DeletePopoverProps = {
  title: string;
  id: string;
  setOpenTag: React.Dispatch<React.SetStateAction<boolean>>;
  trigger: React.ReactNode;
};

export const DeletePopover: React.FC<DeletePopoverProps> = ({
  title,
  id,
  setOpenTag,
  trigger,
}) => {
  const [open, setOpen] = React.useState(false);
  const [deleteOrder, { isLoading }] = useDeleteOrderMutation();
  const { refetch } = useGetActiveDispatchesQuery();

  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await deleteOrder({ id }).unwrap();
      setOpenTag(false);
      toast.success("Buyurtma o'chirildi");
      setOpen(false);
      refetch();
      navigate("/dashboard", { state: { activeTab: 1 } });
    } catch {
      toast.error("O'chirishda xatolik yuz berdi");
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Haqiqatan o'chirmoqchimisiz?</DialogTitle>
          <DialogDescription>
            <strong>{title}</strong> buyurtmasini o'chirmoqchimisiz?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 mt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isLoading}
          >
            Yo'q
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? "O'chirilmoqda..." : "Ha"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
