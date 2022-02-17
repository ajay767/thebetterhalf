import React from "react";
import { setUserAccount, setToken } from "@constant";
import { user } from "@services";
import { Button } from "@ui";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "@context/authContext";
import { catchError } from "@utils";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

const initialValues = {
  username: "",
  password: "",
  confirmPassword: "",
  email: "",
  terms: false,
};

const validationSchema = Yup.object({
  username: Yup.string().required("Required"),
  password: Yup.string().min(8).required("Required"),
  confirmPassword: Yup.string()
    .required("Required")
    .when("password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf([Yup.ref("password")], "Passwords are not same"),
    }),
  email: Yup.string().email("Invalid email").required("Required"),
  terms: Yup.bool().oneOf([true], "Please agree to terms and condition."),
});

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

function Signup() {
  const history = useHistory();
  const userData = useAuth();

  const handleSignup = async (e) => {
    try {
      const { data } = await user.signup(e);
      if (data.status) {
        setToken(data.token);
        userData.signIn(data.user);
        toast.success(data.message);
        const accountData = {
          profile: "",
          username: data.user.username,
          createdAt: new Date(),
          id: data.user._id,
          token: data.token,
        };
        setUserAccount(accountData);
        setTimeout(() => {
          history.push("/home");
        }, 200);
      }
    } catch (error) {
      catchError(error);
    }
  };

  return (
    <div className="bg-slate-100 p-4 min-h-screen  ">
      <div className="rounded-md w-full my-24 mx-auto md:w-96 p-4 bg-white shadow-md ">
        <h1 className=" font-medium text-3xl text-center logo__text">
          Better<span className="text-pink-600">half</span>
        </h1>
        <Formik
          onSubmit={handleSignup}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {(e) => (
            <Form className="flex flex-col gap-4 mt-8 mb-4">
              <InputField name="username" label="Username" />
              <InputField name="email" label="Email" type="email" />
              <InputField name="password" label="Password" type="password" />
              <InputField name="confirmPassword" label="Confirm Password" />

              <div>
                <Field
                  type="checkbox"
                  name="terms"
                  className="h-4 w-4 text-pink-600 rounded-sm mr-2 outline-none ring-0"
                  type="checkbox"
                  id="terms_condition"
                />
                <label
                  htmlFor="terms_condition"
                  className="text-gray-700 text-xs"
                >
                  Agree to terms and condition.
                </label>
                <ErrorMessage
                  name="terms"
                  component={({ children }) => (
                    <p className="text-sm text-red-500 mt-2">{children}</p>
                  )}
                />
              </div>
              <Button disabled={e.isSubmitting} type="submit">
                Sign up
              </Button>
            </Form>
          )}
        </Formik>
        <p className="text-sm text-center mb-2">
          <Link to="/login">Already have an account, sign in instead</Link>
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

export default Signup;
