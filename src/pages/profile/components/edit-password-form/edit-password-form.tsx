import { useEditPasswordMutation } from '@/app/api/authApi';
import { BottomSheet, Button, Input } from '@/components';
import { Label } from '@/components/ui/label';
import { useHandleRequest } from '@/hooks/use-handle-request/use-handle-reuqest';
import { Password } from '@/icons';
import { useStorage } from '@/utils';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';
import { LiaSpinnerSolid } from 'react-icons/lia';

interface PropsValue {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const EditPasswordForm = () => {
  const form = useForm({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });
  const handleRequest = useHandleRequest();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordtwo, setShowPasswordTwo] = useState(false);
  const [showPasswordth, setShowPasswordTh] = useState(false);
  const [editPassword, { isLoading }] = useEditPasswordMutation();
  const [open, setOpen] = useState(false);
  const onSubmit = async (data: PropsValue) => {
    await handleRequest({
      request: async () => {
        const result = await editPassword({
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
          confirmPassword: data.confirmPassword,
        }).unwrap();
        return result;
      },
      onSuccess: () => {
        toast.success("Parol muvaffaqiyatli o'zgartirildi!");
        if (toast.success("Parol muvaffaqiyatli o'zgartirildi!")) {
          useStorage.removeCredentials();
          window.location.reload();
        }
      },
    });
  };
  return (
    <>
      <div
        className='bg-white rounded-lg p-3 flex gap-x-[8px] items-center cursor-pointer border border-[#ffcb15]'
        onClick={() => setOpen(true)}
      >
        <Password className='text-[#1b2b56]' />
        <h4 className='text-center text-[#1b2b56] text-sm font-black'>
          Profile parolini o’zgartirish
        </h4>
      </div>
      <BottomSheet open={open} setOpen={setOpen}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          noValidate
          className='w-full'
        >
          <div className='w-full py-10'>
            <Label htmlFor='oldPassword' className='text-right text-[#FFCC15]'>
              Eski Parol
            </Label>
            <Controller
              name='oldPassword'
              control={form.control}
              rules={{ required: 'Eski Parolni kiriting!' }}
              render={({ field }) => (
                <>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    onChange={field.onChange}
                    value={field.value}
                    id='oldPassword'
                    className={`placeholder:text-[#1C2C57] bg-white rounded-lg border border-[#ffcb15] ${
                      form.formState.errors.oldPassword ? 'border-red' : ''
                    }`}
                    placeholder='Eski Parolni kiriting'
                  />
                  <button
                    type='button'
                    className='absolute -mt-[30px] right-5 text-gray-500'
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? (
                      <IoIosEyeOff className='w-6 h-6' />
                    ) : (
                      <IoIosEye className='w-6 h-6' />
                    )}
                  </button>
                  {form.formState.errors.oldPassword && (
                    <p className='text-red text-sm mt-1 text-red-500'>
                      {form.formState.errors.oldPassword.message as string}
                    </p>
                  )}
                </>
              )}
            />
            <Label htmlFor='name' className='text-right text-[#FFCC15]'>
              Yangi Parol
            </Label>
            <Controller
              name='newPassword'
              control={form.control}
              rules={{ required: 'Yangi Parolni kiriting!' }}
              render={({ field }) => (
                <>
                  <Input
                    type={showPasswordtwo ? 'text' : 'password'}
                    onChange={field.onChange}
                    value={field.value}
                    id='name'
                    className={`placeholder:text-[#1C2C57] bg-white rounded-lg border border-[#ffcb15] ${
                      form.formState.errors.newPassword ? 'border-red' : ''
                    }`}
                    placeholder='Yangi Parolni kiriting'
                  />
                  <button
                    type='button'
                    className='absolute -mt-[30px] right-5 text-gray-500'
                    onClick={() => setShowPasswordTwo((prev) => !prev)}
                  >
                    {showPasswordtwo ? (
                      <IoIosEyeOff className='w-6 h-6' />
                    ) : (
                      <IoIosEye className='w-6 h-6' />
                    )}
                  </button>
                  {form.formState.errors.newPassword && (
                    <p className='text-red text-sm mt-1 text-red-500'>
                      {form.formState.errors.newPassword.message as string}
                    </p>
                  )}
                </>
              )}
            />
            <Label htmlFor='name' className='text-right text-[#FFCC15]'>
              Parolni tasdiqlang
            </Label>
            <Controller
              name='confirmPassword'
              control={form.control}
              rules={{ required: 'Qayta kiriting!' }}
              render={({ field }) => (
                <>
                  <Input
                    type={showPasswordth ? 'text' : 'password'}
                    onChange={field.onChange}
                    value={field.value}
                    id='name'
                    className={`placeholder:text-[#1C2C57] bg-white rounded-lg border border-[#ffcb15] ${
                      form.formState.errors.confirmPassword ? 'border-red' : ''
                    }`}
                    placeholder='Qayta kiriting'
                  />
                  <button
                    type='button'
                    className='absolute -mt-[30px] right-5 text-gray-500'
                    onClick={() => setShowPasswordTh((prev) => !prev)}
                  >
                    {showPasswordth ? (
                      <IoIosEyeOff className='w-6 h-6' />
                    ) : (
                      <IoIosEye className='w-6 h-6' />
                    )}
                  </button>
                  {form.formState.errors.confirmPassword && (
                    <p className='text-red text-sm mt-1 text-red-500'>
                      {form.formState.errors.confirmPassword.message as string}
                    </p>
                  )}
                </>
              )}
            />
            <Button
              type='submit'
              disabled={isLoading}
              className='mt-6 w-full bg-[#ffcb15] text-[#1C2C57] hover:bg-[#ffcb15]'
            >
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
