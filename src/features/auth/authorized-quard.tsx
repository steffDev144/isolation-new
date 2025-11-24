"use client";

import { signIn } from "next-auth/react";
import { useEffect } from "react";
import { useAppSession } from "@/entities/session/";

export function AuthorizedGuard({ children }: { children: React.ReactNode }) {
  const session = useAppSession();

  const isUnauthenticated = session.status === "unauthenticated";

  useEffect(() => {
    if (isUnauthenticated) {
      signIn();
    }
  }, [isUnauthenticated]);

  const isLoading =
    session.status === "loading" || session.status === "unauthenticated";

  return (
    <>
      {isLoading ? "Loading" : session.status === "authenticated" && children}
    </>
  );
}
