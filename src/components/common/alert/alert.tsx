import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from '@/components/ui/alert-dialog';
import { OrderStatus } from '@/constants';
import { useHandleRequest } from '@/hooks/use-handle-request/use-handle-reuqest';
import { toast } from 'react-hot-toast';
import { AlertProps } from './types';

export function Alert({ children, className, open, setOpen, id }: AlertProps) {
  const handleRequest = useHandleRequest();
  // const handleLogOut = async (id: string) => {
  //   await handleRequest({
  //     request: async () => {
  //       const result = await deleteOrders({
  //         id,
  //         body: {
  //           status: OrderStatus.CANCELLED,
  //         },
  //       }).unwrap();
  //       return result;
  //     },
  //     onSuccess: () => {
  //       setOpen('');
  //       toast.success("Muvaffaqiyatli o'chirildi!");
  //     },
  //   });
  // };
  return (
    <AlertDialog open={open} onOpenChange={() => setOpen && setOpen('')}>
      <AlertDialogContent>
        <AlertDialogHeader className={className}>{children}</AlertDialogHeader>
        <AlertDialogFooter>
          {/* <AlertDialogCancel
            onClick={() => handleLogOut(id as string)}
            className='bg-red-500 hover:bg-red-500 text-white hover:text-white'
            disabled={isLoading}
          >
            {isLoading ? "O'chirilmoqda..." : "O'chirish"}
          </AlertDialogCancel> */}
          <AlertDialogAction>Bekor qilish</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
