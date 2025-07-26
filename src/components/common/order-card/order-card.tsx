import { Card, CardContent } from "@/components/ui/card";

const ITEM =
    [
        { name: "Chig'atoy", price: "5 000", count: "0" },
        { name: "Patir", price: "5 000", count: "1000" },
        { name: "Buxonka", price: "3 000", count: "100" },
    ]
export const OrderCard = () => {
    return (
        ITEM.map((item, index) => (
            <Card
                key={index}
                className="rounded-lg border-2 border-[#FFCC15] bg-white shadow-sm"
            >
                <CardContent className="flex items-center justify-between py-4 px-6">
                    <h1 className="font-semibold text-sm">{item.name}</h1>
                    <h2 className="text-sm">{item.price}</h2>
                    <p className="text-sm">{item.count}</p>
                </CardContent>
            </Card>
        ))
    );
};
