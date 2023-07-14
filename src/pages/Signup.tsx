/* eslint-disable @typescript-eslint/no-misused-promises */
import React from "react";
import { Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";

interface Iinput {
  fName: string;
  lName: string;
  email: string;
  password: string;
}

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Iinput>();
  const onSubmit: SubmitHandler<Iinput> = (data) => {
    const userInfo = {
        "password": data.password,
        "email": data.email,
        "name": {
          "firstName": data.fName,
          "lastName": data.lName
        }
    };

    console.log(userInfo);
    
  };

  return (
    <div className="">
      <div className="flex justify-center items-center">
        <form
          style={{ boxShadow: "0 2px 8px rgba(0.2, 0.4, 0.2, 0.4)" }}
          className="mt-20 w-[450px] py-10 px-5 rounded-md "
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
