"use client";

import type { Session } from "@auth/core/types";
import { LogInIcon, LogOutIcon } from "lucide-react";
import { Button } from "src/components/ui/button";

import { authenticate } from "@/app/_actions/authenticate";

interface AuthSession {
  session?: Session | null;
}

export default function AuthButton({ session }: AuthSession) {
  return session ? (
    <>
      <div>Welcome {session.user.name}</div>
      <Button onClick={() => authenticate()}>
        <LogOutIcon />
      </Button>
    </>
  ) : (
    <Button onClick={() => authenticate()}>
      <LogInIcon />
    </Button>
  );
}
