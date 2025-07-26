import { MAIN_TABS_LINK } from "@/mock";
import { Link, useLocation } from "react-router-dom";

export const Footer = () => {
  const location = useLocation();

  return (
    <div className="border-t-2 border-[#FFCC15] rounded-t-[40px] bg-[#1C2C57] p-[12px] fixed bottom-0 w-full">
      <div className="flex w-full justify-evenly items-center">
        {MAIN_TABS_LINK.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link to={item.path} key={item.id}>
              <div className="flex flex-col items-center text-center">
                <span
                  className={`${isActive ? "text-[#FFCC15]" : "text-white"
                    } text-lg`}
                >
                  {item.icon}
                </span>
                <p
                  className={`text-[11px] mt-[2px] font-semibold font-inter leading-[14.30px] ${isActive ? "text-[#FFCC15]" : "text-white"
                    }`}
                >
                  {item.title}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
