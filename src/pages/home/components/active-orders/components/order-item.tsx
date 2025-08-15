import { activeOrder } from '@/app/api/order/types';
import { PopoverAnchor } from '../..';
import React from 'react';
import { Delete } from '@/icons';

type Props = {
  item: activeOrder;
  getTimes: (date: Date | string) => string;
}

const Order_item = ({
  item,
  getTimes,
}: Props) => {
  const setClientName = (client: activeOrder['client']) => {
    if (typeof client === 'string') return client;
    return client.fullName;
  };

  const [open, setOpen] = React.useState(false);
  return (
    <div
      className={
        (!item.acceptedDriver
          ? 'bg-[#C71A1A]'
          : 'bg-white border border-yellow-400') +
        ' w-full h-10 rounded-lg   mt-10 justify-between flex items-center p-2'
      }
    >
      <h3
        className={
          (!item.acceptedDriver ? 'text-white' : 'text-green-700') +
          ' text-base font-bold leading-tight'
        }
      >
        {setClientName(item.client)}
      </h3>
      <div className='flex items-center gap-2'>
        <div className='w-20 h-7 bg-gray-200 rounded-[10px] flex justify-center items-center'>
          <h3>{getTimes(item.updatedAt.toString())}</h3>
        </div>
        <PopoverAnchor
          title={setClientName(item.client)}
          open={open}
          id={item._id}
          setOpen={setOpen}
        >
          <div className='flex items-center gap-2 cursor-pointer'>
            <Delete />
            <h3 className='text-red-500 text-sm font-semibold'>O'chirish</h3>
          </div>
        </PopoverAnchor>
      </div>
    </div>
  );
};

export default Order_item;
