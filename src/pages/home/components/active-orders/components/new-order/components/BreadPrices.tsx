import {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Edit } from "@/icons";
import { Minus, Plus } from "lucide-react";
import toast from "react-hot-toast";
import { breadInfo } from "@/app/api/_order/types";

type Props = {
  bread: breadInfo;
  onChange: (id: string, value: number) => void;
  setBreads: React.Dispatch<React.SetStateAction<breadInfo[]>>;
};

const BreadPrices = forwardRef(function BreadPrices(
  { bread, onChange, setBreads }: Props,
  ref
) {
  const [count, setCount] = useState(0);
  const [price, setPrice] = useState(bread.breadSoldPrice);
  const [priceVisible, setPriceVisible] = useState(false);

  const priceInputRef = useRef<HTMLInputElement>(null);
  const countInputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      priceInputRef.current?.focus();
    },
  }));

  useEffect(() => {
    setPrice(bread.breadSoldPrice);
  }, [bread.breadSoldPrice]);

  useEffect(() => {
    if (price === 0) {
      onChange(bread._id, 0);
      return;
    }

    onChange(bread._id, count * price);

    setBreads((prev) => {
      if (count === 0) {
        return prev.filter((b) => b._id !== bread._id);
      }

      const exists = prev.find((b) => b._id === bread._id);
      if (exists) {
        return prev.map((b) =>
          b._id === bread._id
            ? { ...b, breadSoldPrice: price, amount: count }
            : b
        );
      }

      return [
        ...prev,
        {
          ...bread,
          breadSoldPrice: price,
          amount: count,
        },
      ];
    });
  }, [count, price]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setPriceVisible(false);
        priceInputRef.current?.blur();
        countInputRef.current?.blur();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleEditClick = () => {
    setPriceVisible((visible) => {
      const newState = !visible;
      if (!newState) {
        priceInputRef.current?.blur();
      } else {
        setTimeout(() => priceInputRef.current?.focus(), 0);
      }
      return newState;
    });
  };

  return (
    <div
      ref={wrapperRef}
      className="grid grid-cols-3 gap-5 bg-white rounded-lg px-3 py-2"
    >
      <h3 className="text-blue-950 font-semibold">{bread.title}</h3>

      <div className="text-blue-950 font-semibold flex gap-2 justify-center mr-5">
        {!priceVisible && <p>{price}</p>}

        <input
          ref={priceInputRef}
          type="number"
          value={price}
          onChange={(e) => {
            const val = Number(e.target.value);
            setPrice(isNaN(val) ? 0 : val);
          }}
          className={`max-w-[80px] ${
            priceVisible ? "block" : "hidden"
          } border border-[#FFCC15] transition-all duration-200 appearance-none 
          [&::-webkit-inner-spin-button]:appearance-none 
          [&::-webkit-outer-spin-button]:appearance-none`}
        />

        <span onClick={handleEditClick}>
          <Edit className="text-yellow cursor-pointer" />
        </span>
      </div>

      <div className="text-blue-950 font-semibold flex items-center justify-center gap-2">
        <Minus
          className="bg-primary text-[#FFCC15] rounded-lg p-0.5 cursor-pointer"
          onClick={() => setCount((prev) => Math.max(prev - 1, 0))}
        />

        <input
          ref={countInputRef}
          type="number"
          value={count}
          onChange={(e) => {
            const value = Number(e.target.value);
            setCount(isNaN(value) ? 0 : Math.max(value, 0));
          }}
          className="w-10 text-center border border-[#FFCC15] rounded bg-white
            [&::-webkit-inner-spin-button]:appearance-none 
            [&::-webkit-outer-spin-button]:appearance-none 
            [appearance:textfield]"
        />

        <Plus
          className="bg-primary text-[#FFCC15] rounded-lg p-0.5 cursor-pointer"
          onClick={() => {
            if (price > 0) {
              setCount((prev) => prev + 1);
            } else {
              toast.error("Narx nol bo‘lishi mumkin emas");
            }
          }}
        />
      </div>
    </div>
  );
});

export default BreadPrices;
