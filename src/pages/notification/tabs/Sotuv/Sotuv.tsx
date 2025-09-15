import { useSaleNotificationEditMutation, useSaleNotificationQuery } from '@/app/api';
import { CalendarIcon } from 'lucide-react';
import { Clock } from '@/icons';
import { Button } from '@/components';
import { useState, useEffect } from 'react';
import { useHandleRequest } from '@/hooks';
import toast from 'react-hot-toast';

export const Sotuv = () => {
  const { data } = useSaleNotificationQuery('');
  const [editNotification] = useSaleNotificationEditMutation()
  const [openStates, setOpenStates] = useState<boolean[]>([]);

  useEffect(() => {
    if (data) setOpenStates(Array(data.length).fill(false));
  }, [data]);

  const toggleOpen = (idx: number) =>
    setOpenStates((prev) =>
      prev.map((isOpen, i) => (i === idx ? !isOpen : false))
    );

  const getTime = (date: Date | string) => {
    const d = new Date(date);
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return [`${day}.${month}.${year}`, `${hours}:${minutes}`];
  };

  if (!data || data.length === 0) {
    return (
      <p className='text-[16px] font-[600] text-white text-center'>
        Sotuv bo'sh
      </p>
    );
  }

  const handleRequest = useHandleRequest();

  const accepted = async (id: string) => {
    await handleRequest({
      request: async () => {
        const result = await editNotification(id+'/accepted').unwrap();
        return result;
      },
      onSuccess: (data) => {
        toast.success(data.message);
        console.log(data.message)
      },
      onError: (error) => {
        toast.error(error.data.message);
        console.log(error.data.message)
      },
    })
  }

  const rejected = async (id:string) => {
    await handleRequest({
      request: async () => {
        const result = await editNotification(id+'/rejected').unwrap();
        return result;
      },
      onSuccess: (data) => {
        toast.success(data.message);
        console.log(data.message)
      },
      onError: (error) => {
        toast.error(error.data.message);
        console.log(error.data.message)
      },
    })
  }

  return (
    <div>
      {data.map((item, idx) => (
        <div
          key={idx}
          onClick={() => toggleOpen(idx)}
          className={`rounded-[12px] overflow-hidden mb-3 border-[2px] border-[#FFCC15] p-[10px] cursor-pointer transition-all duration-300 linear ${
            openStates[idx] ? 'max-h-[500px]' : 'max-h-20'
          }`}
        >
          <p className='text-[16px] font-[600] text-white'>{item.title}</p>
          <div className='flex items-center justify-between pt-[10px]'>
            <div className='flex items-center gap-x-1'>
              <CalendarIcon className='text-white !w-[18px]' />
              <p className='text-[11px] font-[400] text-white'>
                {getTime(item.updatedAt)[0]}
              </p>
            </div>
            <div className='flex items-center gap-x-1'>
              <Clock className='text-white w-[18px]' />
              <p className='text-[12px] font-[400] text-white'>
                {getTime(item.updatedAt)[1]}
              </p>
            </div>
          </div>

          <p className='text-[16px] font-[600] my-3 text-white'>{item.body}</p>
          <div className='mt-5 flex justify-between'>
            <Button className='px-10 bg-red-500 text-lg hover:bg-white hover:text-red-500' onClick={() => rejected(item._id)}>
              Reject
            </Button>
            <Button className='px-10 bg-green-500 text-lg hover:bg-white hover:text-green-500' onClick={() => accepted(item._id)}>
              Accept
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
