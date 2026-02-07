import { useGetPreDispatchesQuery } from "@/app/api";
import { Button } from "@/components";
import { Plus } from "@/icons";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { formatNumber } from "@/utils";

export const PreOrder = () => {
  const navigate = useNavigate();
  const { data: preOrders, refetch } = useGetPreDispatchesQuery();

  const getTime = (date: string) => {
    const d = new Date(date);
    const minutes = String(d.getMinutes()).padStart(2, "0");
    const hours = String(d.getHours()).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}.${month}.${year} ${hours}:${minutes}`;
  };

  useEffect(() => {
    refetch();
  }, [preOrders, refetch]);
  return (
    <div className="space-y-3 mb-16">
      {preOrders &&
        preOrders.map((order) => (
          <div
            key={order._id}
            className="w-full h-8 bg-white rounded-lg border border-yellow-400 px-1.5 py-1"
            onClick={() => navigate(`/orders/pre-order/${order._id}`)}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex w-full items-center gap-2 justify-between">
                <h1 className="text-blue-950 text-base font-bold leading-tight">
                  {order.client.toString()}
                </h1>
                <div className="min-w-[2rem] h-5 bg-blue-100 rounded-lg flex justify-center items-center px-1">
                  <h3 className="text-blue-900 text-sm font-semibold tabular-nums">
                    {formatNumber(order.breadCount)}
                  </h3>
                </div>
              </div>
              <h3 className="text-blue-950 text-nowrap text-base font-semibold tabular-nums">
                {getTime(order.updatedAt.toString())}
              </h3>
            </div>
          </div>
        ))}
      <Button
        className="fixed bottom-[104px] right-5 h-8 w-8 scale-125 p-3 bg-[#ffcb15] text-3xl rounded-full justify-center items-center gap-1 inline-flex text-[#1C2C57] hover:bg-[#ffcb15]"
        onClick={() => navigate("/orders/new-pre-order")}
      >
        <Plus className="scale-150" />
      </Button>
    </div>
  );
};
