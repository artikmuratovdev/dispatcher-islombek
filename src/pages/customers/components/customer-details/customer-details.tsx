import { Button } from "@/components"
import { ArrowLeft, Clock, Notifications } from "@/icons"
import { useNavigate } from "react-router-dom"

export const CustomerDetails = () => {
    const navigate = useNavigate()
    return (
        <div>
            <div className="border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[16px] pt-[20px] fixed top-0 w-full z-10">
                <div className="flex w-[95%] m-auto items-center justify-between">
                    <Button
                        onClick={() => navigate("/customers")}
                        className="w-5 h-5 px-[3.33px] py-[5px] justify-center items-center bg-[#FFCC15] text-[#1B2B56] hover:text-white p-4 rounded-full"
                    >
                        <ArrowLeft className="text-2xl" />
                    </Button>
                    <h4 className="text-center justify-center text-white text-2xl font-semibold">
                        Farxod restoran <br /> 99 567 87 45
                    </h4>
                    <p></p>
                    <button onClick={() => navigate("/notifications")}>
                        <Notifications className="cursor-pointer text-[#FFCC15] w-6 h-6" />
                    </button>
                </div>
            </div>

            <div className="mt-[120px] m-auto p-[16px] space-y-5">
                <div className="w-full bg-white rounded-lg border border-yellow-400 p-3">
                    <div className="flex justify-between items-center mb-2">
                        <p className="text-blue-950 text-base font-bold leading-tight">Izzat</p>
                        <p className="text-red-700 text-base font-semibold leading-none bg-gray-200 p-1 rounded-[10px] w-20 h-7 flex justify-center items-center">10:45</p>
                        <p className="text-blue-950 text-base font-semibold leading-none bg-gray-200 p-1 rounded-[10px] w-20 h-7 flex justify-center items-center gap-x-2"><Clock /> 6:00</p>
                        <p className="text-green-700 text-base font-semibold leading-none bg-gray-200 p-1 rounded-[10px] w-20 h-7 flex justify-center items-center">10:51</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between items-center mt-2">
                            <h4 className="text-blue-950 text-sm font-bold">Chig'atoy</h4>
                            <p className="text-blue-950 text-sm font-bold">0</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <h4 className="text-blue-950 text-sm font-bold">Patir</h4>
                            <p className="text-blue-950 text-sm font-bold">1000</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <h4 className="text-blue-950 text-sm font-bold">Buxonka</h4>
                            <p className="text-blue-950 text-sm font-bold">100</p>
                        </div>
                    </div>
                </div>
                <div className="w-full bg-white rounded-lg border border-yellow-400 p-3">
                    <div className="flex justify-between items-center mb-2">
                        <p className="text-blue-950 text-base font-bold leading-tight">Izzat</p>
                        <p className="text-red-700 text-base font-semibold leading-none bg-gray-200 p-1 rounded-[10px] w-20 h-7 flex justify-center items-center">10:45</p>
                        <p className="text-blue-950 text-base font-semibold leading-none bg-gray-200 p-1 rounded-[10px] w-20 h-7 flex justify-center items-center gap-x-2"><Clock /> 6:00</p>
                        <p className="text-green-700 text-base font-semibold leading-none bg-gray-200 p-1 rounded-[10px] w-20 h-7 flex justify-center items-center">10:51</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between items-center mt-2">
                            <h4 className="text-blue-950 text-sm font-bold">Chig'atoy</h4>
                            <p className="text-blue-950 text-sm font-bold">0</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <h4 className="text-blue-950 text-sm font-bold">Patir</h4>
                            <p className="text-blue-950 text-sm font-bold">1000</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <h4 className="text-blue-950 text-sm font-bold">Buxonka</h4>
                            <p className="text-blue-950 text-sm font-bold">100</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}