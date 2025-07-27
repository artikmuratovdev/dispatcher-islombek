import { useLazyGetActiveDispatchQuery } from '@/app/api/_order';
import { activeOrder } from '@/app/api/_order/types';
import { Button, Input, OrderCard } from '@/components';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Notifications } from '@/icons';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const Order = () => {
  const navigate = useNavigate();
  const [getActiveDispatch, { data: activeOrder }] =
    useLazyGetActiveDispatchQuery();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      getActiveDispatch({ id }).unwrap();
    }
  }, [id, getActiveDispatch]);

  const getTime = (date: Date | string) => {
    const minutes = new Date(date).getHours();
    const seconds = new Date(date).getMinutes();

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2,'0')}`;
  };

  const setClientName = (client: activeOrder['client']) => {
    if (typeof client === 'string') return client;
    return client.fullName;
  }

  return (
    <div>
      {activeOrder && (
        <>
          <div className='border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[16px] pt-[20px] fixed top-0 w-full z-10'>
            <div className='flex w-[95%] m-auto items-center justify-between'>
              <Button
                onClick={() => navigate('/dashboard')}
                className='w-5 h-5 px-[3.33px] py-[5px] justify-center items-center bg-[#FFCC15] text-[#1B2B56] hover:bg-[#FFCC15] p-4 rounded-full'
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
          <div className='mt-[120px] p-[16px]'>
            <Card className='border-2 border-[#FFCC15] rounded-lg h-11 mb-3'>
              <CardContent className='w-full'>
                <div className='flex justify-between items-center'>
                  <h3 className='text-blue-950 text-sm font-bold mt-[11px]'>
                    Buyurtma vaqti
                  </h3>
                  <h4 className='text-blue-950 text-sm font-bold mt-[11px]'>
                    {getTime(activeOrder.createdAt)}
                  </h4>
                </div>
              </CardContent>
            </Card>
            
            {activeOrder.acceptedDriver && (
              <Card className='border-2 border-[#FFCC15] rounded-lg h-11 mb-3'>
              <CardContent className='w-full'>
                <div className='flex justify-between items-center'>
                  <h3 className='text-blue-950 text-sm font-bold mt-[11px]'>
                    {activeOrder.acceptedDriver.fullName}
                  </h3>
                  {activeOrder.acceptedTimeDriver && (
                    <h4 className='text-blue-950 text-sm font-bold mt-[11px]'>
                      {getTime(activeOrder.acceptedTimeDriver)}
                    </h4>
                  )}
                </div>
              </CardContent>
            </Card>
            )}
            <div className='flex flex-col gap-y-1 mb-3'>
              <Label className='text-yellow-400 text-base font-semibold'>
                Mijoz
              </Label>
              <Input
                placeholder='Boshqa'
                className='bg-white border border-[#FFCC15] rounded-lg'
                value={setClientName(activeOrder.client)}
                readOnly
              />
            </div>
            <div className='flex flex-col gap-y-1 mb-3'>
              <Label className='text-yellow-400 text-base font-semibold'>
                Telefon
              </Label>
              <Input
                placeholder='998991234567'
                className='bg-white border border-[#FFCC15] rounded-lg'
                type='number'
                value={activeOrder.phone}
                readOnly
              />
            </div>
            <div className='flex flex-col gap-y-1 mb-3'>
              <Label className='text-yellow-400 text-base font-semibold'>
                Manzili
              </Label>
              <Input
                placeholder='Begoyim'
                className='bg-white border border-[#FFCC15] rounded-lg'
                type='text'
                value={activeOrder.address}
                readOnly
              />
            </div>
            <div className='flex flex-col gap-y-1 mb-3'>
              <Label className='text-yellow-400 text-base font-semibold'>
                Izoh
              </Label>
              <Input
                placeholder='Izoh qoldiring'
                className='bg-white border border-[#FFCC15] rounded-lg'
                type='text'
                value={activeOrder.commit || ' '}
                readOnly
              />
            </div>
            <div className='space-y-3 pt-2 mb-3'>
              {activeOrder.breadsInfo.map((item) => (
                <OrderCard key={item._id} item={item} />
              ))}
            </div>
            <h1 className="text-white text-2xl font-semibold font-['Inter'] leading-none">
              Umumiy summa: {new Intl.NumberFormat('uz-UZ').format(activeOrder.totalAmount)} so'm
            </h1>
          </div>
        </>
      )}
    </div>
  );
};
