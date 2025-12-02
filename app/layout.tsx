import type React from "react"
import type { Metadata } from "next"
import Script from "next/script"   // <-- required for GA

import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"
import { Open_Sans, Rubik, Instrument_Serif, Geist, Geist_Mono, Source_Serif_4 as V0_Font_Source_Serif_4 } from 'next/font/google'

// fonts...
const _geist = Geist({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })
const _geistMono = Geist_Mono({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })
const _sourceSerif_4 = V0_Font_Source_Serif_4({ subsets: ['latin'], weight: ["200","300","400","500","600","700","800","900"] })

const openSans = Open_Sans({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800"], variable: "--font-open-sans", display: "swap" })
const rubik = Rubik({ subsets: ["latin"], weight: ["300","400","500","600","700","800","900"], variable: "--font-rubik", display: "swap" })
const instrumentSerif = Instrument_Serif({ subsets: ["latin"], weight: ["400"], style:["italic"], variable: "--font-instrument", display:"swap" })


export const metadata: Metadata = {
  title: "Hire Web Developers for Small Business Websites | Fast, Afforda Web Design",
  description: "Need a website for your business? Get a professional web presence with responsive design...",
   icons: {
    icon: "/logo.ico", // tab icon
    apple: "/images/logo.png", // iPhone/iPad icon
  },
    generator: 'v0.app'
}


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script async src={`https://www.googletagmanager.com/gtag/js?id=G-3BQW7STX4M`} />

        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3BQW7STX4M');
          `}
        </Script>
      </head>

      <body className={`font-sans ${openSans.variable} ${rubik.variable} ${instrumentSerif.variable}`}>
        <Suspense fallback={null}>
          {children}
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
