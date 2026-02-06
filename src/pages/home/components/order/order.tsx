import {
  useGetActiveDispatchQuery,
  useGetBreadPricesQuery,
  useUpdateActiveOrdersMutation,
} from "@/app/api";
import {
  activeOrder as ActiveOrderType,
  breadInfo,
} from "@/app/api/order/types";
import { Button } from "@/components";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Notification } from "@/icons";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useHandleRequest } from "@/hooks";
import toast from "react-hot-toast";
import BreadList from "../active-orders/new-order/components/BreadList";

export const Order = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data } = useGetActiveDispatchQuery({ id }, { skip: !id });
  const [updateOrder, { isLoading }] = useUpdateActiveOrdersMutation();

  const getTime = (date: string | Date) => {
    return new Date(date).toLocaleTimeString("uz-UZ", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const [orderData, setOrderData] = React.useState<ActiveOrderType | null>(
    null,
  );
  const { data: breadPrices } = useGetBreadPricesQuery("");
  const [breads, setBreads] = useState<breadInfo[]>([]);
  const [commit, setCommit] = useState("");

  useEffect(() => {
    if (data && breadPrices) {
      const breadPricesWithAmount = breadPrices.map((bread) => {
        const preOrderBread = data.breadsInfo.find((b) => b._id === bread._id);
        return {
          ...bread,
          amount: preOrderBread?.amount ?? 0,
          breadSoldPrice: preOrderBread?.breadSoldPrice ?? bread.breadSoldPrice,
        };
      });

      setBreads(breadPricesWithAmount);
    }
  }, [data, breadPrices]);

  useEffect(() => {
    if (data) {
      setOrderData(data);
      setCommit(data.commit || "");
    }
  }, [data]);

  console.log(orderData);

  const handleRequest = useHandleRequest();

  const handleSubmit = async () => {
    await handleRequest({
      request: async () => {
        if (!orderData) return;
        const { message } = await updateOrder({
          _id: orderData._id,
          breadsInfo: breads.filter((b) => b.amount !== 0),
          client:
            typeof orderData.client === "string"
              ? orderData.client
              : orderData?.client?._id,
          commit: commit,
          address: orderData.address as string,
          phone: orderData.phone,
        }).unwrap();
        return message;
      },
      onSuccess: (data) => {
        toast.success(data);
        navigate("/dashboard", { state: { activeTab: 0 } });
      },
      onError: (error) => {
        toast.error(error.data.message || "Yangilashda xatolik");
      },
    });
  };

  return (
    <div>
      {orderData && (
        <>
          <div className="border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[16px] pt-[20px] fixed top-0 w-full z-10">
            <div className="flex w-[95%] m-auto items-center justify-between">
              <Button
                type="button"
                onClick={() =>
                  navigate("/dashboard", { state: { activeTab: 0 } })
                }
                className="w-5 h-5 px-[3.33px] py-[5px] justify-center items-center bg-[#FFCC15] text-[#1B2B56] hover:bg-[#FFCC15] p-4 rounded-full"
              >
                <ArrowLeft className="text-2xl" />
              </Button>
              <h4 className="text-center text-white text-2xl font-semibold font-inter leading-[31.20px]">
                Buyurtma
              </h4>
              <button type="button" onClick={() => navigate("/notifications")}>
                <Notification className="cursor-pointer text-[#FFCC15] w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="my-[80px] p-[16px]">
            <Card className="border-2 border-[#FFCC15] rounded-lg h-11 mb-3">
              <CardContent className="w-full">
                <div className="flex justify-between items-center">
                  <h3 className="text-blue-950 text-sm font-bold mt-[11px]">
                    Buyurtma vaqti
                  </h3>
                  <h4 className="text-blue-950 text-sm font-bold mt-[11px]">
                    {getTime(orderData.createdAt)}
                  </h4>
                </div>
              </CardContent>
            </Card>

            {orderData.acceptedDriver && (
              <Card className="border-2 border-[#FFCC15] rounded-lg h-11 mb-3">
                <CardContent className="w-full">
                  <div className="flex justify-between items-center">
                    <h3 className="text-blue-950 text-sm font-bold mt-[11px]">
                      {orderData.acceptedDriver.fullName}
                    </h3>
                    {orderData.acceptedTimeDriver && (
                      <h4 className="text-blue-950 text-sm font-bold mt-[11px]">
                        {getTime(orderData.acceptedTimeDriver)}
                      </h4>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex flex-col gap-y-1 mb-3">
              <Label className="text-yellow-400 text-base font-semibold">
                Mijoz
              </Label>
              <span className="bg-white border border-[#FFCC15] rounded-lg px-3 py-1.5 font-light">
                {typeof orderData.client === "string"
                  ? orderData.client
                  : orderData.client?.fullName || "Boshqa"}
              </span>
            </div>

            <div className="flex flex-col gap-y-1 mb-3">
              <Label className="text-yellow-400 text-base font-semibold">
                Telefon
              </Label>
              <span className="bg-white border border-[#FFCC15] rounded-lg px-3 py-1.5 font-light">
                {orderData.phone}
              </span>
            </div>

            <div className="flex flex-col gap-y-1 mb-3">
              <Label className="text-yellow-400 text-base font-semibold">
                Manzili
              </Label>
              <span className="bg-white border border-[#FFCC15] rounded-lg px-3 py-1.5 font-light">
                {typeof orderData.address === "string"
                  ? orderData.address
                  : orderData.address.lat}
              </span>
            </div>

            <div className="flex flex-col gap-y-1 mb-3">
              <Label className="text-yellow-400 text-base font-semibold">
                Izoh
              </Label>
              <textarea
                value={commit}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setCommit(e.target.value)
                }
                placeholder="Izoh yozing (ixtiyoriy)"
                className="bg-white border border-[#FFCC15] rounded-lg px-3 py-1.5 font-light min-h-[60px] resize-none"
              />
            </div>

            {/* Bread items */}
            <div className="space-y-3 pt-2 mb-3">
              {orderData?.breadsInfo && (
                <BreadList breadPrices={breads} setBreads={setBreads} />
              )}
            </div>

            <Button
              onClick={handleSubmit}
              className="w-full h-11 bg-[#FFCC15]"
              disabled={isLoading}
            >
              {" "}
              Yangilash
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
