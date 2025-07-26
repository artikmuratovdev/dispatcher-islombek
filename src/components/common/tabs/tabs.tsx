import { useState } from "react";
import { Props } from "./types";
import { cn } from "@/lib/utils";

export const Tabs = ({
    tabs,
    defaultTabIndex,
    contentClassName,
    tabsClassName,
    tabClassName,
    setValue,
}: Props) => {
    const [activeTabIdx, setActiveTabIdx] = useState(defaultTabIndex || 0);

    if (!tabs?.length) {
        return "";
    }

    return (
        <div className="max-w-full">
            <div className={tabsClassName}>
                <div className="w-full overflow-x-auto">
                    <div className={cn("flex bg-white rounded-lg", tabClassName)}>
                        {tabs.map((tab, index) => (
                            <button
                                type="button"
                                key={index}
                                onClick={() => {
                                    if (setValue && tab?.value) {
                                        setValue(tab?.value);
                                    }
                                    setActiveTabIdx(index);
                                }}
                                className={cn(
                                    "flex-1 duration-150 ease-in-out text-main rounded-lg px-4 py-2 flex items-center justify-center text-[15px] font-bold leading-[130%]",
                                    activeTabIdx === index ? "bg-[#FFCC15]" : "bg-white",
                                )}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            {tabs[activeTabIdx]?.children ? (
                <div className={contentClassName}>{tabs[activeTabIdx].children}</div>
            ) : (
                ""
            )}
        </div>
    );
};