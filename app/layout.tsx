import type { Metadata } from "next"
import Script from "next/script"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

import { Open_Sans, Rubik, Instrument_Serif } from "next/font/google"

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-open-sans",
  display: "swap"
})

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["300","400","500","600","700","800","900"],
  variable: "--font-rubik",
  display: "swap"
})

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style:["italic"],
  variable: "--font-instrument",
  display:"swap"
})

export const metadata: Metadata = {
  title: "Hire Web Developers for Small Business Websites | Fast, Affordable Web Design",
  description: "Need a website for your business? Get a professional web presence...",
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "/logo.ico",
    apple: "/images/logo.png",
  },
    generator: 'v0.app'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Script 
          src="https://www.googletagmanager.com/gtag/js?id=G-3BQW7STX4M"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3BQW7STX4M');
          `}
        </Script>
      </head>

      <body className={`${openSans.variable} ${rubik.variable} ${instrumentSerif.variable}`}>
        <Suspense fallback={null}>
          {children}
        </Suspense>

        <Analytics />
      </body>
    </html>
  )
}
