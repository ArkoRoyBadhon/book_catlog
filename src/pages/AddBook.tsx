/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAppSelector } from "../redux/hook";
import { useCreateBookMutation } from "../redux/features/book/bookApi";
import { useNavigate } from "react-router-dom";

interface IBook {
  Title: string;
  Author: string;
  Genre: string;
  Publicationdate: Date;
  AuthorId: string;
  reviews: string[]
}

const AddBook = () => {
  const [createBook, {isSuccess, isError}] = useCreateBookMutation();
  const { user } = useAppSelector((state: { user: any; }) => state.user);

  const navigate = useNavigate()

    if (isSuccess) {
      toast("Book created succesfully!", {
        toastId: "book created",
      });
    }
    if (isError) {
      toast("Something went wrong", {
        toastId: "book-creation-error",
      });
    }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IBook>();
  const onSubmit: SubmitHandler<IBook> = (data) => {
    const jsonData = {
      Title: data.Title,
      Author: data.Author,
      Genre: data.Genre,
      AuthorId: data.AuthorId
    };

    const bookInfo = {
      data: jsonData,
    };
    createBook(bookInfo)
  };


  if(user.email === null) {
    console.log(user.email);
    // navigate("/")
  }

  

  return (
    <div className="">
      <div className="flex justify-center items-center">
        <form
          style={{ boxShadow: "0 2px 8px rgba(0.2, 0.4, 0.2, 0.4)" }}
          className=" w-[450px] py-10 px-5 rounded-md "
          onSubmit={handleSubmit(onSubmit)}
        >
          <h3 className="text-2xl font-bold text-center text-blue-600 mb-10">
            Create Book
          </h3>
          <div className="">
            <label htmlFor="firstName">Title</label>
            <br />
            <input
              type="text"
              {...register("Title")}
              placeholder="Book Title"
              className="border border-blue-300 p-2 rounded-md my-2 w-full outline-blue-300"
            />
          </div>
          <div className="">
            <label htmlFor="firstName">Author</label>
            <br />
            <input
              type="text"
              {...register("Author")}
              placeholder="Author"
              className="border border-blue-300 p-2 rounded-md my-2 w-full outline-blue-300"
            />
          </div>
          <div className="">
            <label htmlFor="firstName">Genre</label>
            <br />
            <input
              type="text"
              {...register("Genre")}
              placeholder="Genre"
              className="border border-blue-300 p-2 rounded-md my-2 w-full outline-blue-300"
            />
          </div>
          <div className="hidden">
            <label htmlFor="firstName">AuthorId</label>
            <br />
            <input
              type="text"
              value={user.id!}
              {...register("AuthorId")}
              placeholder="Author Id"
              className="border border-blue-300 p-2 rounded-md my-2 w-full outline-blue-300"
            />
          </div>
          <input
            className="bg-blue-400 w-full mt-5 py-2 rounded-md text-white font-bold hover:bg-blue-500"
            type="submit"
            value="Create"
          />
        </form>
      </div>
    </div>
  );
};

export default AddBook;
