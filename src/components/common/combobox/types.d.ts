import { client } from "@/app/api/order/types";


export interface ComboboxProps {
  clients: client[];
  value?: string;
  setValues: (value: client) => void;
  onChange: (value: string) => void;
  changeBreadPrices?: (value: ComboboxOption) => void;
  placeholder?: string;
}

type ComboboxOption = {
  id: string;
  fullName: string;
};
