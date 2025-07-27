import { useLazyGetActiveDispatchesQuery } from "@/app/api/_order";
import Order_item from "./components/order-item";
import { useEffect, useState } from "react";

export const MainPart = () => {
    const [getActiveOrders, {data:activeOrders}] = useLazyGetActiveDispatchesQuery();
    const [currentTime, setCurrentTime] = useState(Date.now());



    useEffect(() => {
      getActiveOrders();
      const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
    },[])

    const getTimes = (date: Date | string) => {
    const past = new Date(date).getTime();
    const diffMs = currentTime - past;

    const minutes = Math.floor(diffMs / 60000);
    const seconds = Math.floor((diffMs % 60000) / 1000);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };


    return (
        <>
            <div className="space-y-3 mb-16">
              {activeOrders && activeOrders.orders.map((item) => (
                <Order_item key={item._id} item={item} getTimes={getTimes} />
              ))}
            </div>
        </>
    );
};
