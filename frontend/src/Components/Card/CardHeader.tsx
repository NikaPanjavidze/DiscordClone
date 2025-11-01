import React from "react";

const CardHeader = ({ children }: { children: React.ReactNode }) => {
  return <div className="text-center my-6 space-y-3">{children}</div>;
};

export default CardHeader;
