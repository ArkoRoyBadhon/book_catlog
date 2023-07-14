/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from "react";
import booklogo from "../assets/Book.png";
import { BiSolidUserCircle } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGetUserQuery } from "../redux/features/user/userApi";
import { useAppDispatch } from "../redux/hook";
import { setLoggedEmail } from "../redux/features/user/userSlice";

const Navbar = () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data: userData, isLoading, isSuccess } = useGetUserQuery(undefined);
  const dispacth = useAppDispatch()


  if (isLoading) {
    console.log("pending");
  }

  if(isSuccess){
    dispacth(setLoggedEmail(userData.email))
  }
  console.log("data", userData);

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
              {userData?.success === true ? (
                <li className="font-bold text-[16px] cursor-pointer">
                  <Link to="/signup">Log Out</Link>
                </li>
              ) : (
                <>
                  <li className="font-bold text-[16px] cursor-pointer">
                    <Link to="/signup">Sign Up</Link>
                  </li>
                  <li className="font-bold text-[16px] cursor-pointer">
                    <Link to="/login">Log In</Link>
                  </li>
                </>
              )}

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
