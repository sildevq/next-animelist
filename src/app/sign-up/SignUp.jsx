"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const SignUp = () => {
  const session = useSession();
  const router = useRouter();

  const { register, handleSubmit, watch, formState } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const onSubmit = async (data) => {
    try {
      console.log("SignUp data:", data);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      alert("Account created!");
      router.push("/login");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/");
    }
  }, [router, session.status]);

  if (session.status === "loading") {
    return (
      <div className="flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <h2 className="text-center text-3xl font-bold">Create an Account</h2>
      <div className="mt-2 text-center">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-600">
          Sign In
        </Link>
      </div>

      <div className="w-full max-w-md md:max-w-lg mx-auto px-4">
        <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Your name"
              {...register("name", {
                required: "Имя обязательно для заполнения",
                minLength: {
                  value: 2,
                  message: "Имя должно содержать не менее 2 символов",
                },
              })}
            />
            {formState.errors.name && (
              <p className="text-sm text-destructive">
                {formState.errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="you@example.com"
              {...register("email", {
                required: "Почта обязательна для заполнения",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Введите корректный email",
                },
              })}
            />
            {formState.errors.email && (
              <p className="text-sm text-destructive">
                {formState.errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("password", {
                  required: "Пароль обязателен для заполнения",
                  minLength: {
                    value: 5,
                    message: "Пароль должен содержать не менее 5 символов",
                  },
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOffIcon size={18} />
                ) : (
                  <EyeIcon size={18} />
                )}
              </button>
            </div>
            {formState.errors.password && (
              <p className="text-sm text-destructive">
                {formState.errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirm ? "text" : "password"}
                placeholder="••••••••"
                {...register("confirmPassword", {
                  required: "Подтверждение пароля обязательно",
                  validate: (value) =>
                    value === watch("password") || "Пароли не совпадают",
                })}
              />
              <button
                type="button"
                onClick={() => setShowConfirm((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showConfirm ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
              </button>
            </div>
            {formState.errors.confirmPassword && (
              <p className="text-sm text-destructive">
                {formState.errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Root errors */}
          {formState.errors.root && (
            <p className="text-sm text-destructive text-center">
              {formState.errors.root.message}
            </p>
          )}

          <Button
            type="submit"
            className="w-full mt-3"
            disabled={formState.isSubmitting}
          >
            {formState.isSubmitting ? <Spinner /> : "Sign Up"}
          </Button>
        </form>

        {/* Separator */}
        <div className="mt-5">
          <div className="flex items-center">
            <Separator className={"flex-1"} />
            <span className="mx-4 text-muted-foreground text-sm">OR</span>
            <Separator className={"flex-1"} />
          </div>
        </div>

        {/* Google Auth */}
        <div className="mt-5">
          <Button
            variant="outline"
            className={"w-full flex items-center"}
            onClick={() => signIn("google")}
          >
            <Image src={"/google.svg"} alt="google" width={20} height={20} />{" "}
            Sign Up with Google
          </Button>
        </div>
      </div>
    </>
  );
};

export default SignUp;
