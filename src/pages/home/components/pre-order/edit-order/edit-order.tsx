import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Notification } from '@/icons';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  useGetAllUsersQuery,
  useGetPreDispatchQuery,
  useLazyGetUserQuery,
  useUpdatePreOrdersMutation,
} from '@/app/api';
import BreadList from '../../active-orders/components/new-order/components/BreadList';
import { breadInfo } from '@/app/api/order/types';
import { format, isValid, parse } from 'date-fns';
import { Role } from '@/constants';
import toast from 'react-hot-toast';

export const EditPreOrder = () => {
  const { id } = useParams<{ id: string }>();
  const { data: preOrder } = useGetPreDispatchQuery({ id });
  const [getUser, { data: user }] = useLazyGetUserQuery();
  const [updatePreOrder] = useUpdatePreOrdersMutation();
  console.log(id);
  useEffect(() => {
    if (preOrder) {
      getUser(preOrder.fromStaff);
    }
  }, [preOrder]);

  const { data: users } = useGetAllUsersQuery({
    roles: [
      Role.CEO,
      Role.ADMIN,
      Role.BAKER,
      Role.DRIVER,
      Role.DIVIDER,
      Role.DOUGHMAKER,
      Role.DISPATCHER,
    ],
  });

  const {
    control,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  useEffect(() => {
    if (preOrder && user) {
      let deliveryTime = '';

      if (preOrder.deliveryTime) {
        const isoParsed = new Date(preOrder.deliveryTime);
        const fallbackParsed = parse(
          preOrder.deliveryTime,
          'dd.MM.yyyy HH:mm',
          new Date()
        );

        if (isValid(isoParsed)) {
          deliveryTime = format(isoParsed, "yyyy-MM-dd'T'HH:mm");
        } else if (isValid(fallbackParsed)) {
          deliveryTime = format(fallbackParsed, "yyyy-MM-dd'T'HH:mm");
        }
      }
      reset({
        client: preOrder.client.toString(),
        phone: preOrder.phone,
        address: preOrder.address,
        commit: preOrder.commit,
        deliveryTime,
        fromStaff: user._id,
        paidAmount: preOrder.paidAmount,
      });
    }
    console.log(preOrder);
  }, [preOrder, user, users]);

  const [breads, setBreads] = useState<breadInfo[]>([]);

  const onSubmit = async (data: any) => {
    data.breadsInfo = breads;
    data.deliveryTime = format(new Date(data.deliveryTime), 'dd.MM.yyyy HH:mm');
    data._id = id;
    console.log(data);
    if (data.phone.startsWith('+998') || data.phone.startsWith('998')) {
      data.phone = data.phone.replace(/\D/g, '').slice(-9);
    } else {
      data.phone = data.phone.replace(/\D/g, '').trim();
    }

    if (data.phone.length !== 9) {
      toast.error('Telefon raqamni to`g`ri kiriting');
      return;
    }

    const { message } = await updatePreOrder(data).unwrap();
    if (message) {
      toast.success(message);
      navigate('/dashboard');
    }
  };

  const navigate = useNavigate();
  return (
    <div>
      <div className='border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[16px] pt-[20px] fixed top-0 w-full z-10'>
        <div className='flex w-[95%] m-auto items-center justify-between'>
          <Button
            onClick={() => navigate(-1)}
            className='w-5 h-5 px-[3.33px] py-[5px] justify-center items-center bg-[#FFCC15] text-[#1B2B56] hover:text-white p-4 rounded-full'
          >
            <ArrowLeft className='text-2xl' />
          </Button>
          <h4 className='text-center text-white text-2xl font-semibold font-inter leading-[31.20px]'>
            Buyurtmani tahrirlash
          </h4>
          <button onClick={() => navigate('/notifications')}>
            <Notification className='cursor-pointer text-[#FFCC15] w-6 h-6' />
          </button>
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='my-[70px] p-[16px] space-y-3'
      >
        <div className='mb-2 space-y-2'>
          <Label className='text-yellow-400 text-base font-semibold leading-none'>
            Mijoz
          </Label>
          <Controller
            name='client'
            control={control}
            rules={{ required: 'Mijozni kiriting' }}
            render={({ field }) => (
              <>
                <Input
                  {...field}
                  placeholder='Mijozni kiriting'
                  id='client'
                  type='text'
                  className=' text-blue-950 bg-white'
                />
                {errors.client && (
                  <p className='text-red-600 font-semibold text-base'>
                    {errors.client.message?.toString()}
                  </p>
                )}
              </>
            )}
          />
        </div>
        <div className='mb-2 space-y-2'>
          <Label className='text-yellow-400 text-base font-semibold leading-none'>
            Telefon
          </Label>
          <Controller
            name='phone'
            control={control}
            rules={{ required: 'Telefonni kiriting' }}
            render={({ field }) => (
              <>
                <Input
                  {...field}
                  placeholder='Telefonni kiriting'
                  id='phone'
                  type='tel'
                  className=' text-blue-950 bg-white'
                />
                {errors.phone && (
                  <p className='text-red-600 font-semibold text-base'>
                    {errors?.phone?.message?.toString()}
                  </p>
                )}
              </>
            )}
          />
        </div>
        <div className='mb-2 space-y-2'>
          <Label className='text-yellow-400 text-base font-semibold leading-none'>
            Manzil
          </Label>
          <Controller
            name='address'
            control={control}
            rules={{ required: 'Manzilni kiriting' }}
            render={({ field }) => (
              <>
                <Input
                  {...field}
                  placeholder='Manzilni kiriting'
                  id='address'
                  type='text'
                  className=' text-blue-950 bg-white'
                />
                {errors.address && (
                  <p className='text-red-600 font-semibold text-base'>
                    {errors?.address?.message?.toString()}
                  </p>
                )}
              </>
            )}
          />
        </div>
        <div className='mb-2 space-y-2'>
          <Label className='text-yellow-400 text-base font-semibold leading-none'>
            Izoh
          </Label>
          <Controller
            name='commit'
            control={control}
            rules={{ required: 'Izohni kiriting' }}
            render={({ field }) => (
              <>
                <Input
                  {...field}
                  placeholder='Izohni kiriting'
                  id='commit'
                  type='text'
                  className=' text-blue-950 bg-white'
                />
                {errors.commit && (
                  <p className='text-red-600 font-semibold text-base'>
                    {errors?.commit?.message?.toString()}
                  </p>
                )}
              </>
            )}
          />
        </div>
        <div className='mb-2 space-y-2'>
          <Label className='text-yellow-400 text-base font-semibold leading-none'>
            Topshirish vaqti
          </Label>
          <Controller
            name='deliveryTime'
            control={control}
            rules={{ required: 'Topshirish vaqtini kiriting' }}
            render={({ field }) => (
              <>
                <Input
                  {...field}
                  id='deliveryTime'
                  type='datetime-local'
                  className=' w-full h-7 px-4 pt-4 pb-4 bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-yellow-40 mb-2'
                />
                {errors.deliveryTime && (
                  <p className='text-red-600 font-semibold text-base'>
                    {errors?.deliveryTime?.message?.toString()}
                  </p>
                )}
              </>
            )}
          />
        </div>
        <div className='mb-2 space-y-2'>
          <Label className='text-yellow-400 text-base font-semibold leading-none'>
            Olgan xodim
          </Label>
          <Controller
            name='fromStaff'
            control={control}
            rules={{ required: 'Xodimni kiriting' }}
            render={({ field }) => (
              <>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className='w-full bg-white font-semibold'>
                    <SelectValue placeholder='Xodimni tanlang' />
                  </SelectTrigger>
                  <SelectContent>
                    {users?.map((driver) => (
                      <SelectItem key={driver._id} value={driver._id}>
                        {driver.role} ---- {driver.fullName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {errors.fromStaff && (
                  <p className='text-red-600 font-semibold text-base'>
                    {errors?.fromStaff?.message?.toString()}
                  </p>
                )}
              </>
            )}
          />
        </div>
        <div className='space-y-3 pt-2 mb-5'>
          {preOrder?.breadsInfo && (
            <BreadList
              breadPrices={preOrder.breadsInfo}
              setBreads={setBreads}
            />
          )}
        </div>
        <div className='flex justify-end mb-5'>
          <Button className='w-36 h-8 p-3 bg-[#FFCC15] text-[#1B2B56] hover:bg-[#FFCC15]'>
            Saqlash
          </Button>
        </div>
      </form>
    </div>
  );
};
