import React from "react";

const Button = ({ label, variant }) => {
  const contained = "text-white bg-teal-500 hover:text-teal-500 hover:bg-white";
  const outlined = "text-teal-500 bg-white hover:text-white hover:bg-teal-500";
  return (
    <>
      <button
        className={`border border-teal-500 font-bold rounded-md font-palanquin px-4 py-2 transition-all mx-1 ${
          variant == "outlined" ? outlined : contained
        } max-sm:text-sm max-sm:px-2 max-sm:py-1`}
      >
        {label}
      </button>
    </>
  );
};

export default Button;
