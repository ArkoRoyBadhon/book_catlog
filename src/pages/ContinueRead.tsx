/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useAppDispatch, useAppSelector } from "../redux/hook";
// import { format } from "date-fns";
import { IBook } from "./AllBook";
import { Link } from "react-router-dom";
import {
  removeFromReadList,
  updateReadList,
} from "../redux/features/readlist/readlistSlice";
import { useState } from "react";
import { toast } from "react-toastify";

const ContinueRead = () => {
  const [finishRead, setFinishRead] = useState(false);
  const { books } = useAppSelector((state) => state.readlist);
  const dispatch = useAppDispatch();

  console.log("checkBox", finishRead);

  return (
    <div className="max-w-screen-xl mx-auto pt-10 min-h-[60vh]">
      <h2 className="font-bold">Read List</h2>

      <div className="mt-20 w-full">
        {books.map((item: Partial<IBook>, i: number) => {
          // const date = new Date(item?.PublicationDate);
          // const formattedDate = format(date, "dd MMM yyyy, HH:mm:ss");

          return (
            <div
              className=" h-fit p-3 rounded-md flex justify-between items-center border-b-4"
              key={i}
            >
              {/* <div className="">
                <h4 className="text-md font-bold">Book Title: {item.Title}</h4>
                <p className="text-[12px]">{formattedDate}</p>
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
                <div onClick={()=> dispatch(removeFromReadList(item))} className="bg-red-400 hover:bg-red-500  py-2 px-5 mt-2 text-center rounded-md cursor-pointer">
                  Delete
                </div>
              </div> */}

              <table className="w-full">
                <thead className="border-b">
                  <th className="w-[20%]">Title</th>
                  <th className="w-[20%]">Genre</th>
                  <th className="w-[20%]">Author</th>
                  <th className="w-[20%]">Status</th>
                  <th className="w-[20%]">Action</th>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-center">{item?.Title}</td>
                    <td className="text-center">{item?.Genre}</td>
                    <td className="text-center">{item?.Author}</td>
                    <td className="text-center">
                      <label className="mr-1" htmlFor="finish">
                        finish
                      </label>
                      <input
                        onChange={() => {
                          setFinishRead(!finishRead);
                          dispatch(
                            updateReadList({ ...item, finish: !finishRead })
                          );
                          toast("Successfully updated status of ReadList", {
                            toastId: "redlist update",
                          });
                        }}
                        type="checkbox"
                        name="finish"
                        id="finish"
                        checked={item?.finish}
                      />
                      {/* <select onChange={()=> dispatch(books(item))}>
                        <option value="">Read Soon</option>
                        <option value="">Continue Reading</option>
                        <option value="">Finished</option>
                      </select> */}
                    </td>
                    <td className="text-center">
                      <div className="flex gap-5">
                        <Link to={`/detailbook/${item?._id}`}>
                          <div className="bg-blue-400 hover:bg-blue-500  py-2 px-5 mt-2 text-center rounded-md cursor-pointer">
                            View
                          </div>
                        </Link>
                        <div
                          onClick={() => dispatch(removeFromReadList(item))}
                          className="bg-red-400 hover:bg-red-500  py-2 px-5 mt-2 text-center rounded-md cursor-pointer"
                        >
                          Delete
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContinueRead;
