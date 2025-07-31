import { ComplaintResponse } from '@/app/api/complaint/types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ArrowDown } from '@/icons';

export const Arrived = ({
  complaints,
  accordionValue,
  setAccordionValue,
}: {
  complaints: ComplaintResponse[];
  accordionValue: string | undefined;
  setAccordionValue: (val: string | undefined) => void;
}) => {
  const isOpen = accordionValue === 'arrived';

  return (
    <section>
      <Accordion
        type='single'
        collapsible
        value={accordionValue}
        onValueChange={setAccordionValue}
      >
        <AccordionItem value='arrived'>
          <AccordionTrigger className='text-white text-2xl font-semibold font-inter leading-[31.20px] flex justify-between items-center'>
            <span>Kelib tushgan shikoyatlar</span>
            <ArrowDown
              className={`transition-transform text-[#FFCC15] ${
                isOpen ? 'rotate-0' : 'rotate-180'
              }`}
            />
          </AccordionTrigger>
          {complaints.map((complaint) => (
            <AccordionContent key={complaint._id}>
              <div className='flex flex-col gap-y-7'>
                <div className='w-full px-4 pt-[10px] pb-[14px] bg-white rounded-lg border border-[#ffcb15] flex flex-col'>
                  <h4 className='text-[#1b2b56] text-base font-extrabold font-inter'>
                    {complaint.from.role}
                  </h4>
                  <h5 className='text-[#1b2b56] mt-3 text-sm font-bold leading-snug'>
                    {complaint.content}
                  </h5>
                  <h4 className='text-[#c61a1a] mt-[5px] text-base text-right font-bold'>
                    {complaint.from.fullName}
                  </h4>
                </div>
              </div>
            </AccordionContent>
          ))}
        </AccordionItem>
      </Accordion>
    </section>
  );
};
