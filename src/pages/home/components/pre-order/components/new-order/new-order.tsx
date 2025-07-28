import { Button, Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Notifications } from "@/icons"
import { useNavigate } from "react-router-dom"
import { BreadItem } from "../../.."
import { useState } from "react"

export const NewPreOrder = () => {
    const navigate = useNavigate();
    const [chigatoy, setChigatoy] = useState(0)
    const [patir, setPatir] = useState(1000)
    const [buxonka, setBuxonka] = useState(100)
    return (
        <div>
            <div className="border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[16px] pt-[20px] fixed top-0 w-full z-10">
                <div className="flex w-[95%] m-auto items-center justify-between">
                    <Button
                        onClick={() => navigate("/dashboard")}
                        className="w-5 h-5 px-[3.33px] py-[5px] justify-center items-center bg-[#FFCC15] text-[#1B2B56] hover:text-white p-4 rounded-full"
                    >
                        <ArrowLeft className="text-2xl" />
                    </Button>
                    <h4 className="text-center text-white text-2xl font-semibold font-inter leading-[31.20px]">
                        Yangi buyurtma
                    </h4>
                    <button onClick={() => navigate("/notifications")}>
                        <Notifications className="cursor-pointer text-[#FFCC15] w-6 h-6" />
                    </button>
                </div>
            </div>
            <div className="mt-[80px] p-[16px]">
                <Label className="text-yellow-400 text-base font-semibold leading-none">Mijoz</Label>
                <div className="w-full h-7 px-4 pt-1 pb-4 bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-yellow-400 mb-2">
                    <h1 className="text-blue-950 text-sm font-semibold">Afruz to'yxonasi</h1>
                </div>
                <Label className="text-yellow-400 text-base font-semibold leading-none">Telefon</Label>
                <div className="w-full h-7 px-4 pt-1 pb-4 bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-yellow-40 mb-2">
                    <h1 className="text-blue-950 text-sm font-semibold">99 567 87 45</h1>
                </div>
                <Label className="text-yellow-400 text-base font-semibold leading-none">Manzil</Label>
                <div className="w-full h-7 px-4 pt-1 pb-4 bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-yellow-40 mb-2">
                    <h1 className="text-blue-950 text-sm font-semibold">Shohbekat</h1>
                </div>
                <Label className="text-yellow-400 text-base font-semibold leading-none">Izoh</Label>
                <div className="w-full h-7 px-4 pt-1 pb-4 bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-yellow-40 mb-2">
                    <h1 className="text-blue-950 text-sm font-semibold">Qolgan pulini bo'lib to'lar ekan</h1>
                </div>
                <Label className="text-yellow-400 text-base font-semibold leading-none">Topshirish vaqti</Label>
                <input type="datetime-local" className="w-full h-7 px-4 pt-4 pb-4 bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-yellow-40 mb-2" />
                <Label className="text-yellow-400 text-base font-semibold leading-none">Olgan xodim</Label>
                <Select>
                    <SelectTrigger className="w-full bg-white font-bold">
                        <SelectValue placeholder="Izzat (Haydovchi)" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="apple">Apple</SelectItem>
                            <SelectItem value="banana">Banana</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Label className="text-yellow-400 text-base font-semibold leading-none">Olingan pul</Label>
                <div className="w-full h-7 px-4 pt-1 pb-4 bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-yellow-40 mb-2">
                    <h1 className="text-blue-950 text-sm font-semibold">500 000</h1>
                </div>
                <div className="space-y-3 pt-2 mb-5">
                    <BreadItem name="Chig’atoy" price={5000} quantity={chigatoy} onChange={setChigatoy} />
                    <BreadItem name="Patir" price={5000} quantity={patir} onChange={setPatir} />
                    <BreadItem name="Buxonka" price={3000} quantity={buxonka} onChange={setBuxonka} />
                </div>
                <h1 className="text-white text-2xl font-semibold mb-5 leading-none">Umumiy summa: 800 000</h1>
                <div className="flex justify-end mb-5">
                    <Button className="w-36 h-8 p-3 bg-[#FFCC15] text-[#1B2B56] hover:bg-[#FFCC15]">Saqlash</Button>
                </div>
                <div className="w-full relative bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-yellow-400 px-2 py-1 flex justify-between mb-4">
                    <h3 className="text-blue-950 text-base font-semibold">Izzat (Haydovchi) <br /><span className="text-green-700 text-base font-semibold">500 000</span></h3>
                    <h3 className="text-blue-950 text-base font-semibold">29.03.2025<br />10:30</h3>
                </div>
                <div className="flex justify-between">
                    <Button className="w-36 h-7 p-3 bg-red-700 rounded-lg shadow-[0px_9px_28px_0px_rgba(0,0,0,0.05)] shadow-[0px_3px_6px_0px_rgba(0,0,0,0.12)] shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] gap-1">O'chirish</Button>
                    <Button className="w-36 h-7 p-3 bg-yellow-400 rounded-lg shadow-[0px_9px_28px_0px_rgba(0,0,0,0.05)] shadow-[0px_3px_6px_0px_rgba(0,0,0,0.12)] shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] gap-1 text-[#1B2B56] font-bold">Tahrirlash</Button>
                </div>
            </div>
        </div>
    )
}