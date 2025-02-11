import React from "react";

const customColors = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white",
  success: "bg-green-600 hover:bg-green-700 text-white",
  error: "bg-red-600 hover:bg-red-700 text-white",
  neutral: "bg-gray-600 hover:bg-gray-700 text-white",
  white: "bg-white text-black shadow-md hover:bg-gray-200",
};

const ButtonSubmit = ({
  children,
  color = "primary",
  onClick,
  size = "medium",
  _type = "submit",
}) => {
  const sizeClasses = {
    small: "px-3 py-1 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg",
  };

  return (
    <button
      type={_type}
      onClick={onClick}
      className={`rounded-md ${customColors[color]} ${sizeClasses[size]} transition duration-200`}
    >
      {children}
    </button>
  );
};

export default ButtonSubmit;
