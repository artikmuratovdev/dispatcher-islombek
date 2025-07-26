import { useState } from "react";
import { PopoverAnchor } from "..";

export const MainPart = () => {
    const [open, setOpen] = useState(false);
    const [openOne, setOpenOne] = useState(false);
    const [openTwo, setOpenTwo] = useState(false);

    return (
        <>
            <div>
                <div className="w-full h-10 bg-white rounded-lg border border-yellow-400 mt-10 justify-between flex items-center p-2">
                    <h3 className="text-red-700 text-base font-bold leading-tight">Yubileyniy</h3>
                    <div className="flex items-center gap-2">
                        <div className="w-20 h-7 bg-gray-200 rounded-[10px] flex justify-center items-center">
                            <h3>7:25</h3>
                        </div>
                        <PopoverAnchor open={open} setOpen={setOpen} />
                    </div>
                </div>
                <div className="w-full h-10 bg-white rounded-lg border border-yellow-400 mt-10 justify-between flex items-center p-2">
                    <h3 className="text-green-700 text-base font-bold leading-tight">Afruz to'yxonasi</h3>
                    <div className="flex items-center gap-2">
                        <div className="w-20 h-7 bg-gray-200 rounded-[10px] flex justify-center items-center">
                            <h3>16:45</h3>
                        </div>
                        <PopoverAnchor open={openOne} setOpen={setOpenOne} />
                    </div>
                </div>
                <div className="w-full h-10 bg-white rounded-lg border border-yellow-400 mt-10 justify-between flex items-center p-2">
                    <h3 className="text-green-700 text-base font-bold leading-tight">Begoyim</h3>
                    <div className="flex items-center gap-2">
                        <div className="w-20 h-7 bg-gray-200 rounded-[10px] flex justify-center items-center">
                            <h3>16:45</h3>
                        </div>
                        <PopoverAnchor open={openTwo} setOpen={setOpenTwo} />
                    </div>
                </div>
            </div>
        </>
    );
};
