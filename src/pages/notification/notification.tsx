import { Button } from "@/components"
import { ArrowLeft } from "@/icons"
import { useNavigate } from "react-router-dom"

export const Notification = () => {
    const navigate = useNavigate()
    return (
        <div>
            <div className="border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[16px] pt-[20px] fixed top-0 w-full z-10">
                <div className="flex w-[95%] m-auto items-center">
                    <Button
                        onClick={() => navigate("/dashboard")}
                        className="w-5 h-5 px-[3.33px] py-[5px] justify-center items-center bg-[#FFCC15] text-[#1B2B56] hover:text-white p-4 rounded-full"
                    >
                        <ArrowLeft className="text-2xl" />
                    </Button>
                    <h4 className="text-center text-white text-2xl font-semibold ml-[75px] leading-[31.20px]">
                        Notification
                    </h4>
                </div>
            </div>
        </div>
    )
}