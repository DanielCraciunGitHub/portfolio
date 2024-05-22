"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";

interface WriteForUsProps {}

export const WriteForUs = ({}: WriteForUsProps) => {
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    setShow(!!!localStorage.getItem("writeForUs"));
  }, []);

  return show ? (
    <div className="relative flex flex-col items-center justify-center bg-black p-1 italic text-white dark:bg-gray-800 md:flex-row">
      <div
        onClick={() => {
          setShow(false);
          localStorage.setItem("writeForUs", "true");
        }}
        className="absolute right-2 cursor-pointer opacity-50"
      >
        <X />
      </div>
      ✍️Want to feature your articles on InfoLibrary?✍️&nbsp;
      <div>
        <Link className="text-blue-600 underline" href="/write_for_us">
          Write for us
        </Link>
        &nbsp;today!
      </div>
    </div>
  ) : null;
};
