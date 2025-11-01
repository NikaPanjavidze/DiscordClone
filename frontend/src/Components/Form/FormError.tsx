// src/components/ui/FormError.tsx
import { AlertCircle } from "lucide-react";

interface FormErrorProps {
  message: string;
  className?: string;
}

export const FormError: React.FC<FormErrorProps> = ({
  message,
  className,
}: FormErrorProps) => {
  if (!message) return null;

  return (
    <div
      className={`mt-1 flex items-center gap-2 text-sm text-red-600 ${className}`}
    >
      <AlertCircle className="h-4 w-4 shrink-0" />
      <span>{message}</span>
    </div>
  );
};
