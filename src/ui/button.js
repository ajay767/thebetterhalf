import React from "react";

function Button({ children, disabled, ...props }) {
  return (
    <button
      className={`p-2 px-4   text-sm rounded mt-4 mb-2 ${
        disabled
          ? "bg-slate-600 text-white cursor-not-allowed "
          : "bg-pink-600 text-white"
      }`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
