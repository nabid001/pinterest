import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen w-full bg-gray-200 grid place-items-center">
      {children}
    </div>
  );
};

export default layout;
