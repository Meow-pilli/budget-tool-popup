import React from "react";
import clsx from "clsx"; // Optional, for conditional class merging

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export const Card = ({ children, className }: CardProps) => {
  return (
    <div className={clsx("bg-white shadow-md rounded-lg p-4", className)}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className }: CardProps) => {
  return (
    <div className={clsx("border-b pb-2 mb-4", className)}>
      {children}
    </div>
  );
};

export const CardTitle = ({ children, className }: CardProps) => {
  return (
    <h2 className={clsx("text-lg font-bold text-gray-800", className)}>
      {children}
    </h2>
  );
};

export const CardContent = ({ children, className }: CardProps) => {
  return <div className={clsx(className)}>{children}</div>;
};
