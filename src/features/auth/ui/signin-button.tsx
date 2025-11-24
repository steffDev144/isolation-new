"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/shared/ui/button";

export function SignInButton() {
  const handleSignIn = () => signIn("google", { redirectTo: "/admin" });

  return <Button onClick={handleSignIn}>Sign In</Button>;
}
