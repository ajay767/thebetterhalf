import React, { useState } from "react";
import ReactOTP from "react-otp-input";

function Step1({ onSubmit }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="flex flex-col space-x-2 mt-8"
    >
      <div className="flex flex-col ">
        <label className="text-sm mb-1">Email</label>
        <input
          className="text-sm rounded p-2 pl-4 outline-none border-0 ring-1 ring-gray-300 "
          placeholder="Email or Mobile"
        />
      </div>

      <button className="p-2 px-4 bg-pink-600 text-white text-sm rounded my-4">
        Next
      </button>
    </form>
  );
}

function Step2({ onSubmit }) {
  const [otp, setOtp] = useState("");
  return (
    <div className="my-4 mx-auto w-max">
      <label className="text-sm mb-1 text-center block">Enter OTP</label>
      <ReactOTP
        value={otp}
        onChange={(e) => {
          setOtp(e);
        }}
        isInputNum
        containerStyle="flex  space-x-4 my-4 mx-auto"
        inputStyle="!h-10  !w-10 bg-white rounded p-0"
        separator={<span>{"  "}</span>}
        numInputs={4}
      />
      <p className="text-sm my-2 text-center cursor-pointer hover:text-pink-700 ">
        Resend OTP
      </p>
      <button
        onClick={onSubmit}
        className="p-2 px-4 bg-pink-600 text-white text-sm mx-auto block rounded my-4"
      >
        Submit
      </button>
    </div>
  );
}

function ForgetPassword() {
  const [step, setStep] = useState(0);
  return (
    <div className="bg-slate-100 p-4 min-h-screen  ">
      <div className="rounded-md w-full my-24 mx-auto md:w-96 p-4 bg-white shadow-md ">
        <h1 className=" font-medium text-3xl text-center logo__text">
          Better<span className="text-pink-600">half</span>
        </h1>
        {step === 0 && <Step1 onSubmit={() => setStep((e) => e + 1)} />}
        {step === 1 && <Step2 onSubmit={() => setStep((e) => e - 1)} />}

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

export default ForgetPassword;
