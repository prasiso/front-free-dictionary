import React, { useState } from "react";
import { InputType } from ".";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Controller } from "react-hook-form";
export function Input({
  label,
  name,
  required,
  control,
  showEye = false,
  type = "text",
  rules,
}: InputType) {
  const [showPassword, setShowPassword] = useState(true);
  const togglePass = () => {
    setShowPassword((prev) => !prev);
  };

  const showPass = (type: string) => {
    if (type !== "password") return type;
    return showPassword ? "password" : "text";
  };
  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        rules={{
          required: required ? `o Campo ${label} é obrigatório` : false,
          ...rules,
        }}
        render={({ field, fieldState }) => (
          <>
            <div className="relative">
              <input
                {...field}
                value={field.value ?? ""}
                id={name}
                type={showPass(type)}
                className={`w-full px-3 py-2 border ${
                  fieldState.invalid ? "border-red-500" : "boder-gray-300"
                }
      rounded-md shadown-sm focus:outline-none focus:ring-2 focus:ring-blue-500
      `}
              />
              {type === "password" && showEye && (
                <span
                  onClick={togglePass}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              )}
            </div>
            {fieldState.error && (
              <p className="text-red-500 text-sm mt-1">
                {fieldState.error.message}
              </p>
            )}
          </>
        )}
      ></Controller>
    </div>
  );
}
