"use client"

import { LogInIcon, LogOutIcon } from "lucide-react"
import { Session } from "next-auth"

import { authenticate } from "@/app/_actions/authenticate"

import { Button } from "./ui/button"

interface AuthSession {
  session: Session | null
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
  )
}
