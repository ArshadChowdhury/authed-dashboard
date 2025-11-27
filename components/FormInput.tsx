"use client";

import { AlertCircle } from "lucide-react";
import { UseFormRegister, FieldError } from "react-hook-form";

interface FormInputProps {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: FieldError;
  register: ReturnType<UseFormRegister<any>>;
}

export default function FormInput({
  label,
  id,
  type = "text",
  placeholder,
  disabled,
  error,
  register,
}: FormInputProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
      </label>
      <input
        {...register}
        id={id}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full px-4 py-3 text-gray-950 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition disabled:opacity-50 disabled:cursor-not-allowed ${
          error ? "border-red-500 bg-red-50" : "border-gray-300"
        }`}
      />
      {error && (
        <div className="mt-1 flex items-center gap-1 text-red-600 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error.message}</span>
        </div>
      )}
    </div>
  );
}
