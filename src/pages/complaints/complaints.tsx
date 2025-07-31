import { BottomSheet, Button } from '@/components';
import { ArrowLeft, Plus } from '@/icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Arrived, Sent, SentMessage } from './components';
import { useGetReceivedComplaintsQuery, useMyComplaintsQuery } from '@/app/api/complaint/complaint';

export const Complaints = () => {
  const { data: complaints } = useGetReceivedComplaintsQuery();
  const { data: myComplaints } = useMyComplaintsQuery();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [accordionValue, setAccordionValue] = useState<string | undefined>(undefined);

  return (
    <div className='mb-20'>
      <div className='border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[12px] pt-[20px] fixed top-0 w-full z-10'>
        <div className='flex w-[95%] m-auto justify-between items-center'>
          <Button
            onClick={() => navigate('/dashboard')}
            className='w-5 h-5 px-[3.33px] py-[5px] justify-center items-center bg-[#FFCC15] text-[#1B2B56] p-4 hover:bg-[#FFCC15] rounded-full'
          >
            <ArrowLeft className='text-2xl' />
          </Button>
          <h3 className='text-center text-white text-2xl font-semibold font-inter leading-[31.20px]'>
            Shikoyatlar
          </h3>
          <div className='w-7'></div>
        </div>
      </div>

      <div className='mt-[65px] p-5'>
        <Arrived
          complaints={complaints || []}
          accordionValue={accordionValue}
          setAccordionValue={setAccordionValue}
        />
        <Sent
          data={myComplaints || []}
          accordionValue={accordionValue}
          setAccordionValue={setAccordionValue}
        />
      </div>

      <Button
        onClick={() => setOpen(true)}
        className='fixed bottom-[105px] right-5 h-10 p-3 bg-[#ffcb15] rounded-[20px] shadow-[0px_9px_28px_0px_rgba(0,0,0,0.05)] shadow-[0px_3px_6px_0px_rgba(0,0,0,0.12)] shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] justify-center items-center gap-1 inline-flex text-[#1C2C57] hover:bg-[#ffcb15]'
      >
        <Plus />
      </Button>

      <BottomSheet children={<SentMessage setOpen={setOpen} />} open={open} setOpen={setOpen} />
    </div>
  );
};
