/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useDeleteBookMutation,
  useGetAllBooksQuery,
  usePostReviewMutation,
} from "../redux/features/book/bookApi";
import { IBook } from "./AllBook";
// import { format } from "date-fns";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { addToWishList } from "../redux/features/wishlist/wishlistSlice";
import { addToReadList } from "../redux/features/readlist/readlistSlice";
const DetailsBook = () => {
  const [reviewVal, setReviewVal] = useState<string>("");
  const [bookID, setBookID] = useState<string | undefined>();
  const { data: booklist, isLoading } = useGetAllBooksQuery({
    finalValue: "",
    selectedGenre: "",
    selectedYear: "",
  });

  const [deleteBook, { isSuccess: isSuccessDelete, isError: isErrorDelete }] =
    useDeleteBookMutation();

  const [postReview] = usePostReviewMutation();

  const { email } = useAppSelector((state) => state.user.user);
  const { books } = useAppSelector((state) => state.wishlist);
  const { books: readBooks } = useAppSelector((state) => state.readlist);
  const dispatch = useAppDispatch();

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
  if (isErrorDelete) {
    toast("You do not have ownership of this book", {
      toastId: "book error delete",
    });
  }

  const selectedItem: IBook = booklist?.data?.filter(
    (item: IBook) => item?._id === id
  );

  const handleDeleteBook = async (id: string | undefined) => {
    if (email) {
      await deleteBook(id);
    } else {
      toast.error("Please Login First");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const reviewData = {
      id: bookID,
      data: { data: reviewVal },
    };

    
    await postReview(reviewData);
  };

  const handleWithList = (item: IBook) => {
    const exists = books.filter((book: IBook) => book?._id === item?._id);

    if (exists.length === 0) {
      dispatch(addToWishList(item));
      toast.success("Book Added to WishList Successfully");
    } else {
      toast.error("ALready added to WishList");
    }
  };

  const handleReadList = (item: IBook) => {
    const exists = readBooks.filter((book: IBook) => book?._id === item?._id);

    if (exists.length === 0) {
      dispatch(addToReadList(item));
      toast.success("Book Added to ReadList Successfully");
    } else {
      toast.error("ALready added to ReadList");
    }
  };

  return (
    <div className="max-w-screen-lg mx-auto mt-10">
      <h3 className="font-bold mx-2 md:mx-0">Detail Page</h3>
      <div className="mt-5 mx-2 md:mx-0">
        {selectedItem.map((item: IBook) => {
          // const date = new Date(item?.PublicationDate);
          // const formattedDate = format(date, "dd MMM yyyy, HH:mm:ss");
          // console.log(item?.reviews);

          return (
            <div key={item?._id}>
              <hr />
              <div
                className={`flex flex-col md:flex-row justify-between items-center my-5`}
              >
                  <div className="flex gap-5 my-5">
                    {email ? (
                      <Link to={`/editbook/${item?._id}`}>
                        <div className="rounded-md py-2 px-5 bg-blue-400 hover:bg-blue-500 cursor-pointer">
                          Edit
                        </div>
                      </Link>
                    ) : (
                      // <Link to={`/editbook/${item?._id}`}>
                      <div
                        onClick={() => toast.error("Please Login First")}
                        className="rounded-md py-2 px-5 bg-blue-400 hover:bg-blue-500 cursor-pointer"
                      >
                        Edit
                      </div>
                      // </Link>
                    )}

                    <div
                      onClick={() => handleDeleteBook(item?._id)}
                      className="rounded-md py-2 px-5 bg-red-400 hover:bg-red-500 cursor-pointer"
                    >
                      Delete
                    </div>
                  </div>
                

                <div className="flex gap-5 my-5">
                  <div
                    onClick={() => handleReadList(item)}
                    className="rounded-md py-2 px-5 bg-red-400 hover:bg-red-500 cursor-pointer"
                  >
                    Read List
                  </div>
                  <div
                    onClick={() => {
                      handleWithList(item);
                    }}
                    className="rounded-md py-2 px-5 bg-red-400 hover:bg-red-500 cursor-pointer"
                  >
                    Add To WishList
                  </div>
                </div>
              </div>
              <hr />
              <div className="text-xl font-semibold mt-5">
                Title: {item?.Title}
              </div>
              <div className="text-[12px] font-semibold">
                Publish Date: {item?.PublicationDate}
              </div>
              {/* <div className="text-[12px] font-semibold">
                Publish Date: {formattedDate}
              </div> */}
              <div className="text-lg font-semibold mt-2">
                Author: {item?.Author}
              </div>
              <div className="text-lg font-semibold mt-2">
                Genre: {item?.Genre}
              </div>
              <div className="mt-5">
                {" "}
                <span className="font-semibold">Description: </span> description
              </div>
              <div className=" mt-20">
                <h4 className="text-xl font-semibold underline">
                  Review Section
                </h4>
                <form action="" className="" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="review"
                    onChange={(e) => {
                      setReviewVal(e.target.value), setBookID(item?._id);
                    }}
                    required
                    placeholder="Leave a comment"
                    className="border border-blue-300 p-2 rounded-md my-2 w-full outline-blue-300"
                  />
                  {email ? (
                    <input
                      type="submit"
                      value="Submit"
                      className="bg-blue-400 hover:bg-blue-500 py-2 px-5 rounded-md mt-2"
                    />
                  ) : (
                    <div className="bg-blue-400 hover:bg-blue-500 py-2 px-5 rounded-md mt-2 w-fit">
                      Submit
                    </div>
                  )}
                </form>

                <div className="">
                  <h5 className="mt-5 font-bold">Reviews</h5>
                  {item?.reviews.map((review: string, j: number) => {
                    return (
                      <div key={j} className="mt-3 text-md">
                        {`>`} {review}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DetailsBook;
