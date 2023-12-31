/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useAppDispatch, useAppSelector } from "../redux/hook";
// import { format } from "date-fns";
import { IBook } from "./AllBook";
import { Link } from "react-router-dom";
import { removeFromWishList } from "../redux/features/wishlist/wishlistSlice";

const WishList = () => {
  const { books } = useAppSelector((state) => state.wishlist);
  const dispatch = useAppDispatch()
  

  return (
    <div className="max-w-screen-xl mx-auto pt-10 min-h-[60vh]">
      <h2 className="font-bold">Wish List</h2>

      <div className="mt-20 w-full">
        {books.map((item: Partial<IBook>, i: number) => {
          // const date = new Date(item?.PublicationDate);
          // const formattedDate = format(date, "dd MMM yyyy, HH:mm:ss");

          return (
            <div
              className="  p-3 rounded-md flex justify-between items-center border-b-4"
              key={i}
            >
              <div className="">
                <h4 className="text-md font-bold">Book Title: {item.Title}</h4>
                {/* <p className="text-[12px]">{formattedDate}</p> */}
                <p className="text-[12px]">{item?.PublicationDate}</p>
              </div>
              <p className="text-[16px] font-semibold">
                Category: {item?.Genre}
              </p>
              <p className="text-[] font-semibold">Author: {item.Author}</p>
              <div className="flex gap-5">
                <Link to={`/detailbook/${item?._id}`}>
                  <div className="bg-blue-400 hover:bg-blue-500  py-2 px-5 mt-2 text-center rounded-md cursor-pointer">
                    View
                  </div>
                </Link>
                <div onClick={()=> dispatch(removeFromWishList(item))} className="bg-red-400 hover:bg-red-500  py-2 px-5 mt-2 text-center rounded-md cursor-pointer">
                  Delete
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WishList;
