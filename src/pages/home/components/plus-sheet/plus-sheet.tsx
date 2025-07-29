import {
  useLazyMeQuery,
} from '@/app/api';
import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components';
import { Label } from '@/components/ui/label';
import { Role, Type } from '@/constants';
import { useHandleRequest } from '@/hooks/use-handle-request/use-handle-reuqest';
import { socket } from '@/utils';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

interface Props {
  amount: number;
  location?: string;
  customer?: string;
  fullName?: string;
  username?: string;
}

export const PlusSheet = ({
  setOpen,
  customerId,
}: {
  setOpen: (v: boolean) => void;
  customerId?: string | undefined;
}) => {
  const [getUser, { data: dispatcher }] = useLazyMeQuery();
  const handleRequest = useHandleRequest();
  const {
    watch,
    reset,
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<Props>({
    defaultValues: {
      amount: undefined,
      location: '',
      customer: 'null',
      fullName: '',
      username: '',
    },
  });
  const onSubmit = async (data: Props) => {
    if (!navigator.onLine) {
      const cacheKey = 'rtk_cache';
      const queryUrl = '/user?roles=CUSTOMER';
      const cachedData = localStorage.getItem(cacheKey);
      const rtk_data = cachedData ? JSON.parse(cachedData) : {};

      if (!rtk_data[queryUrl]) {
        rtk_data[queryUrl] = [];
      }

      if (customerId) {
        rtk_data[queryUrl] = rtk_data[queryUrl].map((el: any) => {
          if (el._id === customerId) {
            return {
              ...el,
              amount: data.amount,
              location: data.location,
              customer: data.customer,
            };
          }
          return el;
        });

        if (rtk_data[`/user/${customerId}`]) {
          rtk_data[`/user/${customerId}`] = {
            ...rtk_data[`/user/${customerId}`],
            amount: data.amount,
            location: data.location,
            customer: data.customer,
          };
        }
      } else {
        const newItem = {
          _id: new Date().toISOString(),
          amount: data.amount,
          location: data.location,
          customer: data.customer,
        };
        rtk_data[queryUrl] = [...rtk_data[queryUrl], newItem];
        rtk_data[`/user/${newItem._id}`] = newItem;
      }

      localStorage.setItem(cacheKey, JSON.stringify(rtk_data));
      toast.success('Offline rejimda saqlandi!');
      setOpen(false);
      reset();
      return;
    }

    // await handleRequest({
    //   request: async () => {
    //     const result = await createOrder({
    //       amount: data.amount,
    //       location: data.location || undefined,
    //       customer: data.customer === 'null' ? undefined : data.customer,
    //     }).unwrap();

    //     const notification = await createNotification({
    //       order: result._id,
    //       role: Role.DRIVER,
    //       type: Type.ORDER,
    //     }).unwrap();

    //     if (notification?.users?.length) {
    //       await Promise.all(
    //         notification.users.map(async (userId) => {
    //           const pushNotification = await sendPushNotification({
    //             id: userId,
    //             body: {
    //               title: 'Buyurtma',
    //               body: 'Yangi buyurtma',
    //               data: { url: '/orders' },
    //               actions: [
    //                 { action: 'accept', title: 'Qabul qilish' },
    //                 { action: 'decline', title: 'Bekor qilish' },
    //               ],
    //               vibrate: [200, 100, 300],
    //             },
    //           });
    //           console.log(`Push notification sent to user:`, pushNotification);
    //         })
    //       );
    //     }

    //     socket.emit('notification', notification);
    //     return result;
    //   },
    //   onSuccess: () => {
    //     toast.success("Buyurtma muvaffaqiyatli qo'shildi!");
    //     setOpen(false);
    //   },
    // });
  };

  useEffect(() => {
    if (customerId) {
      getUser({ id: customerId });
    }
  }, [customerId]);
  useEffect(() => {
    if (dispatcher) {
      setValue('fullName', dispatcher?.fullName);
      setValue('username', dispatcher?.username);
    }
  }, [dispatcher]);

  useEffect(() => {}, [watch('customer')]);
  return (
    <div className='w-full pl-5 pr-[15px] mt-10 pt-2.5 pb-[23px] bg-white/0 rounded-xl border-2 border-[#ffcb15] flex-col justify-start items-end gap-[18px] inline-flex'>
      <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
        <div>
          <Controller
            name='customer'
            control={control}
            rules={{ required: 'Foydalanuvchini tanlang!' }}
            render={({ field }) => (
              <>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className='h-[42px] bg-white text-ellipsis rounded-lg border-2 border-[#ffcb15] text-[#1b2b56] text-base font-semibold font-inter mt-5'>
                    <SelectValue placeholder='Mijozni tanlang' />
                  </SelectTrigger>
                  <SelectContent className='bg-white rounded-lg border border-[#ffcb15]'>
                      {/* <SelectItem value={user._id as string} key={user?._id}>
                        {user.fullName}
                      </SelectItem> */}
                    <SelectItem value='null'>Boshqa</SelectItem>
                  </SelectContent>
                </Select>
              </>
            )}
          />
          {getValues().customer === 'null' && (
            <>
              <Label className='text-[#ffcb15]'>Manzili</Label>
              <Controller
                name='location'
                control={control}
                rules={{ required: 'Manzilni kiriting!' }}
                render={({ field }) => (
                  <>
                    <Input
                      className=' w-full font-semibold bg-white rounded-lg border border-[#ffcb15] flex-col justify-start items-start gap-3 inline-flex'
                      onChange={field.onChange}
                      value={field.value}
                    />
                    <p className='text-xs text-red-600'>
                      {typeof errors.location?.message === 'string' &&
                        errors.location.message}
                    </p>
                  </>
                )}
              />
            </>
          )}
          <Label className='text-[#ffcb15]'>Soni</Label>
          {!customerId && (
            <Controller
              name='amount'
              control={control}
              rules={{ required: 'Sonini kiriting!' }}
              render={({ field }) => (
                <>
                  <Input
                    className='w-[100%] font-semibold bg-white rounded-lg border border-[#ffcb15] flex-col justify-start items-start gap-3 inline-flex'
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    type='number'
                    value={field.value}
                  />
                  <p className='text-xs text-red-600'>
                    {typeof errors.amount?.message === 'string' &&
                      errors.amount.message}
                  </p>
                </>
              )}
            />
          )}
          <div className='flex justify-end mt-5'>
            {/* <Button
              className='w-1/3 bg-[#ffcb15] text-[#1b2b56] hover:bg-[#ffcb15]'
              disabled={isLoading}
            >
              {isLoading ? 'Yuborilmoqda' : 'Saqlash'}
            </Button> */}
          </div>
        </div>
      </form>
    </div>
  );
};
