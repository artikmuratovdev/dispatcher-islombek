import { breadInfo } from "@/app/api/order/types";
import { Card, CardContent } from "@/components/ui/card";
import { formatNumber } from "@/utils";

export const OrderCard = ({ item }: { item: breadInfo }) => {
  return (
    <Card className="rounded-lg border-2 border-[#FFCC15] bg-white shadow-sm">
      <CardContent className="flex items-center justify-between py-4 px-6">
        <h1 className="font-semibold text-sm">{item.title}</h1>
        <h2 className="text-sm">{formatNumber(item.breadSoldPrice)}</h2>
        <p className="text-sm">{formatNumber(item.amount)}</p>
      </CardContent>
    </Card>
  );
};
