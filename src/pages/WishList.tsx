/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React from "react";
import { useAppSelector } from "../redux/hook";
import { format } from "date-fns";
import { IBook } from "./AllBook";
import { Link } from "react-router-dom";

const WishList = () => {
  const { books } = useAppSelector((state) => state.wishlist);

  console.log(books);

  return (
    <div className="max-w-screen-xl mx-auto pt-10">
      <h2 className="font-bold">Wish List</h2>

      <div className="grid grid-cols-4 gap-10 mt-20">
        {books.map((item: Partial<IBook>, i: number) => {
          const date = new Date(item?.PublicationDate);
          const formattedDate = format(date, "dd MMM yyyy, HH:mm:ss");

          return (
            <div
              className=" h-fit p-3 rounded-md shadow-customShadow hover:shadow-customShadowHover"
              key={i}
            >
              <h4 className="text-md font-bold">Book Title: {item.Title}</h4>
              <p className="text-[12px]">{formattedDate}</p>
              <p className="text-[16px] font-semibold">
                Category: {item?.Genre}
              </p>
              <p className="text-[] font-semibold">Author: {item.Author}</p>
              <Link to={`/detailbook/${item?._id}`}>
                <div className="bg-blue-400 hover:bg-blue-500 py-2 mt-2 text-center rounded-md cursor-pointer">
                  View
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WishList;
