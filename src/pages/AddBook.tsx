/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAppSelector } from "../redux/hook";
import { useCreateBookMutation } from "../redux/features/book/bookApi";

interface IBook {
  Title: string;
  Author: string;
  Genre: string;
  PublicationDate: number;
  AuthorId: string;
  reviews: string[]
}

const AddBook = () => {
  const [createBook, {isSuccess, isError}] = useCreateBookMutation();
  const { user } = useAppSelector((state: { user: any }) => state.user);
  const { email } = useAppSelector((state) => state.user.user);


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
    reset,
    handleSubmit,
  } = useForm<IBook>();
  const onSubmit: SubmitHandler<IBook> = (data) => {
    const jsonData = {
      Title: data.Title,
      Author: data.Author,
      PublicationDate: Number(data.PublicationDate),
      Genre: data.Genre,
      AuthorId: data.AuthorId
    };

    const bookInfo = {
      data: jsonData,
    };

    console.log("book info",bookInfo);
    
    createBook(bookInfo)
    reset();
  };


  if(user.email === null) {
    console.log(user.email);
  }

  

  return (
    <div className="pt-10 mx-2 md:mx-0">
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
            <label htmlFor="firstName">Publication Year</label>
            <br />
            <input
              type="number"
              {...register("PublicationDate")}
              placeholder="Publication Date"
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
                // value={selectedGenre}
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
              {...register("Genre")}
              placeholder="Genre"
              className="border border-blue-300 p-2 rounded-md my-2 w-full outline-blue-300"
            /> */}
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
          {
            email ?
            <input
            className="bg-blue-400 w-full mt-5 py-2 rounded-md text-white font-bold hover:bg-blue-500"
            type="submit"
            value="Create"
          />
          :
          <div
          onClick={()=> toast.error("Please Login First to create Book")}
            className="bg-blue-400 w-full mt-5 py-2 rounded-md text-white font-bold hover:bg-blue-500 text-center">
              Create Book
            </div>
          }
        </form>
      </div>
    </div>
  );
};

export default AddBook;
