import { Card, CardContent } from "@/components/ui/card";
import { formatNumber } from "@/utils";

type BreadItemProps = {
  name: string;
  price: number;
  quantity: number;
};
export const BreadItem = ({ name, price, quantity }: BreadItemProps) => (
  <Card className="rounded-lg border-[2px] border-yellow-400 bg-white shadow-none">
    <CardContent className="p-[9px] flex items-center justify-between gap-4 text-sm font-semibold text-slate-800">
      <div className="flex-1">{name}</div>
      <span className="">{formatNumber(price)}</span>
      <span className="w-10 text-center">{quantity}</span>
    </CardContent>
  </Card>
);
