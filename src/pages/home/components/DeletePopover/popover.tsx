import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Props } from './types';
import {  Edit, Third } from '@/icons';
import { useNavigate } from 'react-router-dom';

export const PopoverAnchor = ({ open, setOpen, id, title ,children}: Props) => {
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
          onClick={() => navigate(`/orders/active-order/${id}`)}
        >
          <Edit />
          <h3 className='text-blue-950 text-sm font-semibold'>Tahrirlash</h3>
        </div>
        <div className='h-[1px] bg-gray-200 mb-2'></div>
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
import React from 'react';
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
import { useDeleteOrderMutation } from '@/app/api';
import toast from 'react-hot-toast';

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
  const [name, setName] = React.useState('');
  const [error, setError] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [deleteOrder, { isLoading }] = useDeleteOrderMutation();
  const navigate = useNavigate();

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
        navigate(`/dashboard`)
      } catch (err) {
        setError("O'chirishda xatolik yuz berdi");
      }
    } else {
      setError(`Iltimos, "${title}" deb yozing.`);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setError('');
  };

  // Clear input and error when dialog closes
  React.useEffect(() => {
    if (!open) {
      setName('');
      setError('');
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Haqiqatan o'chirmoqchimisiz?</DialogTitle>
          <DialogDescription>
            Iltimos, tasdiqlash uchun quyidagi maydonga <br /> <strong>{title}</strong>{' '}
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
              disabled={name.trim() !== title || isLoading}
            >
              {isLoading ? "O'chirilmoqda..." : "O'chirish"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
