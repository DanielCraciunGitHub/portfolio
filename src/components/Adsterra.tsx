"use client"

import { useEffect, useRef } from "react"

export function WideDesktopBanner(): JSX.Element {
  const banner = useRef<HTMLDivElement>(null)

  const atOptions = {
    key: "b586374c7176045d24ea3bc156cfe641",
    format: "iframe",
    height: 90,
    width: 728,
    params: {},
  }
  useEffect(() => {
    if (banner.current && !banner.current.firstChild) {
      const conf = document.createElement("script")
      const script = document.createElement("script")

      script.type = "text/javascript"
      script.src = `//www.topcreativeformat.com/${atOptions.key}/invoke.js`

      conf.innerHTML = `atOptions = ${JSON.stringify(atOptions)}`
      conf.type = "text/javascript"

      banner.current.append(conf)
      banner.current.append(script)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [banner])

  return (
    <div className="mt-2 flex justify-center">
      <div className="items-center justify-center text-center" ref={banner} />
    </div>
  )
}
export function WideMobileBanner(): JSX.Element {
  const banner = useRef<HTMLDivElement>(null)

  const atOptions = {
    key: "aaab0b7b18cdcd0913ebd0dcc9a223fb",
    format: "iframe",
    height: 50,
    width: 320,
    params: {},
  }
  useEffect(() => {
    if (banner.current && !banner.current.firstChild) {
      const conf = document.createElement("script")
      const script = document.createElement("script")

      script.type = "text/javascript"
      script.src = `//www.topcreativeformat.com/${atOptions.key}/invoke.js`

      conf.innerHTML = `atOptions = ${JSON.stringify(atOptions)}`
      conf.type = "text/javascript"

      banner.current.append(conf)
      banner.current.append(script)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [banner])

  return (
    <div className="mt-2 flex justify-center">
      <div className="items-center justify-center text-center" ref={banner} />
    </div>
  )
}
// export function NativeBanner(): JSX.Element {
//   const banner = useRef<HTMLDivElement>(null)
//   const id = "9bea6ad9d38c9da3fd338cc4c1ad5a5f"

//   useEffect(() => {
//     if (banner.current && !banner.current.firstChild) {
//       const script = document.createElement("script")

//       script.src = `//pl23591697.highrevenuenetwork.com/${id}/invoke.js`
//       script.async = true

//       banner.current.append(script)
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [banner])

//   return (
//     <>
//       <div id={`container-${id}`} ref={banner}></div>
//     </>
//   )
// }
