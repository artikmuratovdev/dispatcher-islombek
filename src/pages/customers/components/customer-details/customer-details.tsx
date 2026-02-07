import { useGetClientByIdQuery } from "@/app/api";
import { Button } from "@/components";
import { ArrowLeft, Clock, Notification } from "@/icons";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { distanceTime, setTime } from "./triggers";
import { formatNumber } from "@/utils";

export const CustomerDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data } = useGetClientByIdQuery({ id }, { skip: !id });
  const location = useLocation();

  return (
    <div>
      <div className="border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[16px] pt-[20px] fixed top-0 w-full z-10">
        <div className="flex items-center justify-between">
          <Button
            onClick={() => navigate("/customers")}
            className="w-5 h-5 px-[3.33px] py-[5px] justify-center items-center bg-[#FFCC15] text-[#1B2B56] hover:text-white p-4 rounded-full"
          >
            <ArrowLeft className="text-2xl" />
          </Button>
          <h4 className="text-center justify-center text-white text-2xl font-semibold">
            {location?.state?.name} <br /> {location?.state?.number}
          </h4>
          <button onClick={() => navigate("/notifications")}>
            <Notification className="cursor-pointer text-[#FFCC15] w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="my-[120px] m-auto p-[16px] space-y-5">
        {data &&
          (data.orders && data.orders.length > 0 ? (
            data.orders.map((order) => (
              <div
                key={order._id}
                className="w-full bg-white rounded-lg border border-yellow-400 p-3"
              >
                <div className="flex justify-between items-center gap-1 mb-2">
                  <p className="text-blue-950 text-base font-bold leading-tight">
                    {order.acceptedDriver?.fullName || ""}
                  </p>
                  <p className="text-red-700 text-base font-semibold leading-none bg-gray-200 p-1 rounded-[10px] w-20 h-7 flex justify-center items-center">
                    {setTime(order.createdAt)}
                  </p>
                  <p className="text-blue-950 text-base font-semibold leading-none bg-gray-200 p-1 rounded-[10px] w-20 h-7 flex justify-center items-center gap-x-2">
                    <Clock />{" "}
                    {order.deliveryTime &&
                      distanceTime(order.createdAt, order.deliveryTime)}
                  </p>
                  <p className="text-green-700 text-base font-semibold leading-none bg-gray-200 p-1 rounded-[10px] w-20 h-7 flex justify-center items-center">
                    {order.deliveryTime && setTime(order.deliveryTime)}
                  </p>
                </div>
                <div className="space-y-2">
                  {order.breadsInfo.map((bread) => (
                    <div
                      key={bread._id}
                      className="flex justify-between items-center mt-2"
                    >
                      <h4 className="text-blue-950 text-sm font-bold">
                        {bread.title}
                      </h4>
                      <p className="text-blue-950 text-sm font-bold">
                        {formatNumber(bread.amount)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-yellow-400">
              Mahsulotlar mavjud emas
            </p>
          ))}
      </div>
    </div>
  );
};
