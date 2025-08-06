import {
  useAddActiveOrderMutation,
  useLazyGetBreadPricesQuery,
  useGetClientsQuery,
} from '@/app/api';
import { AddActiveOrderReq, breadInfo, client } from '@/app/api/order/types';
import { Combobox } from '@/components/common/combobox/combobox';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Notification } from '@/icons';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import BreadList from './components/BreadList';

export const NewActiveOrder = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  const navigate = useNavigate();
  const { data: clients } = useGetClientsQuery({});
  const [getBreadPrices, { data: breadPrices }] = useLazyGetBreadPricesQuery();
  const [addActiveOrder] = useAddActiveOrderMutation();
  const [selectedClient, setSelectedClient] = React.useState({
    fullName: '',
    id: '',
  });
  const [breads, setBreads] = React.useState<breadInfo[]>([]);

  useEffect(() => {
    if (selectedClient.fullName === 'Boshqa') {
      getBreadPrices({}).unwrap();
    } else {
      getBreadPrices({ id: selectedClient.id }).unwrap();
    }
  }, [selectedClient]);

  const onChangeClient = (values: client) => {
    if (values.fullName === 'Boshqa') {
      setValue('mijoz', 'Boshqa');
      setValue('telifon', '');
      setValue('manzil', '');
      return;
    }

    if (values.fullName) {
      setValue('mijoz', values._id);
    }
    if (values.phone) {
      setValue('telifon', values.phone);
    }
    if (values.address && typeof values.address === 'string') {
      setValue('manzil', values.address);
    }
  };

  const onSubmit = async (data: any) => {
    const sentData: AddActiveOrderReq = {
      client: data.mijoz,
      breadsInfo: breads,
      commit: data.izoh,
      address: data.manzil,
      phone: '',
    };
    if (data.telifon.startsWith('+998')) {
      sentData.phone = data.telifon.slice(4).trim();
    } else {
      sentData.phone = data.telifon.trim();
    }
    if (sentData.breadsInfo.length === 0) {
      toast.error('Non miqdorini kiriting');
      return;
    }

    try {
      await addActiveOrder(sentData).unwrap();
      toast.success('Buyurtma yuborildi');
      setBreads([]);
      reset({
        mijoz: '',
        telifon: '',
        manzil: '',
        izoh: '',
      });
      navigate('/dashboard');
    } catch (error : any) {
      toast.error(error.msg || error.message);
      return;
    }
    console.warn('Yuborilayotgan data:', sentData);
  };

  return (
    <section>
      <header className='flex items-center justify-between border-b-2 rounded-b-[20px] border-yellow-500 px-5 w-full pt-[25px] pb-8'>
        <button
          onClick={() => navigate(-1)}
          className='bg-yellow-500 rounded-full p-1'
        >
          <ArrowLeft className='text-black' />
        </button>
        <h4 className='text-center justify-center text-white text-2xl font-semibold'>
          Yangi buyurtma
        </h4>
        <button onClick={() => navigate('/notification')}>
          <Notification className='text-yellow-500' />
        </button>
      </header>

      <main className='mt-5 mb-20 px-5'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col gap-y-2 mb-5'
        >
          {/* Mijoz */}
          <div className='flex flex-col gap-y-2'>
            <label htmlFor='mijoz' className='text-yellow-500 text-base'>
              Mijoz
            </label>
            <Controller
              name='mijoz'
              control={control}
              rules={{ required: 'Mijozni tanlang' }}
              render={({ field }) => (
                <>
                  <Combobox
                    value={field.value}
                    onChange={field.onChange}
                    setValues={onChangeClient}
                    changeBreadPrices={(value) => setSelectedClient(value)}
                    clients={[
                      ...(clients?.clients || []),
                      {
                        _id: 'other',
                        fullName: 'Boshqa',
                        phone: '',
                        hasOrder: false,
                      },
                    ]}
                    placeholder={field.value || 'Mijozni tanlang'}
                  />
                  {errors.mijoz && (
                    <p className='text-red text-sm mt-1'>
                      {errors.mijoz.message?.toString()}
                    </p>
                  )}
                </>
              )}
            />
          </div>

          {/* Telefon */}
          <div className='flex flex-col gap-y-2'>
            <label htmlFor='telifon' className='text-yellow-500 text-base'>
              Telefon
            </label>
            <Controller
              name='telifon'
              control={control}
              rules={{ required: 'Telefonni kiriting' }}
              render={({ field }) => (
                <>
                  <Input
                    {...field}
                    placeholder='Telefon'
                    id='telifon'
                    type='tel'
                    className=' text-blue-950 bg-white'
                  />
                  {errors.telifon && (
                    <p className='text-red text-sm'>
                      {errors?.telifon?.message?.toString()}
                    </p>
                  )}
                </>
              )}
            />
          </div>

          {/* Manzil */}
          <div className='flex flex-col gap-y-2'>
            <label htmlFor='manzil' className='text-yellow-500 text-base'>
              Manzil
            </label>
            <Controller
              name='manzil'
              control={control}
              rules={{ required: 'Manzilni kiriting' }}
              render={({ field }) => (
                <>
                  <Input
                    {...field}
                    placeholder='Manzilni kiriting'
                    id='manzil'
                    className=' text-blue-950 bg-white'
                  />
                  {errors.manzil && (
                    <p className='text-red text-sm'>
                      {errors?.manzil?.message?.toString()}
                    </p>
                  )}
                </>
              )}
            />
          </div>

          {/* Izoh */}
          <div className='flex flex-col gap-y-2'>
            <label htmlFor='izoh' className='text-yellow-500 text-base'>
              Izoh
            </label>
            <Controller
              name='izoh'
              control={control}
              rules={{ required: 'Izohni kiriting' }}
              render={({ field }) => (
                <>
                  <Input
                    {...field}
                    placeholder='Izoh'
                    id='izoh'
                    className=' text-blue-950 bg-white'
                  />
                  {errors.izoh && (
                    <p className='text-red text-sm'>
                      {errors?.izoh?.message?.toString()}
                    </p>
                  )}
                </>
              )}
            />
          </div>

          {selectedClient.fullName === '' ? (
            <div className='mt-5 flex flex-col gap-y-2 bg-slate-300 rounded-lg min-h-[135px] items-center justify-center'>
              <p className='text-slate-900 text-lg max-w-[270px] font-bold p-2 text-center'>
                Mijoz tanlangandan so’ng non miqdorini kirita olasiz
              </p>
            </div>
          ) : (
            <div className='mt-5 flex flex-col gap-y-2'>
              {breadPrices && (
                <BreadList breadPrices={breadPrices} setBreads={() => {}} />
              )}
            </div>
          )}

          <button
            type='submit'
            className='bg-yellow-500 text-black font-semibold py-2 px-4 rounded-lg mt-4'
          >
            Yuborish
          </button>
        </form>
      </main>
    </section>
  );
};
