import React from "react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const base =
    "px-4 py-2 rounded-md font-medium transition-colors duration-200 inline-flex items-center justify-center cursor-pointer";

  const variants = {
    primary: "bg-primary text-white hover:bg-primary/90",
    secondary:
      "bg-secondary text-foreground hover:bg-secondary/80 border border-border",
    ghost:
      "bg-transparent text-foreground hover:bg-foreground/10",
  };

  return (
    <button
      className={twMerge(clsx(base, variants[variant], className))}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
