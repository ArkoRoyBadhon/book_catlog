/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Link } from "react-router-dom";
import { useGetAllBooksQuery } from "../redux/features/book/bookApi";
import { format } from "date-fns";

export type IBook = {
  [x: string]: any;
  _id?: string;
  Title: string;
  Author: string;
  Genre: string;
  PublicationDate: any;
};

const AllBooks = () => {
  const {
    data: booklist,
    isLoading,
    isSuccess,
  } = useGetAllBooksQuery(undefined);

  if (isLoading) {
    return (
      <div className="h-[100vh] w-[100vw] flex justify-center items-center">
        Loading ....
      </div>
    );
  }
  if (isSuccess) {
    const pageNumber = Math.ceil(booklist?.meta.count / booklist?.meta.limit);

    return (
      <div className="max-w-screen-xl mx-auto mb-10">
        <div className="mt-5 mx-2 md:mx-0">
          <h4 className="font-semibold">Filter Options</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-20 mx-2 md:mx-0">
          {booklist?.data.map((item: Partial<IBook>, i: number) => {
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
        <div className="">
          <div className="flex flex-wrap"></div>
        </div>
      </div>
    );
  }
};

export default AllBooks;
