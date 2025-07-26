import { useEditMutation, useMeQuery } from '@/app/api/authApi';
import { BottomSheet, Button, Input } from '@/components';
import { Label } from '@/components/ui/label';
import { useHandleRequest } from '@/hooks/use-handle-request/use-handle-reuqest';
import { Edit } from '@/icons';
import { useStorage } from '@/utils';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { LiaSpinnerSolid } from 'react-icons/lia';

export const EditUsernameForm = () => {
  const form = useForm();
  const { data: user } = useMeQuery(' ');
  const handleRequest = useHandleRequest();
  const [editProfile, { isLoading }] = useEditMutation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (user) {
      form.reset({
        username: user.username,
      });
    }
  }, [user, form]);
  const onSubmit = async (formState: any) => {
    await handleRequest({
      request: async () => {
        const result = await editProfile({
          _id: user?._id,
          username: formState.username,
        }).unwrap();
        return result;
      },
      onSuccess: () => {
        toast.success("Username muvaffaqiyatli o'zgartirildi!");
        useStorage.removeCredentials();
        window.location.reload();
      },
    });
  };
  return (
    <>
      <div
        className='bg-white rounded-lg p-3 flex gap-x-[8px] items-center cursor-pointer border border-[#ffcb15]'
        onClick={() => setOpen(true)}
      >
        <Edit className='text-[#1b2b56]' />
        <h4 className='text-center text-[#1b2b56] text-sm font-black'>
          Usernameni o’zgartirish
        </h4>
      </div>
      <BottomSheet open={open} setOpen={setOpen}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          noValidate
          className='w-full'
        >
          <div className='w-full py-10'>
            <Label htmlFor='username' className='text-right text-[#FFCC15]'>
              Username
            </Label>
            <Controller
              name='username'
              control={form.control}
              rules={{ required: 'Usernameni kiriting!' }}
              render={({ field }) => (
                <>
                  <Input
                    {...field}
                    id='username'
                    className='placeholder:text-[#1C2C57] bg-white rounded-lg border border-[#ffcb15]'
                    placeholder='Usernameni kiriting'
                  />
                  <p className='text-red text-sm mt-1 text-red-500'>
                    {form.formState.errors.username?.message as string}
                  </p>
                </>
              )}
            />
            <Button className='mt-6 w-full bg-[#ffcb15] text-[#1C2C57] hover:bg-[#ffcb15]'>
              {isLoading || isLoading ? (
                <LiaSpinnerSolid className='animate-spin' size={40} />
              ) : (
                "O'zgartirish"
              )}
            </Button>
          </div>
        </form>
      </BottomSheet>
    </>
  );
};
