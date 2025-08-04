import { useLogoutMutation } from "@/app/api";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Export } from "@/icons";
import { useStorage } from "@/utils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export const Logout = () => {
  const [open, setOpen] = useState(false);
  const [logout, { isLoading }] = useLogoutMutation();

  const navigate = useNavigate();

  const LogoutFunction = () => {
    logout();
    navigate("/login");
    setOpen(false);
    useStorage.removeCredentials();
  };
  return (
    <>
      <div
        className="bg-white rounded-lg p-3 flex gap-x-[8px] items-center cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <Export className="text-[#1b2b56]" />
        <h4 className="text-center text-[#1b2b56] text-sm font-black ">
          Akkountdan Chiqish
        </h4>
      </div>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tizimdan chiqmoqchimisz?</AlertDialogTitle>
            <AlertDialogDescription>
              Hisobdan chiqishni xohlaysizmi? Chiqganingizdan keyin hisobingizga
              kiraolmaysiz.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-[#1b2b56] text-white">
              Bekor qilish
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={LogoutFunction}
              className="bg-[#1b2b56] text-white"
            >
              {isLoading ? "Loading..." : "Chiqish"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};