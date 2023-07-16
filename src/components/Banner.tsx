import bookanimetion from "../assets/man-reading-book.svg";

const Banner = () => {
  return (
    <div className="h-[400px] rounded-b flex justify-between px-8 md:px-20 items-center">
      <div className="flex flex-col justify-center h-full">
        <h5 className="text-md md:text-xl font-semibold">Want to read book?</h5>
        <h2 className="text-xl md:text-3xl font-bold text-red-500">
          Then you come in the Right Place
        </h2>
      </div>
      <div className="">
        <img src={bookanimetion} alt="book" className="w-[300px]" />
      </div>
    </div>
  );
};

export default Banner;
