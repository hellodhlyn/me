import React from "react";

interface ButtonProps {
  children: React.ReactNode;
}

export function Button({ children }: ButtonProps) {
  return (
    <span className="p-2 bg-gray-000 text-gray-900 hover:opacity-50 transition cursor-pointer">
      {children}
    </span>
  );
}
