import { IconChairDirector, IconChevronRight } from "@tabler/icons-react";
import React from "react";

const MetricsCard = ({ title, subTitle, value, icon: Icon, onClick }) => {
  return (
    <div className="dark:border-nuetral-800 flex flex-col rounded-xl border border-slate-700 bg-[#13131a] shadow-sm">
      <div className="flex justify-between gap-x-3 p-4 md:p-5">
        {/* Title and Value */}
        <div>
          <p className="text-xs uppercase tracking-wide text-neutral-500">
            {title}
          </p>
          <div className="mt-1 flex items-center gap-x-2">
            <h3 className="font-md text-xl text-neutral-200 sm:text-2xl">
              {value}
            </h3>
          </div>
        </div>
        {/* Icon */}
        <div className="flex size-[46px] h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-gray-700 text-blue-200 dark:bg-[#1c1c24]">
          <Icon size={25} className="text-green-500" />
        </div>
      </div>
      {/* Lower section of the card as a clickable link */}
      <a
        href="#"
        onClick={onClick}
        className="inline-flex items-center justify-between rounded-b-xl border-t border-gray-200 border-neutral-800 px-4 py-3 text-sm text-gray-600 text-neutral-400 hover:bg-neutral-800 md:px-5"
      >
        <p>{subTitle}</p>
        <IconChevronRight />
      </a>
    </div>
  );
};

export default MetricsCard;
