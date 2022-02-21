import React from "react";

function Button({ children, className, disabled, ...props }) {
  return (
    <button
      className={`p-2 px-4  text-xs md:text-sm rounded mt-4 mb-2 ${
        disabled
          ? "bg-slate-600 text-white cursor-not-allowed "
          : "bg-pink-600 text-white"
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
