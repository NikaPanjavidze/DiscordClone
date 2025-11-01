interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id?: string;
  error?: FieldError;
}

import React from "react";
import Label from "./Label";
import type { FieldError } from "react-hook-form";
import { FormError } from "../Form/FormError";

const Input: React.FC<InputProps> = ({ label, id, error, ...props }) => {
  return (
    <div className="flex flex-col space-y-1">
      {error && (
        <FormError
          message={error.message || "Something went wrong. Please try again."}
        />
      )}
      {label && <Label label={label} htmlFor={id}></Label>}
      <input
        {...props}
        id={id}
        className="w-full rounded-md bg-secondary px-3 py-2 border border-border 
                   focus:outline-none focus:ring-2 focus:ring-primary 
                   text-foreground placeholder:text-foreground/50"
      />
    </div>
  );
};

export default Input;
