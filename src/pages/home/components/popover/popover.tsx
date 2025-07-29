import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Props } from './types';
import { Delete, Edit, Third } from '@/icons';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button, Input } from '@/components';
import React from 'react';
import { useDeleteOrderMutation, useLazyGetActiveDispatchesQuery } from '@/app/api';
import toast from 'react-hot-toast';

export const PopoverAnchor = ({ open, setOpen, id, title }: Props) => {
  const navigate = useNavigate();
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className='cursor-pointer'>
          <Third />
        </div>
      </PopoverTrigger>
      <PopoverContent className='w-52'>
        <div
          className='flex items-center gap-2 mb-2 cursor-pointer'
          onClick={() => navigate(`/orders/${id}`)}
        >
          <Edit />{' '}
          <h3 className='text-blue-950 text-sm font-semibold'>Tahrirlash</h3>
        </div>
        <div className='h-[1px] bg-gray-200 mb-2'></div>
        <DeletePopover title={title} id={id} setOpenTag={setOpen} />
      </PopoverContent>
    </Popover>
  );
};

type DeletePopoverProps = {
  title: string;
  id: string;
  setOpenTag: React.Dispatch<React.SetStateAction<boolean>>;
};

export const DeletePopover: React.FC<DeletePopoverProps> = ({ title, id ,setOpenTag}) => {
  const [name, setName] = React.useState('');
  const [error, setError] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [deleteOrder] = useDeleteOrderMutation();
  const [getActiveOrders] = useLazyGetActiveDispatchesQuery()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = name.trim();

    if (trimmed === title) {
      try {
        await deleteOrder({ id }).unwrap();
        setError('');
        setOpenTag(false);
        toast.success("Buyurtma o'chirildi");
        setOpen(false);
      } catch (err) {
        setError("O'chirishda xatolik yuz berdi");
      }
    } else {
      setError(`Iltimos, "${title}" deb yozing.`);
    }
    await getActiveOrders();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setError('');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className='flex items-center gap-2 cursor-pointer'>
          <Delete />
          <h3 className='text-red-700 text-sm font-semibold'>O'chirish</h3>
        </div>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Haqiqatan o'chirmoqchimisiz?</DialogTitle>
          <DialogDescription>
            Iltimos, tasdiqlash uchun quyidagi maydonga <strong>{title}</strong>{' '}
            deb yozing.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className='grid gap-4 mt-2'>
          <div className='space-y-2'>
            <Input
              id='delete-confirm'
              value={name}
              onChange={handleChange}
              placeholder={title}
              aria-invalid={!!error}
              aria-describedby='error-message'
            />
            {error && (
              <p id='error-message' className='text-sm text-red-500'>
                {error}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button
              type='submit'
              variant='destructive'
              disabled={name.trim() !== title}
            >
              O'chirish
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
