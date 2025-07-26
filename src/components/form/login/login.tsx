import { useLoginMutation } from '@/app/api/authApi';
import { LoginResponse } from '@/app/api/authApi/types';
import { Input } from '@/components/ui';
import { useHandleRequest } from '@/hooks/use-handle-request/use-handle-reuqest';
import { useStorage } from '@/utils';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Toaster, toast } from 'react-hot-toast';
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';
import { LiaSpinnerSolid } from 'react-icons/lia';
import { Props } from './types';
import { useNavigate } from 'react-router-dom';

export const LoginForm: React.FC = () => {
  const form = useForm<Props>({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const [login, { isLoading }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  const handleRequest = useHandleRequest();
  const navigate = useNavigate();

  const onSubmit = async (formData: Props) => {
    await handleRequest({
      request: async () => {
        const result = await login({
          username: formData.username,
          password: formData.password,
        }).unwrap();
        return result;
      },
      onSuccess: (loginData: LoginResponse) => {
        useStorage.setCredentials({
          token: loginData?.token,
          user: loginData?.user,
        });
        toast.success('Tizimga muvaffaqiyatli kirdingiz!');
        form.reset();
        navigate('/dashboard');
      },
      onError: (error) => {
        toast.error(error?.data?.message || 'Xatolik');
      },
    });
  };

  return (
    <div className='flex items-center justify-center p-5'>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full max-w-md'>
        <div className='flex flex-col gap-y-[18px]'>
          {/* Username field */}
          <div>
            <Controller
              control={form.control}
              name='username'
              rules={{ required: 'Username is required' }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder='Username'
                  type='text'
                  disabled={isLoading}
                  className='w-full bg-white h-[42px] text-[#1b2b56] font-normal'
                />
              )}
            />
            <p className='text-red-500 ml-3 mt-1'>
              {form.formState.errors.username?.message}
            </p>
          </div>

          {/* Password field */}
          <div className='relative'>
            <Controller
              control={form.control}
              name='password'
              rules={{ required: 'Password is required' }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder='Password'
                  type={showPassword ? 'text' : 'password'}
                  disabled={isLoading}
                  className='w-full bg-white h-[42px] text-[#1b2b56] font-normal'
                />
              )}
            />
            <button
              type='button'
              onClick={() => setShowPassword((prev) => !prev)}
              className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500'
            >
              {showPassword ? (
                <IoIosEyeOff className='w-6 h-6' />
              ) : (
                <IoIosEye className='w-6 h-6' />
              )}
            </button>
            <p className='text-red-500 ml-3 mt-1'>
              {form.formState.errors.password?.message}
            </p>
          </div>
        </div>

        {/* Submit button */}
        <button
          type='submit'
          disabled={isLoading}
          className='w-full flex items-center justify-center bg-[#ffcb15] h-[60px] rounded-lg mt-5 text-[#1b2b56] text-[25px] font-bold'
        >
          {isLoading ? (
            <LiaSpinnerSolid className='animate-spin' size={40} />
          ) : (
            'Login'
          )}
        </button>
      </form>

      <Toaster />
    </div>
  );
};
