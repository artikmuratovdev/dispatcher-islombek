import { Button } from '@/components';
import { Tabs } from '@/components/common/tabs';
import { ArrowLeft } from '@/icons';
import { useNavigate } from 'react-router-dom';
import { Avans, Sotuv, Xabarnoma } from './tabs';

export const Notification = () => {
  const navigate = useNavigate();
  return (
    <div>
      <nav className='border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[16px] pt-[20px] fixed top-0 w-full z-10'>
        <div className='flex w-[95%] m-auto items-center'>
          <Button
            onClick={() => navigate('/dashboard')}
            className='w-5 h-5 px-[3.33px] py-[5px] justify-center items-center bg-[#FFCC15] text-[#1B2B56] hover:text-white p-4 rounded-full'
          >
            <ArrowLeft className='text-2xl' />
          </Button>
          <h4 className='text-center text-white text-2xl font-semibold mx-auto  leading-[31.20px]'>
            Notification
          </h4>
        <span className="w-5"></span>
        </div>
      </nav>
      <div className='mt-[80px] w-[100%] p-[12px]'>
        <div className='mt-[30px] flex flex-col gap-5'>
          <Tabs
            contentClassName='mt-[20px]'
            tabs={[
              {
                label: 'Xabarnoma',
                children: <Xabarnoma />,
              },
              {
                label: 'Avans',
                children: <Avans />,
              },
              {
                label: 'Sotuv',
                children: <Sotuv />,
              },
            ]}
            defaultTabIndex={0}
          />
        </div>
      </div>
    </div>
  );
};
