"use client"

import { useEffect, useState } from "react"

if (typeof window !== "undefined" && !window.__btoaPatched) {
  window.__btoaPatched = true
  window.btoa = (str) => Buffer.from(str, "utf8").toString("base64")
}

export function LiquidMetalBackground() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="absolute inset-0 -z-10 bg-black" />
  }

  return (
    <div className="absolute inset-0 -z-10">
      <div
        className="w-full h-full"
        style={{
          background: `
            radial-gradient(ellipse at 20% 30%, rgba(80, 80, 95, 0.5) 0%, transparent 55%),
            radial-gradient(ellipse at 80% 70%, rgba(70, 70, 85, 0.45) 0%, transparent 55%),
            radial-gradient(ellipse at 40% 80%, rgba(75, 75, 90, 0.48) 0%, transparent 55%),
            radial-gradient(ellipse at 70% 20%, rgba(65, 65, 80, 0.4) 0%, transparent 55%),
            radial-gradient(ellipse at 50% 50%, rgba(60, 60, 75, 0.3) 0%, transparent 60%),
            linear-gradient(135deg, #000000 0%, #0f0f0f 50%, #000000 100%)
          `,
          backgroundSize: "100% 100%",
        }}
      />
    </div>
  )
}
