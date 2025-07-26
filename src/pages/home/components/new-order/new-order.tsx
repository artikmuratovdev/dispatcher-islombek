import {
    Button,
    Input,
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Edit, Notifications } from "@/icons"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

type BreadItemProps = {
    name: string
    price: number
    quantity: number
    onChange: (newQty: number) => void
}

export const BreadItem = ({ name, price, quantity, onChange }: BreadItemProps) => (
    <Card className="rounded-lg border-[2px] border-yellow-400 bg-white shadow-none">
        <CardContent className="p-[9px] flex items-center justify-between gap-4 text-sm font-semibold text-slate-800">
            <div className="flex-1">{name}</div>
            <div className="flex items-center gap-1">
                <span>{price.toLocaleString()}</span>
                <Edit />
            </div>
            <div className="flex items-center">
                <Button
                    className="rounded-full size-6 p-0 bg-[#1c2a5e] text-[#FFCC15]"
                    onClick={() => onChange(Math.max(0, quantity - 100))}
                >
                    -
                </Button>
                <span className="w-10 text-center">{quantity}</span>
                <Button
                    className="rounded-full size-6 p-0 bg-[#1c2a5e] text-[#FFCC15]"
                    onClick={() => onChange(quantity + 100)}
                >
                    +
                </Button>
            </div>
        </CardContent>
    </Card>
)
export const NewOrder = () => {
    const navigate = useNavigate()
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
            <div className="mt-[80px] p-5 space-y-6">
                <div>
                    <Label className="text-yellow-400 text-base font-semibold">Mijoz</Label>
                    <Select>
                        <SelectTrigger className="w-full bg-white rounded-xl">
                            <SelectValue placeholder="Boshqa" className="text-gray-200" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="1">Begoyim</SelectItem>
                                <SelectItem value="2">Farxod</SelectItem>
                                <SelectItem value="3">Chinara</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label className="text-yellow-400 text-base font-semibold">Telefon</Label>
                    <Input placeholder="Telefon raqami" className="w-full bg-white rounded-xl" type="number" />
                </div>
                <div>
                    <Label className="text-yellow-400 text-base font-semibold">Manzili</Label>
                    <Input placeholder="Begoyim" className="w-full bg-white rounded-xl" type="text" />
                </div>
                <div>
                    <Label className="text-yellow-400 text-base font-semibold">Izoh</Label>
                    <Input placeholder="Izoh yozing" className="w-full bg-white rounded-xl" type="text" />
                </div>
                <div className="space-y-3 pt-2">
                    <BreadItem name="Chig’atoy" price={5000} quantity={chigatoy} onChange={setChigatoy} />
                    <BreadItem name="Patir" price={5000} quantity={patir} onChange={setPatir} />
                    <BreadItem name="Buxonka" price={3000} quantity={buxonka} onChange={setBuxonka} />
                </div>
                <h1 className="text-white text-2xl font-semibold font-['Inter'] leading-none">Umumiy summa: 800 000</h1>
                <div className="flex justify-end">
                    <Button className="w-36 h-8 p-3 bg-[#FFCC15] text-[#1B2B56] hover:bg-[#FFCC15]">Saqlash</Button>
                </div>
            </div>
        </div>
    )
}
