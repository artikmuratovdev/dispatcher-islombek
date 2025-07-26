import { Notifications } from "@/icons"
import { useNavigate } from "react-router-dom"

export const Customers = () => {
    const navigate = useNavigate()
    return (
        <div>
            <div className="border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[16px] pt-[20px] fixed top-0 w-full">
                <div className="flex w-[95%] m-auto items-center justify-between">
                    <h4 className="text-center justify-center text-white text-2xl font-semibold ml-[120px] leading-loose">
                        Mijozlar
                    </h4>
                    <button onClick={() => navigate("/notifications")}>
                        <Notifications className="cursor-pointer text-[#FFCC15] w-6 h-6" />
                    </button>
                </div>
            </div>
            <div className="mt-[120px] m-auto p-[12px] space-y-5">
                <div className="w-full h-10 bg-white rounded-lg border border-yellow-400 flex justify-between items-center p-4" onClick={() => navigate("customer-details")}>
                    <h1 className="text-red-700 text-base font-bold leading-tight">Farxod restoran</h1>
                    <h3 className="bg-gray-200 rounded-[10px] w-32 h-7 flex justify-center items-center">99 567 87 45</h3>
                </div>
                <div className="w-full h-10 bg-white rounded-lg border border-yellow-400 flex justify-between items-center p-4">
                    <h1 className="text-green-700 text-base font-bold leading-tight">Kabob Saroy</h1>
                    <h3 className="bg-gray-200 rounded-[10px] w-32 h-7 flex justify-center items-center">99 567 87 45</h3>
                </div>
            </div>
        </div>
    )
}