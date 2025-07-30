import { useGetActiveDispatchesQuery } from '@/app/api';
import Order_item from './components/order-item';
import { useEffect, useState } from 'react';
import { Button } from '@/components';
import { Plus } from '@/icons';
import { useNavigate } from 'react-router-dom';

export const ActiveOrders = () => {
  const { data: activeOrders , refetch} =
    useGetActiveDispatchesQuery();
  const [currentTime, setCurrentTime] = useState(Date.now());
  const navigate = useNavigate();

  useEffect(() => {
    refetch()
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, [activeOrders]);

  const getTimes = (date: Date | string) => {
    const past = new Date(date).getTime();
    const diffMs = currentTime - past;

    const minutes = Math.floor(diffMs / 60000);
    const seconds = Math.floor((diffMs % 60000) / 1000);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
      2,
      '0'
    )}`;
  };

  return (
    <>
      <div className='space-y-3 mb-16'>
        {activeOrders &&
          activeOrders.orders.map((item) => (
            <Order_item key={item._id} item={item} getTimes={getTimes} />
          ))}
        <Button
          className='fixed bottom-[104px] right-5 h-10 p-3 bg-[#ffcb15] text-3xl rounded-full justify-center items-center gap-1 inline-flex text-[#1C2C57] hover:bg-[#ffcb15]'
          onClick={() => navigate('/orders/new-order')}
        >
          <Plus />
        </Button>
      </div>
    </>
  );
};
