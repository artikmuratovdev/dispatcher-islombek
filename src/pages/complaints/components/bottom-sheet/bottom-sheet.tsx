import { Button, TextArea } from '@/components';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Role } from '@/constants';
import { useHandleRequest } from '@/hooks/use-handle-request/use-handle-reuqest';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { PropsComp } from './types';
import { useSendComplaintMutation } from '@/app/api/complaint/complaint';
import { useGetAllUsersQuery } from '@/app/api';

export const SentMessage = ({
  setOpen,
}: {
  setOpen: (value: boolean) => void;
}) => {
  const form = useForm();
  const [sendComplaint] = useSendComplaintMutation();
  const { data: users, isLoading } = useGetAllUsersQuery({
    roles: [Role.ADMIN, Role.CEO, Role.BAKER, Role.DISPATCHER, Role.DIVIDER, Role.DOUGHMAKER, Role.DRIVER, Role.SUPPLIER],
  });
  const handleRequest = useHandleRequest();
  const onSubmit = async (data: PropsComp) => {
    await handleRequest({
      request: async () => {
        const result = await sendComplaint(data).unwrap();
        return result;
      },
      onSuccess: () => {
        form.reset({
          to: '',
          content: '',
        });
        setOpen(false);
        toast.success('Shikoyat muvaffaqiyatli yuborildi!', {
          duration: 2000,
        });
      },
    });
  };
  return (
    <div>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-y-3'
      >
        <Controller
          name='to'
          control={form.control}
          rules={{ required: 'Xodimni tanlang' }}
          render={({ field }) => (
            <>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className='h-[42px] bg-white text-ellipsis rounded-lg border-2 border-[#ffcb15] text-[#1b2b56] text-base font-semibold font-inter mt-[50px]'>
                  <SelectValue placeholder='Xodimni tanlang' />
                </SelectTrigger>
                <SelectContent className='bg-white rounded-lg border border-[#ffcb15] mt-[9px]'>
                  {users &&
                    users.map((item) => (
                      <SelectItem
                        key={item._id}
                        value={item._id as string}
                        className='text-[#1b2b56] text-base font-semibold font-inter bg-white rounded-lg border border-[#ffcb15] mt-[9px] flex items-center gap-x-12'
                      >
                        {item.fullName}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </>
          )}
        />

        <Controller
          name='content'
          rules={{ required: 'Shikoyatni kiriting!' }}
          control={form.control}
          render={({ field }) => (
            <>
              <TextArea
                placeholder='Shikoyatni yozing!'
                className='bg-white rounded-lg'
                {...field}
              />
              <p className='text-xs text-red-600'>
                {typeof form.formState.errors.content?.message === 'string' &&
                  form.formState.errors.content.message}
              </p>
            </>
          )}
        />


        <div className='flex justify-end'>
          <Button
            type='submit'
            disabled={isLoading}
            className=' bg-[#ffcb15] rounded-lg text-[#1b2b56] text-base font-semibold font-inter hover:bg-[#ffcb15] mt-[7px]'
          >
            {isLoading ? 'Yuborilmoqda...' : 'Yuborish'}
          </Button>
        </div>
      </form>
    </div>
  );
};
