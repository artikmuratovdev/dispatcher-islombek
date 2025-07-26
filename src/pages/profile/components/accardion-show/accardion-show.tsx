import { useGetSalaryQuery } from '@/app/api';
import { useGetAllExpenceQuery } from '@/app/api/expence/expence';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ArrowDown } from '@/icons';
import { useState } from 'react';
export const AccardionShow = () => {
  const [openAcc, setOpenAcc] = useState(false);
  const { data: salary } = useGetSalaryQuery();
  const { data: getAllExpence } = useGetAllExpenceQuery();

  const totalSalary =
    salary?.reduce((acc, cur) => acc + (cur?.salary?.amount || 0), 0) || 0;

  const totalExpence =
    getAllExpence
      ?.filter((item) => !item.reason)
      .reduce((acc, cur) => acc + (cur?.amount || 0), 0) || 0;

  const balance = totalSalary - totalExpence;

  return (
    <div className='mt-4'>
      <h1 className='text-[#ffcb15] text-xl font-bold mb-5'>
        Balans: {balance}
      </h1>
      <Accordion
        type='single'
        collapsible
        onValueChange={(value) => setOpenAcc(value === 'item-1')}
      >
        <AccordionItem value='item-1'>
          <AccordionTrigger className='text-[#1b2b56] text-[15px] font-bold leading-tight bg-white rounded-lg border border-[#ffcb15] py-[9px] px-2'>
            Maoshlarim
            <button
              aria-label='Toggle'
              onClick={() => setOpenAcc(!openAcc)}
              className='bg-[#1C2C57] rounded-lg px-[5px] py-[5px] ml-2'
            >
              <ArrowDown
                className={`transition-transform w-4 h-4 text-[#FFCC15] ${
                  openAcc ? 'rotate-0' : 'rotate-180'
                }`}
              />
            </button>
          </AccordionTrigger>
          <AccordionContent className='w-full'>
            <div className='flex justify-between text-center py-2 px-14'>
              <h3 className='text-[#FFCC15] text-base font-semibold'>
                Olingan puli
              </h3>
              <h3 className='text-[#FFCC15] text-base font-semibold px-6'>
                Sana
              </h3>
            </div>
            <div className='w-full bg-white rounded-[9px] border border-[#FFCC15] py-[10px]'>
              {getAllExpence &&
                getAllExpence
                  .filter((item) => !item.reason)
                  .map((item) => (
                    <div key={item?._id}>
                      <div className='flex justify-between text-center py-2 px-12'>
                        <p className='text-[#1b2b56] text-sm font-medium px-2'>
                          {item?.amount}
                        </p>
                        <p className='text-[#1b2b56] text-sm font-medium'>
                          {item?.createdAt?.slice(0, 10).replace(/-/g, '.')}
                        </p>
                      </div>
                      <div className='w-full h-[1px] bg-[#FFCC15]'></div>
                    </div>
                  ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
