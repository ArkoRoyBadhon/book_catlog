/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteBookMutation,
  useGetAllBooksQuery,
} from "../redux/features/book/bookApi";
import { IBook } from "./AllBook";
import { format } from "date-fns";
import { toast } from "react-toastify";
const DetailsBook = () => {
  const { data: booklist, isLoading } = useGetAllBooksQuery(undefined);

  const [deleteBook, { isSuccess: isSuccessDelete }] = useDeleteBookMutation();

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="h-[100vh] w-[100vw] flex justify-center items-center">
        Loading ....
      </div>
    );
  }

  if (isSuccessDelete) {
    toast("Successfully deleted", {
      toastId: "book delete",
    });
    navigate("/allbooks");
  }

  const selectedItem: IBook = booklist?.data?.filter(
    (item: IBook) => item?._id === id
  );

  const handleDeleteBook = async (id: string | undefined) => {
    await deleteBook(id);
  };

  return (
    <div className="max-w-screen-lg mx-auto mt-10">
      <h3 className="font-bold">Detail Page</h3>
      <div className="mt-5">
        {selectedItem.map((item: IBook) => {
          const date = new Date(item?.PublicationDate);
          const formattedDate = format(date, "dd MMM yyyy, HH:mm:ss");
          return (
            <div key={item?._id}>
              <hr />
              <div className="flex gap-5 my-5">
                <div className="rounded-md py-2 px-5 bg-blue-400 hover:bg-blue-500 cursor-pointer">
                  Edit
                </div>
                <div
                  onClick={() => handleDeleteBook(item?._id)}
                  className="rounded-md py-2 px-5 bg-red-400 hover:bg-red-500 cursor-pointer"
                >
                  Delete
                </div>
              </div>
              <hr />
              <div className="text-xl font-semibold mt-5">
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
              <div className="mt-5">
                {" "}
                <span className="font-semibold">Description: </span> description
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DetailsBook;
