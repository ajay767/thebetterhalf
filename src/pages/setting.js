import React, { useState, useRef } from "react";
import { FiChevronDown } from "react-icons/fi";
import { BsFillCameraFill } from "react-icons/bs";
import { MdAdd } from "react-icons/md";
import Header from "@front/Header";
import Wrapper from "@layout/Wrapper";
import api from "@constant/api";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Switch, Button } from "@ui";
import { catchError } from "@utils";
import { useAuth } from "@context/authContext";
import { updateProfile, updateProfilePicture } from "@services/user";
import { general } from "@services";
import toast from "react-hot-toast";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

function InputField({
  name,
  placeholder,
  label,
  type = "text",
  className = "",
  ...props
}) {
  return (
    <div className={`flex flex-col  ${className}`}>
      <label className="text-sm font-medium flex space-x-2 items-center  mb-1">
        {label}
      </label>
      <Field
        type={type}
        name={name}
        className="text-sm p-2 focus:ring-0  outline-none border-0 border-b pl-0     bg-white ring-gray-400 "
        placeholder={placeholder || label}
        {...props}
      />
      <ErrorMessage
        name={name}
        component={({ children }) => (
          <p className="text-red-500 text-xs my-2">{children}</p>
        )}
      />
    </div>
  );
}

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email"),
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  currentPassword: Yup.string().min(8),
  password: Yup.string()
    .min(8)
    .when(["currentPassword"], {
      is: (val) => {
        return val && val.length > 0;
      },
      then: Yup.string().min(8).required("Required"),
    }),
  confirmPassword: Yup.string()
    .min(8)
    .when(["password"], {
      is: (val) => {
        return val && val.length > 0;
      },
      then: Yup.string()
        .min(8)
        .required("Required")
        .oneOf([Yup.ref("password")], "Passwords mismatch"),
    }),
});

function Setting() {
  const profileRef = useRef();
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [options, setOptions] = useState({
    general: true,
    prefrence: true,
    security: true,
  });
  const userData = useAuth();
  const initialValues = {
    email: userData.email || "",
    status: userData.status || "",
    username: userData.username || "",
    firstName: userData.firstName || "",
    lastName: userData.lastName || "",
    isPrivate: userData.isPrivate || "",
    currentPassword: "",
    password: "",
    confirmPassword: "",
  };

  const handleUpdate = async (e) => {
    try {
      const obj = {};
      Object.keys(e).map((curr) => {
        if (e[curr]) obj[curr] = e[curr];
      });
      console.log(obj);
      if (obj.currentPassword) {
        if (
          !obj.password ||
          !obj.confirmPassword ||
          obj.password !== obj.confirmPassword
        ) {
          toast.error("Passwords do not match");
          return;
        }
      }
      const { data } = await updateProfile(obj);
      if (data.status) {
        toast.success(data.message);
        userData.updateUser(data.data);
      }
    } catch (error) {
      catchError(error);
    }
  };

  const toggleOption = (opt) => {
    setOptions((e) => {
      let nw = { ...e };
      nw[opt] = !e[opt];
      return nw;
    });
  };

  const handleProfilePicture = async (e) => {
    try {
      setUploading(true);
      const input = e.target.files[0];
      const res = await general.getSignedUrl({
        contentType: input.type,
      });
      const url = res.data.url;

      const formData = new FormData();
      formData.append("file", input);

      await api.put(url, input, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (data) => {
          const uptill = Math.round((100 * data.loaded) / data.total);

          setProgress(uptill);
        },
      });

      const imageUrl = url.split("?")[0];

      const user = await updateProfilePicture({ url: imageUrl });
      userData.updateUser(user.data.data);
    } catch (error) {
      catchError(error);
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <Wrapper className="p-4">
      <Header />
      <div>
        <input
          onChange={handleProfilePicture}
          type="file"
          className="hidden"
          id="profile"
          name="profile"
        />
        <label htmlFor="profile">
          <div className="relative cursor-pointer ">
            <div className="h-[120px]  w-[120px]  relative  rounded-full  mx-auto my-4">
              <img
                ref={profileRef}
                src={userData.profile}
                alt="user"
                className=" h-full w-full rounded-full object-cover "
              />
              {!uploading && (
                <span className="flex items-center justify-center bg-white absolute right-2 bottom-2 h-8 w-8 ring-2 shadow-md rounded-full ">
                  <BsFillCameraFill />
                </span>
              )}
            </div>

            {uploading && (
              <div className="h-[120px]  w-[120px] text-white font-medium flex items-center justify-center absolute top-0 right-0 left-0 bg-gray-600 bg-opacity-40  rounded-full  mx-auto">
                {`${progress} `}
                <span className="text-[10px] mt-[4px]">%</span>
              </div>
            )}
            {uploading && (
              <div className="h-[120px]  w-[120px] absolute top-0 right-0 left-0 mx-auto">
                <CircularProgressbar
                  className="text-pink-600 "
                  styles={buildStyles({
                    pathColor: "rgb(219,39,119,.9)",
                    textColor: "rgb(219,39,119,.9)",
                  })}
                  background={false}
                  strokeWidth={4}
                  value={progress}
                />
              </div>
            )}
          </div>
        </label>
        <p className="text-lg font-medium text-center">
          {userData.firstName + " " + userData.lastName}
        </p>
        <p className="text-sm font-medium  text-center my-4 w-8/12 mx-auto ">
          {userData.status}
        </p>
        <div className="flex space-x-2 w-max mx-auto my-2">
          <span className="hover:bg-pink-600 hover:text-white cursor-pointer   text-pink-600 text-xs p-2 px-4 rounded-full ring-1 ring-pink-600 block">
            Adventure
          </span>
          <span className="hover:bg-pink-600 hover:text-white cursor-pointer   text-pink-600 text-xs p-2 px-4 rounded-full ring-1 ring-pink-600 block">
            Riding
          </span>
          <span className="hover:bg-pink-600 hover:text-white cursor-pointer  flex items-center text-pink-600 text-xs p-2 rounded-full ring-1 ring-pink-600 ">
            <MdAdd size={18} />
          </span>
        </div>
      </div>
      <div className="">
        <Formik
          enableReinitialize
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={handleUpdate}
        >
          {(e) => {
            return (
              <Form>
                <div className="my-4 ">
                  <h4
                    onClick={() => toggleOption("general")}
                    className="font-medium text-slate-500 cursor-pointer  flex items-center justify-between   "
                  >
                    General <FiChevronDown size={24} />
                  </h4>
                  <div
                    className={` my-4 grid md:grid-cols-2 gap-2 ${
                      options.general ? "" : " hidden "
                    }`}
                  >
                    <InputField name="firstName" label="First name" />
                    <InputField name="lastName" label="Last name" />
                    <InputField name="username" label="Username" />
                    <InputField name="email" label="Email" />

                    <InputField
                      name="status"
                      label="Status"
                      as="textarea"
                      rows={2}
                      className="col-span-full"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="my-4 ">
                    <h4
                      onClick={() => toggleOption("security")}
                      className="font-medium text-slate-500 cursor-pointer  flex items-center justify-between   "
                    >
                      Security <FiChevronDown size={24} />
                    </h4>
                    <div
                      className={`flex flex-col space-y-2 my-4 ${
                        options.security ? "" : " hidden "
                      }`}
                    >
                      <InputField
                        name="currentPassword"
                        label="Current Password"
                      />
                      <InputField name="password" label="Password" />
                      <InputField
                        name="confirmPassword"
                        label="Confirm Password"
                      />
                    </div>
                  </div>
                  <div className="my-4 ">
                    <h4
                      onClick={() => toggleOption("prefrence")}
                      className="font-medium text-slate-500 cursor-pointer  flex items-center justify-between   "
                    >
                      Prefrences <FiChevronDown size={24} />
                    </h4>
                    <div className={`${options.prefrence ? "" : " hidden "}`}>
                      <div className="flex items-center justify-between  my-4 mb-2">
                        <label className="text-sm mb-1">Email</label>
                        <Switch name="email" />
                      </div>
                      <div className="flex items-center justify-between  my-2">
                        <label className="text-sm mb-1">Private Account</label>
                        <Switch
                          setValue={(val) => e.setFieldValue("isPrivate", val)}
                          value={e.values.isPrivate}
                          name="account_type"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <Button
                  disabled={e.isSubmitting}
                  type="submit"
                  className="ml-auto block mt-6"
                >
                  Update
                </Button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </Wrapper>
  );
}

export default Setting;
