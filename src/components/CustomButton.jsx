import React from "react";

const CustomButton = ({ btnType, title, handleClick, styles }) => {
  return (
    <div>
      <button
        type={btnType}
        className={`rounded-[10px] px-4 font-epilogue text-[16px] font-semibold leading-[26px] text-white ${styles}`}
        onClick={handleClick}
      >
        {title}
      </button>
    </div>
  );
};

export default CustomButton;
