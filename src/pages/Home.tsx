/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useGetAllBooksQuery } from "../redux/features/book/bookApi";
import { format } from "date-fns";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";
import { IBook } from "./AllBook";

const Home = () => {
  const {
    data: booklist,
    isLoading,
    isSuccess,
  } = useGetAllBooksQuery(undefined);

  console.log(booklist);

  if (isLoading) {
    return (
      <div className="h-[100vh] w-[100vw] flex justify-center items-center">
        Loading ....
      </div>
    );
  }
  if (isSuccess) {
    return (
      <div className="max-w-screen-xl mx-auto mb-10">
        <Banner />
        <h5 className="text-2xl font-bold mt-10 mb-10 mx-2 md:mx-0">Latest Books</h5>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 mx-2 md:mx-0">
          {booklist?.data
            .slice(0, 10)
            .map((item: Partial<IBook>, i: number) => {
              const date = new Date(item?.PublicationDate);
              const formattedDate = format(date, "dd MMM yyyy, HH:mm:ss");

              return (
                <div
                  className=" h-fit p-3 rounded-md shadow-customShadow hover:shadow-customShadowHover"
                  key={i}
                >
                  <h4 className="text-md font-bold">
                    Book Title: {item.Title}
                  </h4>
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

        <div className="flex justify-center items-center">
          <Link to="/allbooks">
            <div className="bg-blue-400 hover:bg-blue-500 w-fit py-2 px-5 rounded-md my-10  font-bold text-white cursor-pointer">
              See All
            </div>
          </Link>
        </div>
      </div>
    );
  }
};

export default Home;
