import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader } from "@/components/ui/alert-dialog"
import { AlertModalProps } from "./types"
import { useStorage } from "@/utils";

export function AlertModal({ children, className, open, setOpen }: AlertModalProps) {
    const handleLogOut = () => {
        useStorage.removeCredentials();
        window.location.reload();
    };
    return (
        <AlertDialog open={open} onOpenChange={() => setOpen && setOpen(false)}>
            <AlertDialogContent>
                <AlertDialogHeader className={className}>
                    {children}
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={handleLogOut} className="bg-red-500 hover:bg-red-500 text-white hover:text-white">Tizimdan chiqish</AlertDialogCancel>
                    <AlertDialogAction>Bekor qilish</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
