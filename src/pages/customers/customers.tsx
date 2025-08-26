import { useGetClientsQuery } from '@/app/api';
import { Input } from '@/components';
import { Notification } from '@/icons';
import { XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Customers = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const { data, refetch } = useGetClientsQuery({ client: search });

  useEffect(() => {
    refetch();
  }, [search]);

  const setNumber = (number: string) => {
    if (number.startsWith('+998') || number.startsWith('998')) {
      return (
        number.slice(4, 6) +
        ' ' +
        number.slice(6, 9) +
        ' ' +
        number.slice(9, 11) +
        ' ' +
        number.slice(11)
      );
    }
    if(number.length === 9){
      return (
        number.slice(0, 2) +
        ' ' +
        number.slice(2, 5) +
        ' ' +
        number.slice(5, 7) +
        ' ' +
        number.slice(7, 9)
      );
    }
  };

  const handleSubmit = (data: any) => {
    const params = new URLSearchParams();
    if (data.fullName) params.set('name', data.fullName);
    if (data.phone) params.set('number', data.phone.toString());

    navigate('customer-details/' + data._id + `?${params.toString()}`);
  };

  return (
    <div>
      <div className='border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[16px] pt-[20px] fixed top-0 w-full z-10'>
        <div className='flex w-[95%] m-auto items-center justify-between'>
          <div className='w-7'></div>
          <h4 className='text-center justify-center text-white text-2xl font-semibold leading-loose'>
            Mijozlar
          </h4>
          <button onClick={() => navigate('/notifications')}>
            <Notification className='cursor-pointer text-[#FFCC15] w-6 h-6' />
          </button>
        </div>
      </div>
      <div className='my-[120px] m-auto p-[12px] space-y-5'>
        <div className='relative w-full'>
          <Input
            type='text'
            placeholder='Search...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='w-full pl-4 pr-10 py-2 bg-white border border-gray-300 
            z-10 rounded-md shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400'
          />
          {search && (
            <XCircle
              onClick={() => setSearch('')}
              className='w-5 h-5 text-gray-500 hover:text-red-500 cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2'
            />
          )}
        </div>
        {data?.clients &&
          data.clients.map((client) => (
            <div
              key={client._id}
              className='w-full h-10 bg-white rounded-lg border border-yellow-400 flex justify-between items-center p-4'
              onClick={() => handleSubmit(client)}
            >
              <h1
                className={
                  (client.hasOrder ? 'text-green-700' : 'text-red-700') +
                  '  text-base font-bold leading-tight'
                }
              >
                {client.fullName}
              </h1>
              <h3 className='bg-gray-200 rounded-[10px] w-32 h-7 flex justify-center items-center'>
                {client.phone && setNumber(client.phone)}
              </h3>
            </div>
          ))}
      </div>
    </div>
  );
};
