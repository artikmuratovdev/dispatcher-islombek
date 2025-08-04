import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "@/icons";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export const UZBTime = ({
  fetchDate = false,
  onSelectDate,
}: {
  fetchDate?: boolean;
  onSelectDate?: (date: { startDate: string; endDate: string }) => void;
}) => {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Tashkent",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const optionsDate: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Tashkent",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      };
      setTime(new Date().toLocaleTimeString("en-GB", options));
      setDate(new Date().toLocaleDateString("en-GB", optionsDate));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const [selectedRange, setSelectedRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({ from: undefined, to: undefined });

  return (
    <div>
      {fetchDate ? (
        <Popover>
          <PopoverTrigger asChild>
            <div className={cn("")}>
              <div className="flex items-center gap-5 border border-yellow rounded-lg py-0.5 px-2">
                <div>
                  <p className="text-[14px] font-semibold leading-[1.1] tracking-[0px] text-white">
                    {selectedRange.from && selectedRange.to
                      ? format(
                          selectedRange.from ? selectedRange.from : "",
                          "yyyy.MM.dd"
                        ) +
                        " - " +
                        format(
                          selectedRange.to ? selectedRange.to : "",
                          "yyyy.MM.dd"
                        )
                      : date.split("/").join(".")}
                  </p>
                  <p className="text-[14px] font-semibold leading-[1.1] tracking-[0px] text-white">
                    {time}
                  </p>
                </div>
                <CalendarIcon className="text-yellow-500 w-[23px] h-[22px]" />
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="range"
              selected={
                selectedRange.from
                  ? { from: selectedRange.from, to: selectedRange.to }
                  : undefined
              }
              onSelect={(range : any) => {
                setSelectedRange({ from: range?.from, to: range?.to });
                if (range?.from && range?.to && onSelectDate) {
                  const startDate = format(range.from, "yyyy-MM-dd");
                  const endDate = format(range.to, "yyyy-MM-dd");
                  onSelectDate({ startDate, endDate });
                }
              }}
              initialFocus
              numberOfMonths={2}
              disabled={(date : Date) => date > new Date()}
            />
          </PopoverContent>
        </Popover>
      ) : (
        <div className="flex items-center gap-5 border border-yellow rounded-lg py-0.5 px-2">
          <div>
            <p className="text-[14px] font-semibold leading-[1.1] tracking-[0px] text-white">
              {date.split("/").join(".")}
            </p>
            <p className="text-[14px] font-semibold leading-[1.1] tracking-[0px] text-white">
              {time}
            </p>
          </div>
          <CalendarIcon className="text-yellow-400" />
        </div>
      )}
    </div>
  );
};