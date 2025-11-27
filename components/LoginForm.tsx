"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { loginSchema, type LoginFormData } from "@/lib/validations/auth";
import FormInput from "./FormInput";

export default function LoginFormWithReusableComponent() {
  const { login, isLoggingIn } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange", // Validate on change
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormData) => {
    login({ email: data.email, password: data.password });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
          <User className="w-8 h-8 text-indigo-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
        <p className="text-gray-600 mt-2">Sign in to access your dashboard</p>
      </div>

      <div className="space-y-5">
        <FormInput
          label="Email Address"
          id="email"
          type="email"
          placeholder="eve.holt@reqres.in"
          disabled={isLoggingIn || isSubmitting}
          error={errors.email}
          register={register("email")}
        />

        <FormInput
          label="Password"
          id="password"
          type="password"
          placeholder="••••••••"
          disabled={isLoggingIn || isSubmitting}
          error={errors.password}
          register={register("password")}
        />

        <button
          onClick={handleSubmit(onSubmit)}
          disabled={isLoggingIn || isSubmitting}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoggingIn || isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Signing in...
            </>
          ) : (
            "Sign In"
          )}
        </button>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800 font-medium mb-1">
          Demo Credentials:
        </p>
        <p className="text-xs text-blue-700">Email: eve.holt@reqres.in</p>
        <p className="text-xs text-blue-700">Password: cityslicka</p>
      </div>
    </div>
  );
}
