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
import { ArrowLeft, Notifications } from '@/icons';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useLazyGetUserQuery, useGetPreDispatchQuery } from '@/app/api';
import { format } from 'date-fns';
import { BreadItem } from '../components/BreadItem';
export const EditPreOrder = () => {
  const { id } = useParams();
  const { data: preOrder } = useGetPreDispatchQuery({ id });
  const [getUser, { data: user }] = useLazyGetUserQuery();

  useEffect(() => {
    if (preOrder) {
      getUser(preOrder.fromStaff);
    }
  }, [preOrder]);

  const { control, reset } = useForm({
    defaultValues: {
      client: '',
      phone: '',
      address: '',
      commit: '',
      deliveryTime: '',
      fromStaff: '',
      paidAmount: 0,
    },
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  useEffect(() => {
    if (preOrder && user) {
      reset({
        client: preOrder.client.toString(),
        phone: preOrder.phone,
        address: preOrder.address,
        commit: preOrder.commit,
        deliveryTime: preOrder.deliveryTime
          ? format(new Date(preOrder.deliveryTime), "mm/dd/yyyy'T'HH:mm'Z'")
          : '',
        fromStaff: user.fullName,
        paidAmount: preOrder.paidAmount,
      });
    }
    console.log(preOrder);
  }, [preOrder,user]);

  const navigate = useNavigate();
  return (
    <div>
      <div className='border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[16px] pt-[20px] fixed top-0 w-full z-10'>
        <div className='flex w-[95%] m-auto items-center justify-between'>
          <Button
            onClick={() => navigate('/dashboard')}
            className='w-5 h-5 px-[3.33px] py-[5px] justify-center items-center bg-[#FFCC15] text-[#1B2B56] hover:text-white p-4 rounded-full'
          >
            <ArrowLeft className='text-2xl' />
          </Button>
          <h4 className='text-center text-white text-2xl font-semibold font-inter leading-[31.20px]'>
            Buyurtma
          </h4>
          <button onClick={() => navigate('/notifications')}>
            <Notifications className='cursor-pointer text-[#FFCC15] w-6 h-6' />
          </button>
        </div>
      </div>
      {/* form */}
      <form className='my-[70px] p-[16px] space-y-3'>
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
                    {user && <SelectValue placeholder={user.fullName?.toString()} />}
                  </SelectTrigger>
                </Select>
              </>
            )}
          />
        </div>

        <div className='mb-2 space-y-2'>
          <Label className='text-yellow-400 text-base font-semibold leading-none'>
            Olingan pul
          </Label>
          <Controller
            name='paidAmount'
            control={control}
            rules={{ required: 'Olingan pul miqdorini kiriting' }}
            render={({ field }) => (
              <>
                <Input
                  {...field}
                  placeholder='Olingan pul miqdorini kiriting'
                  id='paidAmount'
                  type='number'
                  className=' w-full h-7 px-4 pt-4 pb-4 bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-yellow-40 mb-2'
                />
              </>
            )}
          />
        </div>
        <div className='space-y-3 pt-2 mb-5'>
          {preOrder?.breadsInfo &&
            // <BreadList breadPrices={breadPrice} setBreads={setBreads} />
            preOrder?.breadsInfo.map((bread) => (
              <BreadItem
                key={bread._id}
                name={bread.title}
                price={bread.breadSoldPrice}
                quantity={bread.amount}
              />
            ))}
        </div>
        {preOrder && (
          <div className='w-full relative bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-yellow-400 px-2 py-1 flex justify-between mb-4'>
            <h3 className='text-blue-950 text-base font-semibold'>
              {user?.fullName}
              <br />
              <span className='text-green-700 text-base font-semibold'>
                {preOrder.paidAmount}
              </span>
            </h3>
            <h3 className='text-blue-950 text-base font-semibold'>
              29.03.2025
              <br />
              10:30
            </h3>
          </div>
        )}
        <div className='flex justify-between'>
          <Button className='w-36 h-7 p-3 bg-red-700 hover:bg-white hover:text-blue-950 rounded-lg shadow-[0px_9px_28px_0px_rgba(0,0,0,0.05)]  gap-1'>
            O'chirish
          </Button>
          <Button className='w-36 h-7 p-3 bg-yellow-400 hover:bg-white rounded-lg shadow-[0px_9px_28px_0px_rgba(0,0,0,0.05)] shadow-[0px_3px_6px_0px_rgba(0,0,0,0.12)] shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] gap-1 text-[#1B2B56] font-bold'>
            Tahrirlash
          </Button>
        </div>
      </form>
    </div>
  );
};
