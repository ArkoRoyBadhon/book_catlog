/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useParams } from "react-router-dom";
import { useGetAllBooksQuery } from "../redux/features/book/bookApi";
import { IBook } from "./AllBook";
import { format } from "date-fns";
const DetailsBook = () => {
  const {
    data: booklist,
    isLoading,
    isSuccess,
  } = useGetAllBooksQuery(undefined);

  const { id } = useParams<{ id: string }>();

  if (isLoading) {
    return (
      <div className="h-[100vh] w-[100vw] flex justify-center items-center">
        Loading ....
      </div>
    );
  }

  if (isSuccess) {
    const selectedItem: IBook = booklist?.data?.filter(
      (item: IBook) => item?._id === id
    );

    return (
      <div className="max-w-screen-lg mx-auto mt-10">
        <h3 className="font-bold">Detail Page</h3>
        <div className="mt-10">
          {selectedItem.map((item: IBook) => {
            const date = new Date(item?.PublicationDate);
            const formattedDate = format(date, "dd MMM yyyy, HH:mm:ss");
            return (
              <div key={item?._id}>
                <div className="text-xl font-semibold">
                  Title: {item?.Title}
                </div>
                <div className="text-[12px] font-semibold">
                  Publish Date: {formattedDate}
                </div>
                <div className="text-lg font-semibold mt-2">
                  Author: {item?.Title}
                </div>
                <div className="text-lg font-semibold mt-2">
                  Author: {item?.Genre}
                </div>
                <div className="mt-5"> <span className="font-semibold">Description: </span> description</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

export default DetailsBook;
