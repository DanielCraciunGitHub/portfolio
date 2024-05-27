"use client";

import { useEffect, useRef } from "react";
export function AdsterraAdBanner(): JSX.Element {
  const banner = useRef<HTMLDivElement>(null);

  const atOptions = {
    key: "a8db8ff6dd9864d15b8579d1332b8afb",
    format: "iframe",
    height: 250,
    width: 320,
    params: {},
  };
  useEffect(() => {
    if (banner.current && !banner.current.firstChild) {
      const conf = document.createElement("script");
      const script = document.createElement("script");

      script.type = "text/javascript";
      script.src = `//www.topcreativeformat.com/${atOptions.key}/invoke.js`;

      conf.type = "text/javascript";
      conf.innerHTML = `atOptions = ${JSON.stringify(atOptions)}`;

      banner.current.append(conf);
      banner.current.append(script);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [banner]);

  return (
    <div
      className="mx-2 my-5 items-center justify-center text-center"
      ref={banner}
    ></div>
  );
}
