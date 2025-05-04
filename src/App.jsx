import React from "react";
import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home/Home";
import OnBoarding from "./Pages/OnBoarding/OnBoarding";
import Profile from "./Pages/Profile/Profile";
import { useStateContext } from "./context";
import { usePrivy } from "@privy-io/react-auth";
import Index from "./Pages/records";
import SingleRecordDetails from "./Pages/records/single-record-details";
// import OnBoarding from "./Pages/OnBoarding";

const App = () => {
  const navigate = useNavigate();
  // const { currentUser } = useStateContext();

  // const { authenticated, ready, login } = usePrivy();

  // useEffect(() => {
  //   if (ready && !authenticated) {
  //     login();
  //   } else if (authenticated && !currentUser) {
  //     navigate("/onboarding");
  //   }
  // }, [ready, currentUser, navigate]);
  return (
    <div className="relative flex min-h-screen flex-row bg-[#131318] p-4">
      <div className="hidded relative mr-10 hidden sm:flex">
        {/* Sidebar */}
        <Sidebar />
      </div>

      <div className="mx-auto max-w-[1280px] flex-1 max-sm:w-full sm:pr-5">
        {/* Navbar */}
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/onboarding" element={<OnBoarding />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/medical-records" element={<Index />} />
          <Route
            path="/medical-records/:id"
            element={<SingleRecordDetails />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
