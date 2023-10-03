import { Link } from "react-router-dom";
import booklogo from "../assets/Book.png";
import { useAppSelector } from "../redux/hook";

const Footer = () => {

  const {email} = useAppSelector(state => state.user.user)

  return (
    <div className="mt-10 bg-gray-200 px-2 md:px-0">
      <div className=" flex justify-between items-center max-w-screen-lg mx-auto">
        <div className="flex flex-col py-[100px]">
          <h4 className="text-xl">Routes</h4>
          <Link className="text-blue-400 font-bold" to="/">Home</Link>
          <Link className="text-blue-400 font-bold" to="/allbooks">All Books</Link>
          <Link className="text-blue-400 font-bold" to="/wishlist">WishList</Link>
          <div className="">
            You Are Logged In As a {email}
          </div>
        </div>
        <div className="w-[20%] h-full">
          <img className="w-60 h-40" src={booklogo} alt="logo" />
        </div>
      </div>
      <p className="text-center py-2 bg-gray-300">
        CopyRight &copy; Arko Roy Badhon
      </p>
    </div>
  );
};

export default Footer;
