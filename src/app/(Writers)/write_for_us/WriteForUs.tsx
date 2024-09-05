"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { X } from "lucide-react"

interface WriteForUsProps {}

export const WriteForUs = ({}: WriteForUsProps) => {
  const [show, setShow] = useState<boolean>(false)

  useEffect(() => {
    setShow(!localStorage.getItem("writeForUs"))
  }, [])

  return show ? (
    <div className="relative my-0.5 flex flex-col items-center justify-center bg-muted p-1 text-sm italic md:flex-row">
      <div
        onClick={() => {
          setShow(false)
          localStorage.setItem("writeForUs", "true")
        }}
        className="absolute right-2 cursor-pointer opacity-50"
      >
        <X />
      </div>
      Want to feature your articles on Info Library?&nbsp;
      <div>
        <Link className="text-blue-600 underline" href="/write_for_us">
          Write for us
        </Link>
        &nbsp;today!
      </div>
    </div>
  ) : null
}
