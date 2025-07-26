import {
  useGetMessagesQuery,
  useGetOneUserQuery,
  useMessageMutation,
} from '@/app/api';
import { Button, Input } from '@/components';
import { socket } from '@/utils';
import { useEffect, useState } from 'react';
import { IoMdArrowBack } from 'react-icons/io';
import { Link, useParams } from 'react-router-dom';

export const Chat = () => {
  const { id } = useParams();
  const { data: user, isError } = useGetOneUserQuery(id);
  const { data: messages, refetch } = useGetMessagesQuery(id as string);
  const [sendMessage, { isLoading }] = useMessageMutation();
  const [message, setMessage] = useState('');

  if (isError) {
    location.replace('/messages');
    return;
  }

  useEffect(() => {
    socket.on('message', (data) => {
      if (data.to === id || data.from === id) {
        refetch();
      }
    });
    return () => {
      socket.off('message');
    };
  }, [id, refetch]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    try {
      const newMessage = await sendMessage({
        content: message,
        to: id as string,
      }).unwrap();
      socket.emit('message', newMessage);
      setMessage('');
      refetch();
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };
  const dates: { [x: string]: true | undefined } = {};

  return (
    <div>
      <div className='border-b-2 border-[#FFCC15] bg-[#1C2C57] p-4 fixed top-0 w-full flex items-center gap-4 rounded-bl-[30px] rounded-br-[30px]'>
        <Link to='/messages'>
          <IoMdArrowBack
            size={25}
            className='bg-[#FFCC15] text-[#1C2C57] rounded-full p-1 cursor-pointer'
          />
        </Link>
        {user?.avatar && (
          <img
            src={user.avatar}
            alt='avatar'
            className='rounded-full w-10 h-10'
          />
        )}
        <span className='text-white font-bold'>
          {user?.fullName || 'Loading...'}
        </span>
      </div>

      <div className='pb-20 pt-16 px-4 flex flex-col gap-4 mt-[29px]'>
        {messages?.map(
          (msg, index) => (
            (msg = messages[messages.length - index - 1]),
            (
              <div key={msg._id}>
                {msg.createdAt &&
                  !dates[msg.createdAt.slice(0, 10)] &&
                  ((dates[msg.createdAt.slice(0, 10)] = true),
                  (
                    <div
                      className='text-center text-white text-sm text-[12px] font-semibold my-2'
                      key={index}
                    >
                      {msg.createdAt.slice(0, 10)}
                    </div>
                  ))}
                <div
                  className={`w-[70%] p-3 rounded-t-[10px] mt-[10px] ${
                    msg.from === id
                      ? 'rounded-br-[10px] bg-white text-[#1C2C57]'
                      : 'ml-auto rounded-bl-[10px] bg-[#9191ED] text-white'
                  }`}
                >
                  <p className='text-[15px] font-[400]'>{msg.content}</p>
                  <p className='text-[12px] font-[400] text-end'>
                    {' '}
                    {msg.createdAt?.toString().slice(0, 10)}
                  </p>
                </div>
              </div>
            )
          )
        )}
      </div>
      <div className='flex items-center gap-x-2 fixed bottom-0 w-full p-2 bg-black'>
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className='flex-1 rounded-full border border-white bg-[#000] text-white pl-4'
          placeholder='Type a message...'
        />
        <Button
          onClick={handleSendMessage}
          className='bg-[#527AFF] rounded-[8px] py-[10px] px-[20px] font-[700] text-white hover:bg-[#527AFF]'
          disabled={isLoading}
        >
          {isLoading ? 'Sending...' : 'Send'}
        </Button>
      </div>
    </div>
  );
};
