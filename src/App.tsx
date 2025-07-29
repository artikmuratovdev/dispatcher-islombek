import { Suspense, useEffect, useRef, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { useLazyMeQuery } from '@/app/api/authApi';
import { Loader } from './components';
import { useHandleRequest } from './hooks/use-handle-request/use-handle-reuqest';
import { Layouts } from './layouts';
import {
  Chat,
  Customers,
  HomePage,
  Login,
  Message,
  Messages,
  Notification,
  Profile,
} from './pages';
import { CustomerDetails } from './pages/customers/components';
import { NewActiveOrder, NewPreOrder, Order } from './pages/home/components';
import PWABadge from './PWABadge';
import { InstallApp, NetworkStatus, useStorage } from './utils';
import { AuthProvider } from './components/AuthProvider/AuthProvider';
import { EditPreOrder } from './pages/home/components/pre-order/edit-order/edit-order';

const App = () => {
  const [getUser, { isError, isLoading, data }] = useLazyMeQuery();
  const handleRequest = useHandleRequest();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const isFirstRender = useRef(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      await handleRequest({
        request: async () => {
          const result = await getUser('');
          return result;
        },
      });
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const checkToken = async () => {
      const token = useStorage.getTokens()?.accessToken;
      if (!token) {
        navigate('/login');
      } else {
        try {
          await getUser({}).unwrap();
          if (location.pathname === '/login') navigate('/dashboard');
        } catch (error) {
          localStorage.removeItem('ACCESS_TOKEN');
          navigate('/login');
        }
      }
    };
    checkToken();
  }, [navigate, getUser]);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (!isOnline) {
      toast.error('Offline rejim!');
    } else {
      toast.success('Internetga ulandi!');
    }
  }, [isOnline]);

  useEffect(() => {
    if (isError && navigator.onLine) {
      useStorage.removeCredentials();
      navigate('/login');
    }

    if (data && data.role !== 'DISPATCHER') {
      useStorage.removeCredentials();
      toast('Bu ilova siz uchun emas!');
      navigate('/login');
    }
  }, [data, isError]);

  if (isLoading) {
    return (
      <>
        <Loader />
      </>
    );
  }
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Layouts>
          <NetworkStatus />
          <InstallApp />
          <PWABadge />
          <AuthProvider>
            <Routes>
              <Route path='/' element={<Navigate to='/login' />} />
              <Route path='/login' element={<Login />} />
              <Route path='/dashboard' element={<HomePage />} />
              <Route path='/message' element={<Message />} />
              <Route path='/messages' element={<Messages />} />
              <Route path='/chat/:id' element={<Chat />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/orders/:id' element={<Order />} />
              <Route path='/orders/new-order' element={<NewActiveOrder />} />
              <Route path='/orders/new-pre-order' element={<NewPreOrder />} />
              <Route path='/orders/pre-order/:id' element={<EditPreOrder />} />
              <Route path='/customers' element={<Customers />} />
              <Route
                path='/customers/customer-details'
                element={<CustomerDetails />}
              />
              <Route path='/notifications' element={<Notification />} />
            </Routes>
          </AuthProvider>
        </Layouts>
        <Toaster position='top-center' />
      </Suspense>
    </>
  );
};

export default App;
