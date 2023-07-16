/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import AddBook from "../pages/AddBook";
import AllBooks from "../pages/AllBook";
import DetailsBook from "../pages/DetailsBook";
import EditBook from "../pages/EditBook";
import WishList from "../pages/WishList";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/addbook",
        element: <AddBook />,
      },
      {
        path: "/allbooks",
        element: <AllBooks />,
      },
      {
        path: "/detailbook/:id",
        element: <DetailsBook />,
      },
      {
        path: "/editbook/:id",
        element: <EditBook />,
      },
      {
        path: "/wishlist",
        element: <WishList />,
      },
    ],
  },
]);

export default routes;
