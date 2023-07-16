/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useState } from "react";
import booklogo from "../assets/Book.png";
import { BiSolidUserCircle } from "react-icons/bi";
import { GiBookmark } from "react-icons/gi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useGetUserQuery } from "../redux/features/user/userApi";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { setLoggedInfo } from "../redux/features/user/userSlice";

const Navbar = () => {
  const [wishlist, setWishlist] = useState(false);
  const [runningbook, setRunningbook] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data: userData, isSuccess } = useGetUserQuery(undefined);
  const dispacth = useAppDispatch();
  const { wishlist: wishData, readlist  } = useAppSelector((state) => state);

  if (isSuccess) {
    dispacth(setLoggedInfo(userData.data));
  }
  const logOutHandler = () => {
    localStorage.setItem("access_token", "");
    window.location.reload();
  };

  return (
    <div className="w-full border-b-2 shadow-sm">
      <div className="mx-[100px] flex justify-between items-center gap-20 py-5">
        <div className="w-[20%] h-full">
          <img className="w-16 h-10" src={booklogo} alt="logo" />
        </div>
        <div className="w-[80%] h-full flex justify-between">
          <div className="">
            <ul className="flex gap-10">
              <li className="font-bold text-[16px] cursor-pointer">
                <Link to="/">Home</Link>
              </li>
              <li className="font-bold text-[16px] cursor-pointer">
                <Link to="/allbooks">All Books</Link>
              </li>
              {userData?.data?.email && (
                <li className="font-bold text-[16px] cursor-pointer">
                  <Link to="/addbook">Add New Book</Link>
                </li>
              )}
            </ul>
          </div>
          <div className="">
            <ul className="flex gap-5 justify-center">
              <Link to="/wishlist">
                <li
                  onMouseOver={() => setWishlist(true)}
                  onMouseOut={() => setWishlist(false)}
                  className="mt-1 mr-5 cursor-pointer relative"
                >
                  <AiOutlineShoppingCart size={22} />
                  <div className="absolute bg-green-400 w-5 rounded-full flex justify-center items-center -top-5 -left-2">
                    {wishData.total}
                  </div>
                  <div
                    className={`${
                      wishlist
                        ? "absolute bg-slate-300 w-20 p-1 rouneded-md -bottom-10 -left-6"
                        : "hidden"
                    }`}
                  >
                    Wish List
                  </div>
                </li>
              </Link>
              <Link to="/continueread">
                <li
                  onMouseOver={() => setRunningbook(true)}
                  onMouseOut={() => setRunningbook(false)}
                  className="mt-1 mr-5 cursor-pointer relative"
                >
                  <GiBookmark size={22} />
                  <div className="absolute bg-green-400 w-5 rounded-full flex justify-center items-center -top-5 -left-2">
                    {readlist.total}
                  </div>
                  <div
                    className={`${
                      runningbook
                        ? "absolute bg-slate-300 w-20 p-1 rouneded-md -bottom-17 -left-6"
                        : "hidden"
                    }`}
                  >
                    Read List
                  </div>
                </li>
              </Link>
              {userData?.success === true ? (
                <li className="font-bold text-[16px] cursor-pointer">
                  <Link onClick={() => logOutHandler()} to="/">
                    Log Out
                  </Link>
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
