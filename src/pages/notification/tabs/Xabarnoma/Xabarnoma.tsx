import { useMeQuery } from '@/app/api';
import { useGetByUserIdQuery } from '@/app/api/notification/notification';
import { CalendarIcon, Clock } from 'lucide-react';

export const Xabarnoma = () => {
  const { data: me } = useMeQuery();

  const { data: info } = useGetByUserIdQuery(me?._id || '');
  console.log(info);
  const formatTime = (dateString: Date): string => {
    const date = new Date(dateString);

    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');

    return `${hours}:${minutes}`;
  };
  return (
    <div>
      {info && info.length ?
        info.map((item) => (
          <div
            key={item._id}
            className='rounded-[12px] mb-3 border-[2px] border-[#FFCC15] p-[10px]'
          >
            {item.body.split('#').map(item => <p className='text-[16px] font-[600] text-white'>{item}</p>)}
            <div className='flex items-center justify-between pt-[10px]'>
              <div className='flex items-center gap-x-1'>
                <CalendarIcon className='text-white !w-[18px]' />
                <p className='text-[12px] font-[400] text-white'>
                  {new Date(item.createdAt)?.toLocaleDateString()}
                </p>
              </div>
              <div className='flex items-center gap-x-1'>
                <Clock className='text-white !w-[18px]' />
                <p className='text-[12px] font-[400] text-white'>
                  {formatTime(item.createdAt)}
                </p>
              </div>
            </div>
          </div>
        )):(
          <p className='text-[16px] font-[600] text-white text-center'>Xabarnoma bo'sh</p>
        )
      }
    </div>
  );
};
