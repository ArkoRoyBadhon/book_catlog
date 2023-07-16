/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAppSelector } from "../redux/hook";
import {
  useGetSingleBookQuery,
  useUpdateBookMutation,
} from "../redux/features/book/bookApi";
import { useNavigate, useParams } from "react-router-dom";

interface IBook {
  Title: string;
  Author: string;
  Genre: string;
  Publicationdate: Date;
  AuthorId: string;
  reviews: string[];
}

const EditBook = () => {
  const { id } = useParams<{ id: string }>();
  const { data: singleBookData } = useGetSingleBookQuery(id);
  const [updateBook, { isSuccess, isError }] = useUpdateBookMutation();
  const { user } = useAppSelector((state) => state.user);

  const navigate = useNavigate();

  if (isSuccess) {
    toast("Book Updated succesfully!", {
      toastId: "book created",
    });
  }
  if (isError) {
    toast("Something went wrong or you do not have ownership of this book", {
      toastId: "book-creation-error",
    });
  }

  const {
    register,
    handleSubmit,
  } = useForm<IBook>();
  const onSubmitEdit: SubmitHandler<IBook> = (data) => {
    const jsonData = {
      Title: data.Title !== "" ? data.Title : singleBookData?.data?.Title,
      Author: data.Author !== "" ? data.Author : singleBookData?.data?.Author,
      Genre: data.Genre !== "" ? data.Genre : singleBookData?.data?.Genre,
      AuthorId:
        data.AuthorId !== "" ? data.AuthorId : singleBookData?.data?.AuthorId,
    };

    const bookInfo = {
      id,
      data: jsonData,
    };

    updateBook(bookInfo);
  };

  if (!user.email) {
    console.log(!user.email);
    navigate("/login");
  }

  console.log(singleBookData?.data?.Genre);

  return (
    <div className="">
      <div className="flex justify-center items-center">
        <form
          style={{ boxShadow: "0 2px 8px rgba(0.2, 0.4, 0.2, 0.4)" }}
          className=" w-[450px] py-10 px-5 rounded-md mt-14"
          onSubmit={handleSubmit(onSubmitEdit)}
        >
          <h3 className="text-2xl font-bold text-center text-blue-600 mb-10">
            Edit and Update Book
          </h3>
          <div className="">
            <label htmlFor="Title">Title</label>
            <br />
            <input
              type="text"
              defaultValue={singleBookData?.data?.Title}
              {...register("Title")}
              placeholder="Book Title"
              className="border border-blue-300 p-2 rounded-md my-2 w-full outline-blue-300"
            />
          </div>
          <div className="">
            <label htmlFor="Author">Author</label>
            <br />
            <input
              type="text"
              defaultValue={singleBookData?.data?.Author}
              {...register("Author")}
              placeholder="Author"
              className="border border-blue-300 p-2 rounded-md my-2 w-full outline-blue-300"
            />
          </div>
          <div className="">
            <label htmlFor="Genre">Genre</label>
            <br />
            <select
              className="border border-blue-200 py-2 px-5 rounded outline-blue-400 w-full"
              id="selectOption"
              {...register("Genre")}
              defaultValue={singleBookData?.data?.Genre}
              // onChange={(e) => setselectedGenre(e.target.value)}
            >
              <option value="">-- Select Genre--</option>
              <option value="SiFi">SiFi</option>
              <option value="Thriller">Thriller</option>
              <option value="Drama">Drama</option>
              <option value="Horror">Horror</option>
            </select>
            {/* <input
              type="text"
              defaultValue={singleBookData?.data?.Genre}
              {...register("Genre")}
              placeholder="Genre"
              className="border border-blue-300 p-2 rounded-md my-2 w-full outline-blue-300"
            /> */}
          </div>
          <div className="hidden">
            <label htmlFor="AuthorId">AuthorId</label>
            <br />
            <input
              type="text"
              value={singleBookData?.data?.AuthorId}
              {...register("AuthorId")}
              placeholder="Author Id"
              className="border border-blue-300 p-2 rounded-md my-2 w-full outline-blue-300"
            />
          </div>
          <input
            className="bg-blue-400 w-full mt-5 py-2 rounded-md text-white font-bold hover:bg-blue-500"
            type="submit"
            value="Update"
          />
        </form>
      </div>
    </div>
  );
};

export default EditBook;
