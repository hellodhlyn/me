import React, { MouseEventHandler } from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: MouseEventHandler;
}

export function Button({ children, onClick }: ButtonProps) {
  return (
    <span
      className="p-2 bg-gray-000 text-gray-900 hover:opacity-50 transition cursor-pointer"
      onClick={onClick}
    >
      {children}
    </span>
  );
}
