import { useGetUserQuery, useGetActiveDispatchQuery } from '@/app/api';
import { activeOrder as ActiveOrderType } from '@/app/api/order/types';
import { Button, OrderCard } from '@/components';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Notification } from '@/icons';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const Order = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data } = useGetActiveDispatchQuery({ id }, { skip: !id });

  const getTime = (date: string | Date) => {
    return new Date(date).toLocaleTimeString('uz-UZ', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  const [orderData, setOrderData] = React.useState<ActiveOrderType | null>(
    null
  );
  useEffect(() => {
    if (data) {
      setOrderData(data);
    }
  });

  console.log(orderData);

  // useEffect(() => {
  //   if (id) {
  //     getUser(id).then((res) => {
  //       if (res) {
  //         setOrderData(res);
  //       }
  //     });

  // reset({
  //       mijoz:
  //         typeof data.client === 'string' ? data.client : data.client.fullName,
  //       telifon: data.phone,
  //       manzil:
  //         typeof data.address === 'string' ? data.address : data.address.lat,
  //       izoh: data.commit || '',
  //     });
  //   }
  // }, [id]);

  const { data: Driver } = useGetUserQuery(
    orderData?.acceptedDriver._id as string,
    { skip: !orderData?.acceptedDriver._id }
  );

  return (
    <form>
      {orderData && (
        <>
          {/* Header */}
          <div className='border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[16px] pt-[20px] fixed top-0 w-full z-10'>
            <div className='flex w-[95%] m-auto items-center justify-between'>
              <Button
                type='button'
                onClick={() =>
                  navigate('/dashboard', { state: { activeTab: 0 } })
                }
                className='w-5 h-5 px-[3.33px] py-[5px] justify-center items-center bg-[#FFCC15] text-[#1B2B56] hover:bg-[#FFCC15] p-4 rounded-full'
              >
                <ArrowLeft className='text-2xl' />
              </Button>
              <h4 className='text-center text-white text-2xl font-semibold font-inter leading-[31.20px]'>
                Buyurtma
              </h4>
              <button type='button' onClick={() => navigate('/notifications')}>
                <Notification className='cursor-pointer text-[#FFCC15] w-6 h-6' />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className='my-[80px] p-[16px]'>
            <Card className='border-2 border-[#FFCC15] rounded-lg h-11 mb-3'>
              <CardContent className='w-full'>
                <div className='flex justify-between items-center'>
                  <h3 className='text-blue-950 text-sm font-bold mt-[11px]'>
                    Buyurtma vaqti
                  </h3>
                  <h4 className='text-blue-950 text-sm font-bold mt-[11px]'>
                    {getTime(orderData.createdAt)}
                  </h4>
                </div>
              </CardContent>
            </Card>

            {orderData.acceptedDriver && (
              <Card className='border-2 border-[#FFCC15] rounded-lg h-11 mb-3'>
                <CardContent className='w-full'>
                  <div className='flex justify-between items-center'>
                    <h3 className='text-blue-950 text-sm font-bold mt-[11px]'>
                      {Driver?.fullName}
                    </h3>
                    {orderData.acceptedTimeDriver && (
                      <h4 className='text-blue-950 text-sm font-bold mt-[11px]'>
                        {getTime(orderData.acceptedTimeDriver)}
                      </h4>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Form fields */}
            <div className='flex flex-col gap-y-1 mb-3'>
              <Label className='text-yellow-400 text-base font-semibold'>
                Mijoz
              </Label>
              <span className='bg-white border border-[#FFCC15] rounded-lg px-3 py-1.5 font-light'>
                {typeof (orderData.client) === 'string' ? orderData.client : orderData.client.fullName}
              </span>
            </div>

            <div className='flex flex-col gap-y-1 mb-3'>
              <Label className='text-yellow-400 text-base font-semibold'>
                Telefon
              </Label>
              <span className='bg-white border border-[#FFCC15] rounded-lg px-3 py-1.5 font-light'>
                {orderData.phone}
              </span>
            </div>

            <div className='flex flex-col gap-y-1 mb-3'>
              <Label className='text-yellow-400 text-base font-semibold'>
                Manzili
              </Label>
              <span className='bg-white border border-[#FFCC15] rounded-lg px-3 py-1.5 font-light'>
                {typeof orderData.address === 'string' ? orderData.address : orderData.address.lat}
              </span>
            </div>

            <div className='flex flex-col gap-y-1 mb-3'>
              <Label className='text-yellow-400 text-base font-semibold'>
                Izoh
              </Label>
              <span className='bg-white border border-[#FFCC15] rounded-lg px-3 py-1.5 font-light'>
                {orderData.commit}
              </span>
            </div>

            {/* Bread items */}
            <div className='space-y-3 pt-2 mb-3'>
              {orderData.breadsInfo.map((item) => (
                <OrderCard key={item._id} item={item} />
              ))}
            </div>
            <h1 className="text-white text-2xl font-semibold font-['Inter'] leading-none">
              Umumiy summa:{' '}
              {new Intl.NumberFormat('uz-UZ').format(orderData.totalAmount)}{' '}
              so'm
            </h1>
          </div>
        </>
      )}
    </form>
  );
};
