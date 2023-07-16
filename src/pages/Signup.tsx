/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */

import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCreateUserMutation } from "../redux/features/user/userApi";
import { toast } from "react-toastify";
import { useAppSelector } from "../redux/hook";

interface Iinput {
  fName: string;
  lName: string;
  email: string;
  password: string;
}

const Signup = () => {
  const [createUser, { isLoading, isSuccess }] = useCreateUserMutation();
  const { user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  if (isSuccess) {
    toast("User created succesfully!", {
      toastId: "user created",
    });
  }
  if (isLoading) {
    toast("Please wait a moment while creating user!", {
      toastId: "pending",
    });
  }

  const {
    register,
    handleSubmit,
  } = useForm<Iinput>();
  const onSubmit: SubmitHandler<Iinput> = (data) => {
    const jsonData = {
      password: data.password,
      email: data.email,
      name: {
        firstName: data.fName,
        lastName: data.lName,
      },
    };

    const userInfo = {
      data: jsonData,
    };

    createUser(userInfo);
  };

  if (user.email) {
    navigate("/");
  }

  return (
    <div className="">
      <div className="flex justify-center items-center mt-10">
        <form
          style={{ boxShadow: "0 2px 8px rgba(0.2, 0.4, 0.2, 0.4)" }}
          className=" w-[450px] py-10 px-5 rounded-md mx-3 md:mx-0"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h3 className="text-2xl font-bold text-center text-blue-600 mb-10">
            Sign Up
          </h3>
          <div className="flex gap-5">
            <div className="">
              <label htmlFor="firstName">First Name</label>
              <br />
              <input
                type="text"
                {...register("fName")}
                placeholder="First Name"
                className="border border-blue-300 p-2 rounded-md my-2 w-full outline-blue-300"
              />
            </div>
            <div className="">
              <label htmlFor="firstName">Last Name</label>
              <br />
              <input
                type="text"
                {...register("lName")}
                placeholder="Last Name"
                className="border border-blue-300 p-2 rounded-md my-2 w-full outline-blue-300"
              />
            </div>
          </div>
          <div className="">
            <label htmlFor="firstName">Email Address</label>
            <br />
            <input
              type="email"
              {...register("email")}
              placeholder="Enter your Email"
              className="border border-blue-300 p-2 rounded-md my-2 w-full outline-blue-300"
            />
          </div>
          <div className="">
            <label htmlFor="firstName">Password</label>
            <br />
            <input
              type="password"
              {...register("password")}
              placeholder="Password"
              className="border border-blue-300 p-2 rounded-md my-2 w-full outline-blue-300"
            />
          </div>
          <input
            className="bg-blue-400 w-full mt-5 py-2 rounded-md text-white font-bold hover:bg-blue-500"
            type="submit"
            value="Sign Up"
          />

          <div className="text-sm text-slate-500 mt-5">
            Already have an account?{" "}
            <Link to="/login" className="font-bold text-blue-400">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
