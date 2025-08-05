import { Card, CardContent } from "@/components/ui/card"
import { Edit } from "@/icons"

type BreadItemProps = {
    name: string
    price: number
    quantity: number
}
export const BreadItem = ({ name, price, quantity}: BreadItemProps) => (
    <Card className="rounded-lg border-[2px] border-yellow-400 bg-white shadow-none">
        <CardContent className="p-[9px] flex items-center justify-between gap-4 text-sm font-semibold text-slate-800">
            <div className="flex-1">{name}</div>
            <div className="flex items-center gap-1">
                <span>{price.toLocaleString()}</span>
                <Edit />
            </div>
            <div className="flex items-center">
                <span
                    className="rounded-full flex justify-center items-center size-6 p-0 bg-[#1c2a5e] text-[#FFCC15]"
                >
                    -
                </span>
                <span className="w-10 text-center">{quantity}</span>
                <span
                    className="rounded-full flex justify-center items-center size-6 p-0 bg-[#1c2a5e] text-[#FFCC15]"
                >
                    +
                </span>
            </div>
        </CardContent>
    </Card>
)