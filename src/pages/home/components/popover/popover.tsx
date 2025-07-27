import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Props } from "./types";
import { Delete, Edit, Third } from "@/icons";
import { useNavigate } from "react-router-dom";

export const PopoverAnchor = ({ open, setOpen ,id}: Props) => {
    const navigate = useNavigate();
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <div className="cursor-pointer">
                    <Third />
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-52">
                <div className="flex items-center gap-2 mb-2 cursor-pointer" onClick={() => navigate(`/order/${id}`)}>
                    <Edit /> <h3 className="text-blue-950 text-sm font-semibold">Tahrirlash</h3>
                </div>
                <div className="h-[1px] bg-gray-200 mb-2"></div>
                <div className="flex items-center gap-2 cursor-pointer">
                    <Delete /> <h3 className="text-red-700 text-sm font-semibold">O'chirish</h3>
                </div>
            </PopoverContent>
        </Popover >
    );
};
