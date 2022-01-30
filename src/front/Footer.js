import React from "react";

function Footer() {
  return (
    <div className="">
      <p className="text-sm text-gray-500">
        &copy; {new Date().getFullYear()}{" "}
        <a href="/" className="underline ">
          thebetterhalf.in
        </a>
      </p>
    </div>
  );
}

export default Footer;
