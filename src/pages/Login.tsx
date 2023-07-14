/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */

import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLoginUserMutation } from "../redux/features/user/userApi";
import { toast } from "react-toastify";
import { useAppSelector } from "../redux/hook";

interface Iinput {
  email: string;
  password: string;
}

const Login = () => {
  const [loginUser, { isLoading, isSuccess }] = useLoginUserMutation();
  const { email: LoggedEmail } = useAppSelector((state) => state.user.user);

  const navigate = useNavigate();
  if (isSuccess) {
    toast("User logged in succesfully!", {
      toastId: "user log in",
    });
  }
  if (isLoading) {
    toast("Please wait a moment while logging in user!", {
      toastId: "login pending",
    });
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Iinput>();
  const onSubmit: SubmitHandler<Iinput> = async (data) => {
    const jsonData = {
      password: data.password,
      email: data.email,
    };

    const loginInfo = {
      data: jsonData,
    };

    const result: any = await loginUser(loginInfo);
    if (result) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const accessToken = result?.data?.data?.accessToken;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      localStorage.setItem("access_token", accessToken);
      navigate("/");
    }
  };

  if (LoggedEmail) {
    navigate("/");
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
            Log In
          </h3>
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
            value="Log In"
          />

          <div className="text-sm text-slate-500 mt-5">
            New to this Site?{" "}
            <Link to="/signup" className="font-bold text-blue-400">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
