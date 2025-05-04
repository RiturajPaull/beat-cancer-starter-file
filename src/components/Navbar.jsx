import React, { useCallback, useState } from "react";
import { menu, search } from "../assets";
import CustomButton from "./CustomButton";
import { usePrivy } from "@privy-io/react-auth";
import { IconHeartHandshake } from "@tabler/icons-react";
import navLinks from "../constants";
import { Link } from "react-router-dom";

const Navbar = () => {
  // distract logout property from privy hook
  const { ready, authenticated, login, user, logout } = usePrivy();
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const [isActive, setIsActive] = useState("dashboard");
  console.log("user info", user);
  const handleLoginLogout = useCallback(() => {
    if (authenticated) {
      logout();
    } else {
      // it is a async function, so everytime the use logs-in i want to fetch the user data from the database
      login().then(() => {
        //check if the user is present in db or not
        if (user) {
          console.log(user);
          //fetch the user data from db
        }
      });
    }
  }, [authenticated, login, logout, user]);

  return (
    <div className="mb-[25px] flex flex-col-reverse justify-between gap-6 md:flex-row">
      {/* search bar component */}
      <div className="flex h-[52px] max-w-full flex-row rounded-[100px] bg-black py-2 pl-4 pr-2 md:flex-1 lg:flex-1">
        <input
          type="text"
          placeholder="search for records"
          className="flex w-full bg-transparent font-epilogue text-[14px] font-normal text-white outline-none placeholder:text-[#4b5264]"
        />
        <div className="flex h-full w-[72px] cursor-pointer items-center justify-center rounded-[20px] bg-[#4acd8c]">
          <img
            src={search}
            alt="search"
            className="h-[15px] w-[15px] object-contain"
          />
        </div>
      </div>
      {/* Log-out/ Log-in*/}
      <div className="flex hidden flex-row items-center justify-center gap-2 sm:flex">
        <CustomButton
          btnType={"button"}
          // Using the authenticity hook from privy
          title={authenticated ? "Logout" : "Login"}
          styles={authenticated ? "bg-green-500 " : "bg-purple-500"}
          handleClick={handleLoginLogout}
        />
      </div>
      <div className="relative flex items-center justify-between sm:hidden">
        {/* logo in mobile screen */}
        <div className="flex h-[40px] cursor-pointer items-center justify-center rounded-[10px] bg-slate-950">
          <IconHeartHandshake size={40} color="#1ec070" className="p-2" />
        </div>
        <img
          src={menu}
          alt="menu"
          className="h-[34px] w-[34px] cursor-pointer object-contain"
          onClick={() => {
            setToggleDrawer((prev) => !prev);
          }}
        />
        <div
          className={`absolute left-0 right-0 top-[60px] z-10 bg-slate-950 py-4 shadow-secondary ${!toggleDrawer ? "-translate-y-[100vh]" : "translate-y-0"} transition-all duration-700`}
        >
          <ul className="mb-4">
            {navLinks.map((link) => {
              return (
                <Link to={link.link} key={link.name}>
                  <div className="mb-3 flex gap-3 text-white">
                    <div className="flex">
                      <img src={link.imageUrl} />
                    </div>
                    <li
                      className={`flex rounded-[10px] p-4 ${isActive === link.name && "bg-gray-800"}`}
                      onClick={() => {
                        setIsActive(link.name);
                        setToggleDrawer(false);
                      }}
                    >
                      {link.name}
                    </li>
                  </div>
                </Link>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
