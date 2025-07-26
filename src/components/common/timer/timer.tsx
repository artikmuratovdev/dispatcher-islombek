import { useEffect, useState } from "react";
import { Props } from "./types";

export const Timer: React.FC<Props> = ({ initialTime }) => {
  const [time, setTime] = useState<number>(initialTime);

  useEffect(() => {
    if (time > 0) {
      const timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [time]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };
  return (
    <div className="text-[#1b2b56] text-base font-semibold font-inter leading-none">
      {formatTime(time)}
    </div>
  );
};
