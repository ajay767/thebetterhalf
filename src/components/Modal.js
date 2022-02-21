import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { BsPlus } from "react-icons/bs";

const Modal = React.forwardRef(({ children }, ref) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  return mounted ? (
    createPortal(
      <div
        ref={ref}
        className="fixed top-0 right-0 bottom-0 left-0 text-dark-gray  bg-gray-600 bg-opacity-40     backdrop-filter backdrop-blur-sm  z-[1001] flex justify-center items-center "
      >
        {children}
      </div>,
      document.querySelector("#portal")
    )
  ) : (
    <></>
  );
});

export default Modal;
