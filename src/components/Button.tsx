import React, { MouseEventHandler } from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: MouseEventHandler;
}

export function Button({ children, onClick }: ButtonProps) {
  return (
    <span
      className="px-4 py-2 bg-gray-000 text-gray-900 text-base hover:opacity-50 transition cursor-pointer rounded-full"
      onClick={onClick}
    >
      {children}
    </span>
  );
}
