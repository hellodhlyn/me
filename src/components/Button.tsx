import React, { MouseEventHandler } from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: MouseEventHandler;
}

export function Button({ children, onClick }: ButtonProps) {
  return (
    <div
      className="w-fit px-4 py-2 inline-block bg-gray-000 text-gray-900 text-base hover:opacity-50 transition cursor-pointer rounded-full"
      onClick={onClick}
    >
      {children}
    </div>
  );
}
