import React, { useState } from "react";
import {
  deleteUserAccount,
  getUserAccounts,
  setUserAccount,
  setToken,
} from "@constant";
import { Link, useHistory } from "react-router-dom";
import { user } from "@services";
import { Button } from "@ui";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { BsThreeDotsVertical } from "react-icons/bs";
import Tippy from "@tippyjs/react";
import { catchError } from "@utils";
import { useAuth } from "@context/authContext";
import userPng from "@assets/avtar/user.png";
import john from "@assets/images/user4.jpeg";
import john2 from "@assets/images/user5.jpeg";
import toast from "react-hot-toast";
import moment from "moment";

function InputField({ label, name, placeholder, type = "text" }) {
  return (
    <div className="flex flex-col ">
      <label className="text-sm mb-1">{label}</label>
      <Field
        name={name}
        type={type}
        className="text-sm rounded p-2 pl-4 outline-none border-0 ring-1 ring-gray-300 "
        placeholder={placeholder || label}
      />
      <ErrorMessage
        name={name}
        component={({ children }) => (
          <p className="text-sm text-red-500 mt-2">{children}</p>
        )}
      />
    </div>
  );
}

function LoginUserCard({
  profile,
  username,
  onClick,
  handleDelete,
  createdAt,
}) {
  return (
    <div className="flex p-2 px-4 bg-white shadow-md ring-slate-100 ring-1 rounded-md w-full  items-center justify-between space-x-2 my-2  ">
      <div
        onClick={onClick}
        className="flex items-center cursor-pointer space-x-2"
      >
        <img
          className="h-10 w-10 rounded-full object-cover "
          src={profile || userPng}
          alt={username}
        />
        <div className="overflow-hidden ">
          <p className="text-sm font-medium truncate ">Sign in as {username}</p>
          <p className="text-xs ">
            Last sign in, {moment(createdAt).fromNow()}
          </p>
        </div>
      </div>
      <Tippy
        interactive
        arrow={false}
        trigger="mouseenter"
        delay={0}
        theme="light"
        className="!bg-transparent   "
        content={
          <div
            onClick={handleDelete}
            className="bg-[#2a2a2a] z-[1000] shadow-md cursor-pointer  p-0 rounded overflow-hidden"
          >
            <p className="text-sm px-4 p-2 block hover:bg-black text-white">
              Remove
            </p>
          </div>
        }
      >
        <span className="block ml-auto cursor-pointer">
          <BsThreeDotsVertical size={20} />
        </span>
      </Tippy>
    </div>
  );
}

function Login() {
  const history = useHistory();
  const userData = useAuth();

  const [refreshKey, setRefreshKey] = useState(0);
  const [formState, setFormState] = useState(
    !Boolean(getUserAccounts().length)
  );

  const handleAuth = ({ data, token }) => {
    if (data.status) {
      toast.success(data.message);
      userData.signIn(data.user);
      setToken(data.token);
      setUserAccount({
        token: data.token,
        username: data.user.username,
        profile: data.user.profile,
        id: data.user._id,
        createdAt: new Date(),
      });
      setTimeout(() => {
        history.push("/home");
      }, 200);
    }
  };

  const handleLogin = async (e) => {
    try {
      const { data } = await user.login(e);
      handleAuth({ data, token: data.token });
    } catch (error) {
      catchError(error);
    } finally {
      setRefreshKey((e) => e + 1);
    }
  };

  const handleOneTapLogin = async (token) => {
    try {
      const { data } = await user.oneTapLogin({ token });
      handleAuth({ data, token: data.token });
    } catch (error) {
      catchError(error);
    } finally {
      setRefreshKey((e) => e + 1);
    }
  };

  return (
    <div className="bg-slate-100 p-4 min-h-screen  ">
      <div className="rounded-md w-full my-24 mx-auto md:w-96 p-4 bg-white shadow-md ">
        <h1 className=" font-medium text-3xl text-center logo__text">
          Better<span className="text-pink-600">half</span>
        </h1>
        {formState && (
          <Formik
            initialValues={{ password: "", email_mobile_username: "" }}
            validationSchema={Yup.object({
              password: Yup.string().min(8).required("Required"),
              email_mobile_username: Yup.string().required("Required"),
            })}
            onSubmit={handleLogin}
          >
            {(e) => (
              <Form className="flex flex-col gap-2 mt-8">
                <InputField name="email_mobile_username" label="Email" />
                <InputField name="password" type="Password" label="Password" />
                <p className="text-right text-sm text-gray-500">
                  <Link to="/forget-password">Forget Password ?</Link>
                </p>

                <Button disabled={e.isSubmitting} type="submit">
                  Sign in
                </Button>
              </Form>
            )}
          </Formik>
        )}

        {!formState && (
          <div className="py-4">
            {getUserAccounts().map((curr) => (
              <LoginUserCard
                key={curr.id}
                onClick={() => handleOneTapLogin(curr.token)}
                handleDelete={() => {
                  deleteUserAccount(curr.id);
                  setRefreshKey((e) => e + 1);
                }}
                createdAt={curr.createdAt}
                profile={curr.profile}
                username={curr.username}
                token={curr.token}
              />
            ))}

            <p
              onClick={() => setFormState(true)}
              className="rounded cursor-pointer p-2 px-4 text-sm text-center mt-4 block bg-pink-600 text-white "
            >
              Switch Account
            </p>
          </div>
        )}
        <p className="text-sm text-center mb-2">
          <Link
            to="/signup"
            className="rounded p-2 px-4 block bg-pink-600 text-white "
          >
            Create account
          </Link>
        </p>
        <p className="text-xs text-center text-gray-500">
          &copy; {new Date().getFullYear()}{" "}
          <a href="/" className="underline ">
            thebetterhalf.in
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
