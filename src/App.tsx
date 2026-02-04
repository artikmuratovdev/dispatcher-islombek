import { Suspense, useEffect, useRef, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useLazyMeQuery } from "@/app/api/authApi";
import { Loader } from "./components";
import { useHandleRequest } from "./hooks/use-handle-request/use-handle-reuqest";
import { Layouts } from "./layouts";
import {
  Chat,
  Customers,
  HomePage,
  Login,
  Complaints,
  Messages,
  Notification,
  Profile,
} from "./pages";
import { CustomerDetails } from "./pages/customers/components";
import {
  EditPreOrder,
  NewActiveOrder,
  NewPreOrder,
  Order,
  ShowPreOrder,
} from "./pages/home/components";
import PWABadge from "./PWABadge";
import { InstallApp, NetworkStatus, useStorage } from "./utils";
import { AuthProvider } from "./components/AuthProvider/AuthProvider";
import { MySalaries } from "./pages/profile/components";

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
          const result = await getUser();
          return result;
        },
      });
    };
    fetchUser();
  }, [getUser, handleRequest]);

  useEffect(() => {
    const checkToken = async () => {
      const token = useStorage.getTokens()?.accessToken;
      if (!token) {
        navigate("/login");
      } else {
        try {
          await getUser().unwrap();
          if (location.pathname === "/login") navigate("/dashboard");
        } catch {
          localStorage.removeItem("ACCESS_TOKEN");
          navigate("/login");
        }
      }
    };
    checkToken();
  }, [navigate, getUser]);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (!isOnline) {
      toast.error("Offline rejim!");
    } else {
      toast.success("Internetga ulandi!");
    }
  }, [isOnline]);

  useEffect(() => {
    if (isError && navigator.onLine) {
      useStorage.removeCredentials();
      navigate("/login");
    }

    if (data && data.role !== "DISPATCHER") {
      useStorage.removeCredentials();
      toast("Bu ilova siz uchun emas!");
      navigate("/login");
    }
  }, [data, isError, navigate]);

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
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<HomePage />} />
              <Route path="/complaints" element={<Complaints />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/chat/:id" element={<Chat />} />
              <Route path="/orders/active-order/:id" element={<Order />} />
              <Route path="/orders/new-order" element={<NewActiveOrder />} />
              <Route path="/orders/new-pre-order" element={<NewPreOrder />} />
              <Route path="/orders/pre-order/:id" element={<ShowPreOrder />} />
              <Route
                path="/orders/pre-order/:id/edit"
                element={<EditPreOrder />}
              />
              <Route path="/customers" element={<Customers />} />
              <Route
                path="/customers/customer-details/:id"
                element={<CustomerDetails />}
              />
              <Route path="/notifications" element={<Notification />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/my-salaries" element={<MySalaries />} />
            </Routes>
          </AuthProvider>
        </Layouts>
        <Toaster position="top-center" />
      </Suspense>
    </>
  );
};

export default App;
