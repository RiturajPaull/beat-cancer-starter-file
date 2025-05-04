import React, { useState } from "react";

import navLinks from "../constants";
import { sun } from "../assets";
import { Link, useNavigate } from "react-router-dom";
import { IconHeartHandshake } from "@tabler/icons-react";

const Icon = ({ styles, name, imageUrl, isActive, disabled, handleClick }) => {
  return (
    <div
      className={`flex h-[48px] w-[48px] items-center justify-center rounded-[10px] ${isActive && isActive === name && "bg-slate-700"} item-center flex justify-center ${styles}`}
      onClick={handleClick}
    >
      {!isActive ? (
        <img src={imageUrl} alt="beat-cancer-logo" className="h-6 w-6" />
      ) : (
        <img
          src={imageUrl}
          alt="beat-cancer-logo"
          className={`h-6 w-6 ${isActive !== name && "grayscale"}`}
        />
      )}
    </div>
  );
};

const Sidebar = () => {
  const [isActive, setIsActive] = useState("dashboard");

  return (
    <div className="sticky top-5 flex h-[93vh] flex-col items-center justify-between">
      <Link to="/">
        <div className="flex items-center justify-center rounded-[10px] bg-[#2c2f32] p-2">
          <IconHeartHandshake size={40} color="#1ec070" />
        </div>
        <div className="mt-12 flex h-full w-[76px] flex-1 flex-col items-center justify-between rounded-[20px] bg-[#1c1c24] py-4">
          <div className="flex flex-col items-center justify-center gap-3">
            {navLinks.map((link) => {
              return (
                <Link key={link.name} to={link.link}>
                  <Icon
                    {...link}
                    isActive={isActive}
                    handleClick={() => {
                      setIsActive(link.name);
                    }}
                  />
                </Link>
              );
            })}
          </div>

          <Icon
            styles="bg-[#1c1c2d] shadow-secondary flex items-center justify-center"
            imageUrl={sun}
          />
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
