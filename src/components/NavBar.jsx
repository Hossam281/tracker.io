import React from "react";
import { FaCirclePlus } from "react-icons/fa6";
import { RiCoinsFill } from "react-icons/ri";

const NavBar = ({ setModalOpen }) => {
  return (
    <nav className="w-[90%] md:w-[70%] h-20 bg-[#45474B] flex gap-5  z-50 top-3  rounded-full mx-auto sticky items-center justify-center cursor-pointer shadow-lg">
      <div className="flex mr-auto ml-6  md:gap-4 items-center gap-2  group ">
        <RiCoinsFill  className=" text-lg md:text-3xl  group-hover:scale-125 transition-all duration-300" color="#F4CE14" />
        <h1 className="text-lg md:text-3xl font-lobster drop-shadow-2xl text-[#F4CE14]">
           Tracker.io
        </h1>
      </div>
      <button onClick={() => setModalOpen(true)} className="flex font-bold mr-5   text-[#45474B] items-center gap-3 active:scale-90   bg-[#F4CE14] p-2 rounded-full transition-all duration-300 hover:bg-yellow-500 shadow-md">
        <span className="text-sm md:text-lg  p-1 ">New record </span>
        <FaCirclePlus color="#45474B" />
      </button>
    </nav>
  );
};

export default NavBar;
