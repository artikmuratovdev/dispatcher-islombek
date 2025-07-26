import { ComplaintResponse } from '@/app/api/complaint/types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ArrowDown } from '@/icons';
import { useState } from 'react';

export const Arrived = ({
  complaintd,
}: {
  complaintd: ComplaintResponse[];
}) => {
  const [open, setOpen] = useState(false);

  return (
    <section>
      <Accordion
        type='single'
        collapsible
        onValueChange={(value) => setOpen(value === 'item-1')}
      >
        <AccordionItem value='item-1'>
          <AccordionTrigger className="text-white text-2xl font-semibold font-['Inter'] leading-[31.20px]">
            Kelib tushgan shikoyatlar
            <button aria-label='Toggle' onClick={() => setOpen(!open)}>
              <ArrowDown
                className={`transition-transform text-[#FFCC15] ${
                  open ? 'rotate-0' : 'rotate-180'
                }`}
              />
            </button>
          </AccordionTrigger>
          {complaintd.map((complaint) => {
            return (
              <AccordionContent>
                <div className='flex flex-col gap-y-7'>
                  <div className='w-full px-4 pt-[10px] pb-[14px] bg-white rounded-lg border border-[#ffcb15]  flex flex-col'>
                    <h4 className='text-[#1b2b56] text-base font-extrabold font-inter'>
                      {complaint.from.role}
                    </h4>
                    <h5 className="text-[#1b2b56] mt-3 text-sm font-bold font-['Inter Tight'] leading-snug">
                      {complaint.content}
                    </h5>
                    <h4 className="text-[#c61a1a] mt-[5px] text-base text-right font-bold font-['Plus Jakarta Sans']">
                      {complaint.from.fullName}
                    </h4>
                  </div>
                </div>
              </AccordionContent>
            );
          })}
        </AccordionItem>
      </Accordion>
    </section>
  );
};
