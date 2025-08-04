import { useGetPreDispatchQuery, useLazyGetUserQuery } from '@/app/api';
import {
  Button,
  Input,
  Select,
  SelectTrigger,
  SelectValue,
} from '@/components';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Notification } from '@/icons';
import { format, isValid, parse } from 'date-fns';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { DeletePopover } from '../../DeletePopover';
import { BreadItem } from '../components/BreadItem';
export const ShowPreOrder = () => {
  const { id } = useParams<{ id: string }>();
  const { data: preOrder, refetch } = useGetPreDispatchQuery({ id: id ?? '' });
  const [getUser, { data: user }] = useLazyGetUserQuery();

  const { control, reset } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  useEffect(() => {
    if (preOrder?.fromStaff) {
      getUser(preOrder.fromStaff);
      refetch();
    }
  }, [preOrder, getUser]);

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
        client: preOrder.client ? String(preOrder.client) : '',
        phone: preOrder.phone || '',
        address: preOrder.address as { lat: number; lng: number } || '',
        commit: preOrder.commit || '',
        deliveryTime,
        fromStaff: user ? user.fullName : '',
        paidAmount: preOrder.paidAmount || 0,
      });
    }
  }, [preOrder, user, reset]);

  const parsedDate: Date | null = (() => {
    if (!preOrder?.deliveryTime) return null;

    const iso = new Date(preOrder.deliveryTime);
    if (isValid(iso)) return iso;

    const fallback = parse(
      preOrder.deliveryTime,
      'dd.MM.yyyy HH:mm',
      new Date()
    );
    return isValid(fallback) ? fallback : null;
  })();

  const [open, setOpen] = useState(false);
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
            <Notification className='cursor-pointer text-[#FFCC15] w-6 h-6' />
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
                    {user && (
                      <SelectValue placeholder={user.fullName?.toString()} />
                    )}
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
            preOrder?.breadsInfo.map((bread) => (
              <BreadItem
                key={bread._id}
                name={bread.title}
                price={bread.breadSoldPrice}
                quantity={bread.amount}
              />
            ))}
          {preOrder?.breadsInfo && (
            <div className='mt-4 text-white text-2xl font-semibold'>
              Umumiy: {preOrder.totalAmount.toLocaleString('uz-UZ')} so'm
            </div>
          )}
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
              {parsedDate && (
                <>
                  {format(parsedDate, 'dd.MM.yyyy')}
                  <br />
                  {format(parsedDate, 'HH:mm')}
                </>
              )}
            </h3>
          </div>
        )}
        <div className='flex justify-between'>
          {preOrder && (
            <DeletePopover
              title={preOrder.client.toString()}
              id={preOrder._id}
              setOpenTag={setOpen}
              trigger={
                <Button className='w-36 h-7 p-3 bg-red-700 hover:bg-white hover:text-blue-950 rounded-lg shadow-[0px_9px_28px_0px_rgba(0,0,0,0.05)]  gap-1'>
                  O'chirish
                </Button>
              }
            />
          )}
          <Button
            type='button'
            onClick={() => {
              if (preOrder) navigate(`/orders/pre-order/${preOrder._id}/edit`);
            }}
            className='w-36 h-7 p-3 bg-yellow-400 hover:bg-white rounded-lg shadow-[0px_9px_28px_0px_rgba(0,0,0,0.05)] shadow-[0px_3px_6px_0px_rgba(0,0,0,0.12)] shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] gap-1 text-[#1B2B56] font-bold'
          >
            Tahrirlash
          </Button>
        </div>
      </form>
    </div>
  );
};
