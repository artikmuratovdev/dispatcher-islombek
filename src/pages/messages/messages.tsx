import { useGetChatsQuery } from '@/app/api';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  BottomSheet,
  Button,
} from '@/components';
import { AddPerson as AddPersonIcons } from '@/icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AddPerson } from './components';

export const Messages = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { data: chats } = useGetChatsQuery();
  return (
    <div>
      <div className='border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[12px] pt-[20px] fixed top-0 w-full'>
        <div className='flex w-[95%] m-auto justify-center items-center'>
          <h3 className='mr-[35px] text-center w-full text-white text-2xl font-semibold font-inter leading-[31.20px]'>
            Message
          </h3>
        </div>
      </div>
      <div className='mt-[70px] p-5'>
        <div className='flex flex-col gap-y-[27px]'>
          {chats?.map((item) => (
            <div
              onClick={() => navigate(`/chat/${item.chat._id}`)}
              key={item.chat._id}
              className='bg-white rounded-lg p-1'
            >
              <div className='flex gap-x-[10px] items-center'>
                <Avatar className='rounded-lg'>
                  <AvatarImage src={item.chat.avatar} alt='Avatar' />
                  <AvatarFallback>
                    {item.chat.fullName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className='flex flex-col gap-y-1 items-start'>
                  <h4 className='text-center text-[#1b2b56] text-sm font-black font-inter leading-[18.20px]'>
                    {item.chat.fullName}
                  </h4>
                  <h5 className="text-center text-[#1b2b56] text-xs font-semibold font-['Inter'] leading-none">
                    {item.lastMessage}
                  </h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Button
        onClick={() => setOpen(true)}
        className='fixed bottom-[104px] right-5 h-10 p-3 bg-[#ffcb15] text-3xl rounded-full justify-center items-center gap-1 inline-flex text-[#1C2C57] hover:bg-[#ffcb15]'
      >
        <AddPersonIcons />
      </Button>
      <BottomSheet children={<AddPerson />} open={open} setOpen={setOpen} />
    </div>
  );
};
