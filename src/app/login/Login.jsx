"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const session = useSession();
  const router = useRouter();

  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      console.log("SignIn data:", data);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      alert("Login success!");
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
      <h2 className="text-center text-3xl font-bold">Welcome Back</h2>
      <div className="mt-2 text-center">
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className="text-blue-600">
          Sign Up
        </Link>
      </div>
      <div className="w-full max-w-md md:max-w-lg mx-auto px-4">
        <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-4">
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

          {/* общие ошибки (root) */}
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
            {formState.isSubmitting ? <Spinner /> : "Sign In"}
          </Button>
        </form>
        <div className="mt-5">
          <div className="flex items-center">
            <Separator className={"flex-1"} />
            <span className="mx-4 text-muted-foreground text-sm">OR</span>
            <Separator className={"flex-1"} />
          </div>
        </div>
        <div className="mt-5">
          <Button
            variant="outline"
            className={"w-full flex items-center"}
            onClick={() => signIn("google")}
          >
            <Image src={"/google.svg"} alt="google" width={20} height={20} />{" "}
            Sign In with Google
          </Button>
        </div>
      </div>
    </>
  );
};
export default Login;
