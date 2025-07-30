import { useGetPreDispatchesQuery } from '@/app/api';
import { Button } from '@/components';
import { Plus } from '@/icons';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const PreOrder = () => {
  const navigate = useNavigate();
  const { data: preOrders , refetch} =
    useGetPreDispatchesQuery();

  const getTime = (date: string) => {
    const d = new Date(date);
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}.${month}.${year} ${hours}:${minutes}`;
  }

  useEffect(() => {
    refetch();
  },[preOrders])
  return (
    <div className='space-y-3'>
        {preOrders && preOrders.map((order) => (
      <div key={order._id}
        className='w-full h-10 bg-white rounded-lg border border-yellow-400 p-2'
        onClick={() => navigate(`/orders/pre-order/${order._id}`)}
      >
          <div className='flex items-center justify-between'>
          <h1 className='text-blue-950 text-base font-bold leading-tight'>
            {order.client.toString()}
          </h1>
          <h3 className='text-blue-950 text-base font-semibold'>
            {getTime(order.updatedAt.toString())}
          </h3>
        </div>
      </div>
        ))}
      <Button
        className='fixed bottom-[104px] right-5 h-10 p-3 bg-[#ffcb15] text-3xl rounded-full justify-center items-center gap-1 inline-flex text-[#1C2C57] hover:bg-[#ffcb15]'
        onClick={() => navigate('/orders/new-pre-order')}
      >
        <Plus />
      </Button>
    </div>
  );
};
