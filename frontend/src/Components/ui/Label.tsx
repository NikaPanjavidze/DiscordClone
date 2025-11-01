import React from "react";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  label?: string;
}

const Label: React.FC<LabelProps> = ({ label }) => {
  return (
    <label className="text-sm font-medium text-muted-foreground uppercase">{label}</label>
  );
};

export default Label;
