/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { X } from "lucide-react"

export const NextInjectBanner = () => {
  const [show, setShow] = useState<boolean>(false)

  useEffect(() => {
    setShow(!localStorage.getItem("nextinject"))
  }, [])

  return show ? (
    <div className="relative flex flex-col items-center justify-center bg-muted p-1 font-mono italic tracking-tight md:flex-row">
      <div
        onClick={() => {
          setShow(false)
          localStorage.setItem("nextinject", "true")
        }}
        className="absolute right-2 cursor-pointer opacity-50"
      >
        <X />
      </div>
      Want to ship code like a hacker? Check out&nbsp;
      <div>
        <Link
          className="text-blue-600 underline"
          href="https://www.nextinject.pro"
          rel="noopener noreferrer"
          target="_blank"
        >
          Next Inject
        </Link>
        &nbsp;today!
      </div>
    </div>
  ) : null
}
