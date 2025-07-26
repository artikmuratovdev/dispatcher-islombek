import { AlertModal } from "@/components";
import { AccardionShow, EditPasswordForm, Logout, ProfileTop } from "./components";
import { useState } from "react";
import { Export } from "@/icons";

export const Profile = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <ProfileTop />
      <div className="mt-[100px] p-5">
        <div className="mt-[63px] flex flex-col gap-y-5">
          <AccardionShow />
          <EditPasswordForm />
          <div
            className="bg-white rounded-lg p-3 flex gap-x-[8px] items-center cursor-pointer border border-[#ffcb15]"
            onClick={() => setOpen(true)}
          >
            <Export className="text-[#1b2b56]" />
            <h4 className="text-right text-[#1b2b56] text-sm font-black ">
              Akkountdan Chiqish
            </h4>
          </div>
          <AlertModal open={open} setOpen={setOpen} children={<Logout />} />
        </div>
      </div>
    </div>
  )
};
