
import { useGetAllUsersQuery } from '@/app/api';
import { Button } from '@/components';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Role } from '@/constants';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AddPerson = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const {data} = useGetAllUsersQuery({roles: [Role.ADMIN, Role.CEO, Role.BAKER, Role.DISPATCHER, Role.DIVIDER, Role.DOUGHMAKER, Role.DRIVER, Role.SUPPLIER]});

  return (
    <div className='h-[200px]'>
      <Select onValueChange={(value) => setUserId(value)}>
        <SelectTrigger className='h-[42px] bg-white text-ellipsis rounded-lg border-2 border-[#ffcb15] text-[#1b2b56] text-base font-semibold font-inter mt-[50px]'>
          <SelectValue placeholder='Xodimni tanlang' />
        </SelectTrigger>
        <SelectContent className='bg-white rounded-lg border border-[#ffcb15] mt-[9px]'>
          {data?.map((item) => (
            <SelectItem
              key={item._id}
              value={item._id as string}
              className='text-[#1b2b56] text-base font-semibold font-inter bg-white rounded-lg border border-[#ffcb15] mt-[9px] flex items-center gap-x-12'
            >
              {item.fullName}
            </SelectItem>
          ))}
        </SelectContent>
        <div className='flex justify-end mt-[35px]'>
          <Button
            className='py-[3px] bg-[#ffcb15] rounded-lg text-[#1b2b56] hover:bg-[#ffcb15] justify-center items-center'
            onClick={() => userId && navigate(`/chat/${userId}`)}
          >
            Kiritish
          </Button>
        </div>
      </Select>
    </div>
  );
};
