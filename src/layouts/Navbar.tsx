import React from "react";
import booklogo from "../assets/Book.png";
import { BiSolidUserCircle } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="w-full border-b-2 shadow-sm">
      <div className="mx-[100px] flex justify-between items-center gap-20 py-5">
        <div className="w-[20%] h-full">
          <img className="w-16 h-10" src={booklogo} alt="logo" />
        </div>
        <div className="w-[80%] h-full flex justify-between">
          <div className="">
            <ul className="flex gap-10">
              <li className="font-bold text-[16px] cursor-pointer">Home</li>
              <li className="font-bold text-[16px] cursor-pointer">
                All Books
              </li>
            </ul>
          </div>
          <div className="">
            <ul className="flex gap-5 justify-center">
              <li className="mt-1 mr-5 cursor-pointer">
                <FaSearch size={22} />
              </li>
              <li className="font-bold text-[16px] cursor-pointer">Sign Up</li>
              <li className="font-bold text-[16px] cursor-pointer">Log In</li>
              <li className="cursor-pointer">
                <BiSolidUserCircle size={26} />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
