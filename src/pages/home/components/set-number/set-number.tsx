import { useEditOrdersMutation, useLazyGetOrderQuery } from '@/app/api';
import { Input } from '@/components';
import { Label } from '@/components/ui/label';
import { useHandleRequest } from '@/hooks/use-handle-request/use-handle-reuqest';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

interface SetProps {
  _id?: string;
  amount: number;
}

export const SetNumber = ({
  openEditID,
  setOpenEditID,
}: {
  openEditID: string;
  setOpenEditID: (state: string) => void;
}) => {
  const [editOrders, { isLoading }] = useEditOrdersMutation();
  const handleRequest = useHandleRequest();
  const [getOrderById, { data: order }] = useLazyGetOrderQuery();
  const form = useForm<SetProps>({
    defaultValues: {
      _id: undefined,
      amount: undefined,
    },
  });

  const getFetchOrded = async () => {
    await handleRequest({
      request: async () => {
        const result = await getOrderById(openEditID).unwrap();
        return result;
      },
    });
  };

  const onSubmit = async (data: SetProps) => {
    await handleRequest({
      request: async () => {
        const result = await editOrders({
          id: openEditID,
          body: {
            amount: Number(data.amount),
            oldAmount: Number(order?.amount),
          },
        }).unwrap();
        return result;
      },
      onSuccess: async () => {
        toast.success("Muvaffaqiyatli o'zgartirildi!");
        getFetchOrded();
        setOpenEditID('');
      },
    });
  };

  useEffect(() => {
    if (order) {
      form.setValue('amount', order?.amount);
    }
  }, [order]);

  useEffect(() => {
    getFetchOrded();
  }, []);

  return (
    <div className='w-full px-5 py-4 bg-white/0 rounded-xl border-2 border-[#ffcb15] flex flex-col gap-4 mt-[47px]'>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='w-full'>
          <Label className='text-[#ffcb15] text-sm font-semibold'>Soni</Label>
          <Controller
            name='amount'
            control={form.control}
            rules={{ required: 'Sonini kiriting!' }}
            render={({ field }) => (
              <>
                <Input
                  className='w-full h-[30px] px-3 bg-white rounded-lg border border-[#ffcb15]'
                  onChange={field.onChange}
                  value={field.value}
                />
                <p className='text-red-600 text-xs'>
                  {form.formState.errors.amount?.message as string}
                </p>
              </>
            )}
          />
          <div className='w-full flex justify-end'>
            <button
              className='w-[118px] h-[31px] pl-[15px] pr-[13px] py-1.5 bg-[#ffcb15] rounded-lg border border-[#ffcb15] justify-center items-center inline-flex mt-4 font-semibold'
              type='submit'
              disabled={isLoading}
            >
              {isLoading ? 'Yuklanmoqda...' : "O'zgartirish"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
