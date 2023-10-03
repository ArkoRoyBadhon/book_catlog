/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useGetAllBooksQuery } from "../redux/features/book/bookApi";
// import { format } from "date-fns";
import { BsSearch } from "react-icons/bs";

export type IBook = {
  [x: string]: any;
  _id?: string;
  Title: string;
  Author: string;
  Genre: string;
  PublicationDate: number;
  finish?: boolean | undefined;
};

const AllBooks = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [searchValue, setSearchValue] = useState("");
  const [finalValue, setFinalValue] = useState("");
  const [selectedGenre, setselectedGenre] = useState("");
  const [selectedYear, setselectedYear] = useState("");

  const {
    data: booklist,
    isLoading,
    isSuccess,
  } = useGetAllBooksQuery({ finalValue, selectedGenre,selectedYear });

  if (isLoading) {
    return (
      <div className="h-[100vh] w-[100vw] flex justify-center items-center">
        Loading ....
      </div>
    );
  }
  if (isSuccess) {
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setFinalValue(searchValue);
    };

    const handleClick = () => {
      if (formRef.current) {
        formRef.current.dispatchEvent(new Event("submit", { bubbles: true }));
      }
    };

    console.log("BookLL", booklist.data);
    

    return (
      <div className="max-w-screen-xl mx-auto mb-10 min-h-[60vh]">
        <div className="mt-5 mx-2 md:mx-0 w-full">
          <h4 className="font-semibold">Filter Options</h4>

          <form
            onSubmit={handleSearch}
            className="flex items-center"
            ref={formRef}
          >
            <input
              type="text"
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="border border-blue-300 p-2 rounded-l-md my-2 w-full outline-blue-300 inline"
            />
            <label
              htmlFor="search"
              className="inline border py-3 px-5 hover:bg-blue-400 transition-all ease-in cursor-pointer rounded-r-md"
              onClick={handleClick}
            >
              <BsSearch />
            </label>
            <input type="submit" hidden name="search" id="search" />
          </form>
          <div className="flex flex-col md:flex-row mt-2 gap-3 md:gap-10">
            <div className="">
              <select
                className="border border-blue-200 py-2 px-5 rounded outline-blue-400"
                id="selectOption"
                value={selectedGenre}
                onChange={(e) => setselectedGenre(e.target.value)}
              >
                <option value="">-- Select Genre--</option>
                <option value="SiFi">SiFi</option>
                <option value="Thriller">Thriller</option>
                <option value="Drama">Drama</option>
                <option value="Horror">Horror</option>
              </select>
            </div>
            <div className="">
              <select
                className="border border-blue-200 py-2 px-5 rounded outline-blue-400"
                id="selectOption"
                value={selectedYear}
                defaultValue="2023"
                onChange={(e) => setselectedYear(e.target.value)}
              >
                <option value="">-- Select Publication Year--</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
                <option value="2017">2017</option>
                <option value="2016">2016</option>
                <option value="2015">2015</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-20 mx-2 md:mx-0 w-full">
          {booklist.data.length > 0 ? booklist?.data.map((item: Partial<IBook>, i: number) => {
            // const date = new Date(item?.PublicationDate);
            // const formattedDate = format(date, "dd MMM yyyy, HH:mm:ss");

            return (
              <div
                className=" h-fit p-3 rounded-md shadow-customShadow hover:shadow-customShadowHover"
                key={i}
              >
                <h4 className="text-md font-bold">Book Title: {item.Title}</h4>
                {/* <p className="text-[12px]">{formattedDate}</p> */}
                <p className="text-[12px]">Publication Year: {item?.PublicationDate}</p>
                <p className="text-[16px] font-semibold">
                  Genre: {item?.Genre}
                </p>
                <p className="text-[] font-semibold">Author: {item.Author}</p>
                <Link to={`/detailbook/${item?._id}`}>
                  <div className="bg-blue-400 hover:bg-blue-500 py-2 mt-2 text-center rounded-md cursor-pointer">
                    View
                  </div>
                </Link>
              </div>
            );
          })
          :
          <div className="text-center font-bold w-full">
            No Data Found!
          </div>
        }
        </div>
        <div className="">
          <div className="flex flex-wrap"></div>
        </div>
      </div>
    );
  }
};

export default AllBooks;
