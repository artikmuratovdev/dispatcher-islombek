import { MessagesIcon, Notifications } from "@/icons";
import { useNavigate } from "react-router-dom";
import { Tabs } from "@/components/common/tabs";
import { ActiveOrders, PreOrder } from "./components";

export const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[16px] pt-[20px] fixed top-0 w-full">
        <div className="flex w-[95%] m-auto items-center justify-between">
          <div className="w-7"></div>
          <h4 className="text-center justify-center text-white text-2xl font-semibold leading-loose">
            Buyurtmalar
          </h4>
          <button onClick={() => navigate("/notifications")}>
            <Notifications className="cursor-pointer text-[#FFCC15] w-6 h-6" />
          </button>
        </div>
      </div>
      <div className="mt-[80px] w-[100%] p-[12px]">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate("/message")}>
            <MessagesIcon className="w-6 h-6 text-[#FFCC15]" />
          </button>
        </div>
        <div className="mt-[30px] flex flex-col gap-5">
          <Tabs contentClassName="mt-[20px]" tabs={[
            {
              label: "Faol buyurtmalar",
              children: <ActiveOrders />
            },
            {
              label: "Oldingi buyurtmalar",
              children: <PreOrder />
            }
          ]}
            defaultTabIndex={0}
          />
        </div>
      </div>
    </div>
  );
};
