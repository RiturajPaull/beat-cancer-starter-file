import React, { useState } from "react";
import { useStateContext } from "../../context";
import { usePrivy } from "@privy-io/react-auth";
import { useNavigate } from "react-router-dom";
const OnBoarding = () => {
  const [loader, setLoader] = useState(false);
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();
  const { user } = usePrivy();
  const { createUser } = useStateContext();
  // const [submitData, setSubmitData] = useState({
  //   username: "",
  //   age: "",
  //   location: "",
  // });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      const userData = {
        username,
        age: parseInt(age, 10),
        location,
        createdBy: user.email.address,
      };
      const newUser = await createUser(userData);
      console.log("New User", newUser);
      if (newUser) {
        navigate("/profile");
      }
    } catch (error) {
      console.log("Error", error);
    } finally {
      setLoader(false);
    }
  };
  return (
    <div className="flex min-h-[500px] items-center justify-center bg-[#13131a]">
      <div className="w-full max-w-md rounded-xl bg-[#1c1c24] p-8 shadow-lg">
        <h2 className="mb-2 text-center text-5xl font-bold">👋</h2>
        <h2 className="mb-6 text-center text-2xl font-bold text-white">
          Welcome!
        </h2>
        <h2 className="py-5 text-center text-xl font-bold text-white">
          Lets gets started
        </h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="mb-2 block text-sm text-neutral-400"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="focus: w-full rounded-lg bg-neutral-900 px-4 py-2 text-neutral-400 outline-none"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="age"
              className="mb-2 block text-sm text-neutral-400"
            >
              Age
            </label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              className="focus: w-full rounded-lg bg-neutral-900 px-4 py-2 text-neutral-400 outline-none"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="location"
              className="mb-2 block text-sm text-neutral-400"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="focus: w-full rounded-lg bg-neutral-900 px-4 py-2 text-neutral-400 outline-none"
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              onClick={handleSubmit}
              className="mt-3 w-full rounded-xl border bg-green-500 px-5 py-2 text-white hover:bg-green-700 hover:text-white"
            >
              {loader ? "Loading..." : "Get Started !!"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OnBoarding;
