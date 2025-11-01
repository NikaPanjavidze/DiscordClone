import React from "react";

const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full max-w-md z-10 shadow-[0_8px_32px_hsl(0_0%_0%_/_0.5)] border-border/50 bg-card/95 backdrop-blur-sm flex flex-col items-center">
      {children}
    </div>
  );
};

export default Card;
