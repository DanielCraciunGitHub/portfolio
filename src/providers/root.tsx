/* eslint-disable no-return-assign */

"use client"

import { env } from "@/env.mjs"
import { TrpcProvider } from "@/providers/trpc"
import { SessionProvider } from "next-auth/react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3"

export function Provider({ children, ...props }: ThemeProviderProps) {
  return (
    <TrpcProvider>
      <SessionProvider refetchOnWindowFocus={false}>
        <NextThemesProvider {...props}>
          <GoogleReCaptchaProvider
            reCaptchaKey={env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
          >
            {children}
          </GoogleReCaptchaProvider>
        </NextThemesProvider>
      </SessionProvider>
    </TrpcProvider>
  )
}
