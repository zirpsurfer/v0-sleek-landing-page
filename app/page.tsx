"use client"

import Link from "next/link"
import { LiquidMetalBackground } from "@/components/liquid-metal-background"
import { FloatingNavbar } from "@/components/floating-navbar"
import { ShinyButton } from "@/components/ui/shiny-button"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ContactCard } from "@/components/ui/contact-card"
import { MailIcon, PhoneIcon, MapPinIcon, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { useEffect, useRef, useState } from "react"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { DotPattern } from "@/components/ui/dot-pattern"
import { ContactModal } from "@/components/contact-modal"

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const pricingSectionRef = useRef<HTMLDivElement>(null)
  const portfolioRef = useRef<HTMLDivElement>(null)
  const aboutSectionRef = useRef<HTMLDivElement>(null)
  const contactSectionRef = useRef<HTMLDivElement>(null)

  const [submitted, setSubmitted] = useState(false)
  const { toast } = useToast()

  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [containerWidth, setContainerWidth] = useState(0)

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer) return

    const updateWidth = () => {
      setContainerWidth(scrollContainer.offsetWidth)
    }

    updateWidth()
    window.addEventListener("resize", updateWidth)

    const handleWheel = (e: WheelEvent) => {
      const delta = e.deltaY
      const currentScroll = scrollContainer.scrollLeft

      if (containerWidth === 0) return

      const currentSection = Math.round(currentScroll / containerWidth)

      // --- SECTION 2: PORTFOLIO ---
      if (currentSection === 2 && portfolioRef.current) {
        const portfolioSection = portfolioRef.current
        const isAtTop = portfolioSection.scrollTop <= 0
        const isAtBottom =
          Math.abs(portfolioSection.scrollTop + portfolioSection.clientHeight - portfolioSection.scrollHeight) <= 2

        if (delta > 0 && !isAtBottom) return
        if (delta < 0 && !isAtTop) return

        if (delta < 0 && isAtTop) {
          e.preventDefault()
          scrollContainer.scrollTo({ left: 1 * containerWidth, behavior: "smooth" })
          return
        }
        if (delta > 0 && isAtBottom) {
          e.preventDefault()
          scrollContainer.scrollTo({ left: 3 * containerWidth, behavior: "smooth" })
          return
        }
      }

      // --- SECTION 3: PRICING ---
      if (currentSection === 3 && pricingSectionRef.current) {
        const pricingSection = pricingSectionRef.current
        const isAtTop = pricingSection.scrollTop <= 0
        const isAtBottom =
          Math.abs(pricingSection.scrollTop + pricingSection.clientHeight - pricingSection.scrollHeight) <= 2

        if (delta > 0 && !isAtBottom) return
        if (delta < 0 && !isAtTop) return

        if (delta < 0 && isAtTop) {
          e.preventDefault()
          scrollContainer.scrollTo({ left: 2 * containerWidth, behavior: "smooth" })
          return
        }
        if (delta > 0 && isAtBottom) {
          e.preventDefault()
          scrollContainer.scrollTo({ left: 4 * containerWidth, behavior: "smooth" })
          return
        }
      }

      // --- SECTION 4: ABOUT ---
      if (currentSection === 4 && aboutSectionRef.current) {
        const aboutSection = aboutSectionRef.current
        const isAtTop = aboutSection.scrollTop <= 0
        const isAtBottom = Math.abs(aboutSection.scrollTop + aboutSection.clientHeight - aboutSection.scrollHeight) <= 2

        if (delta > 0 && !isAtBottom) return
        if (delta < 0 && !isAtTop) return

        if (delta < 0 && isAtTop) {
          e.preventDefault()
          scrollContainer.scrollTo({ left: 3 * containerWidth, behavior: "smooth" })
          return
        }
        if (delta > 0 && isAtBottom) {
          e.preventDefault()
          scrollContainer.scrollTo({ left: 5 * containerWidth, behavior: "smooth" })
          return
        }
      }

      // --- SECTION 5: CONTACT ---
      if (currentSection === 5 && contactSectionRef.current) {
        const contactSection = contactSectionRef.current
        const isAtTop = contactSection.scrollTop <= 0
        const isAtBottom =
          Math.abs(contactSection.scrollTop + contactSection.clientHeight - contactSection.scrollHeight) <= 2

        if (delta > 0 && !isAtBottom) return
        if (delta < 0 && !isAtTop) return

        if (delta < 0 && isAtTop) {
          e.preventDefault()
          scrollContainer.scrollTo({ left: 4 * containerWidth, behavior: "smooth" })
          return
        }
        if (delta > 0 && isAtBottom) {
          e.preventDefault()
          return
        }
      }

      e.preventDefault()

      if (Math.abs(delta) > 10) {
        let targetSection = currentSection
        if (delta > 0) {
          targetSection = Math.min(currentSection + 1, 5)
        } else {
          targetSection = Math.max(currentSection - 1, 0)
        }

        if (targetSection !== currentSection) {
          scrollContainer.scrollTo({
            left: targetSection * containerWidth,
            behavior: "smooth",
          })
        }
      }
    }

    scrollContainer.addEventListener("wheel", handleWheel, { passive: false })

    return () => {
      scrollContainer.removeEventListener("wheel", handleWheel)
      window.removeEventListener("resize", updateWidth)
    }
  }, [containerWidth])

  return (
    <main className="relative h-screen overflow-hidden">
      <LiquidMetalBackground />

      <div className="fixed inset-0 z-[5] bg-black/50" />

      <FloatingNavbar onContactClick={() => setIsContactModalOpen(true)} />

      <ContactModal open={isContactModalOpen} onOpenChange={setIsContactModalOpen} />

      <div
        ref={scrollContainerRef}
        // OPTIMIZATION: 'will-change-scroll' hints to browser to put this on its own compositor layer
        className="relative z-10 flex h-screen w-full overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory will-change-scroll"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {/* Index 0: Home */}
        <section id="home" className="flex min-w-full snap-start items-center justify-center px-4 py-20">
          <div className="mx-auto max-w-4xl">
            <div className="text-center px-0 leading-5">
              <h1 className="mb-8 text-balance text-5xl tracking-tight text-white [text-shadow:_0_4px_20px_rgb(0_0_0_/_60%)] md:text-6xl lg:text-8xl">
                <span className="font-open-sans-custom not-italic">Turn </span>{" "}
                <span className="font-serif italic">Clicks</span>{" "}
                <span className="font-open-sans-custom not-italic">Into Customers.</span>
              </h1>

              <p className="mb-8 mx-auto max-w-2xl text-pretty leading-relaxed text-gray-300 [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-thin font-open-sans-custom tracking-wide leading-7 text-xl">
                Professional, fast, and SEO-optimized websites for small businesses{" "}
                <span className="font-serif italic">leveraging AI</span> to boost leads, bookings, and sales.
              </p>

              <div className="flex justify-center">
                <ShinyButton className="px-8 py-3 text-base" onClick={() => setIsContactModalOpen(true)}>
                  Get a Quote
                </ShinyButton>
              </div>
            </div>
          </div>
        </section>

        {/* Index 1: Features */}
        <section id="features" className="flex min-w-full snap-start items-center justify-center px-4 py-20">
          <div className="mx-auto max-w-7xl w-full">
            <div className="w-full py-20 lg:py-0">
              <div className="container mx-auto px-4">
                <div className="flex gap-4 py-20 flex-col items-start lg:py-0">
                  <div>
                    <Badge className="bg-white/10 text-white border-white/20 backdrop-blur-sm">Services</Badge>
                  </div>
                  <div className="flex gap-2 flex-col">
                    <h2 className="text-3xl md:text-5xl tracking-tighter lg:max-w-xl font-open-sans-custom text-white [text-shadow:_0_4px_20px_rgb(0_0_0_/_60%)]">
                      Our Development Services
                    </h2>
                    <p className="text-lg max-w-xl lg:max-w-xl leading-relaxed tracking-tight text-gray-300 font-open-sans-custom [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)]">
                      Complete solutions to grow your online presence.
                    </p>
                  </div>
                  <div className="flex gap-10 pt-12 flex-col w-full">
                    <div className="grid grid-cols-2 items-start lg:grid-cols-3 gap-10">
                      {/* Items remain unchanged */}
                      <div className="flex flex-row gap-6 w-full items-start">
                        <Check className="w-[1.05rem] h-[1.05rem] mt-2 text-white" strokeWidth={3} />
                        <div className="flex flex-col gap-1">
                          <p className="text-white font-open-sans-custom">Website Development</p>
                          <p className="text-gray-300 text-sm font-open-sans-custom">
                            Modern, fast websites built for sales, not just design.
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-row gap-6 items-start">
                        <Check className="w-[1.05rem] h-[1.05rem] mt-2 text-white" strokeWidth={3} />
                        <div className="flex flex-col gap-1">
                          <p className="text-white font-open-sans-custom">Local SEO & Visibility</p>
                          <p className="text-gray-300 text-sm font-open-sans-custom">
                            Get found on Google, Maps, Yelp & drive real foot-traffic.
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-row gap-6 w-full items-start">
                        <Check className="w-[1.05rem] h-[1.05rem] mt-2 text-white" strokeWidth={3} />
                        <div className="flex flex-col gap-1">
                          <p className="text-white font-open-sans-custom">Booking & Payments Setup</p>
                          <p className="text-gray-300 text-sm font-open-sans-custom">
                            Accept appointments, payments & inquiries automatically.
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-row gap-6 w-full items-start">
                        <Check className="w-[1.05rem] h-[1.05rem] mt-2 text-white" strokeWidth={3} />
                        <div className="flex flex-col gap-1">
                          <p className="text-white font-open-sans-custom">Analytics & Performance Tracking</p>
                          <p className="text-gray-300 text-sm font-open-sans-custom">
                            Track website traffic, conversions & customer behavior.
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-row gap-6 w-full items-start">
                        <Check className="w-[1.05rem] h-[1.05rem] mt-2 text-white" strokeWidth={3} />
                        <div className="flex flex-col gap-1">
                          <p className="text-white font-open-sans-custom">Automation Workflows</p>
                          <p className="text-gray-300 text-sm font-open-sans-custom">
                            Automate follow-ups, lead nurturing & CRM updates.
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-row gap-6 w-full items-start">
                        <Check className="w-[1.05rem] h-[1.05rem] mt-2 text-white" strokeWidth={3} />
                        <div className="flex flex-col gap-1">
                          <p className="text-white font-open-sans-custom">Business Intelligence & Insights</p>
                          <p className="text-gray-300 text-sm font-open-sans-custom">
                            Data-backed decisions with dashboards & reporting.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Index 2: Portfolio */}
        <section
          id="portfolio"
          ref={portfolioRef}
          className="relative min-w-full snap-start overflow-y-auto px-4 pt-24 pb-20 [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div
            aria-hidden="true"
            className={cn(
              "absolute inset-0 z-0 size-full pointer-events-none",
              "bg-[radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)]",
              "bg-[size:12px_12px]",
              "opacity-30",
            )}
          />

          <div className="relative z-10 mx-auto w-full max-w-5xl">
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl text-white [text-shadow:_0_4px_20px_rgb(0_0_0_/_60%)] font-open-sans-custom">
                Portfolio
              </h1>
              <p className="text-gray-300 mt-4 text-sm md:text-base font-open-sans-custom [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)]">
                Recent websites we've designed and launched for small businesses.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:grid-cols-2">
              {/* PROJECT 1 */}
              <div className="flex flex-col md:flex-row bg-white/5 border border-white/10 rounded-lg overflow-hidden backdrop-blur-sm">
                <div className="w-full md:w-1/2 border-r border-white/10 relative h-48 md:h-auto">
                  {/* OPTIMIZATION: Added sizes prop and explicit lazy loading */}
                  <Image
                    src="/gg.png"
                    alt="Glow & Grace Website"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-col gap-3 p-5 text-white md:w-1/2">
                  <Badge className="bg-white/10 w-fit border-white/20">Salon Website</Badge>
                  <h3 className="text-xl font-bold">Glow & Grace Beauty Studio</h3>
                  <p className="text-gray-300 text-sm">
                    <strong>Industry:</strong> Salon & Spa
                    <br />
                    <strong>Pricing Tier:</strong> Growth Plan ($900)
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-fit bg-white/5 border-white/20 hover:bg-white/10 text-xs"
                    asChild
                  >
                    <Link href="https://glowngrace.vercel.app" target="_blank">
                      Visit Site
                    </Link>
                  </Button>
                </div>
              </div>

              {/* PROJECT 2 */}
              <div className="flex flex-col md:flex-row bg-white/5 border border-white/10 rounded-lg overflow-hidden backdrop-blur-sm">
                <div className="w-full md:w-1/2 border-r border-white/10 relative h-48 md:h-auto">
                  <Image
                    src="/ubc.png"
                    alt="UrbanFit Apparel Website"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-col gap-3 p-5 text-white md:w-1/2">
                  <Badge className="bg-white/10 w-fit border-white/20">E-Commerce</Badge>
                  <h3 className="text-xl font-bold">UrbanFit Apparel</h3>
                  <p className="text-gray-300 text-sm">
                    <strong>Industry:</strong> Clothing & Retail
                    <br />
                    <strong>Pricing Tier:</strong> Full Business Plan ($2,400)
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-fit bg-white/5 border-white/20 hover:bg-white/10 text-xs"
                    asChild
                  >
                    <Link href="https://urbanfitapparel.vercel.app" target="_blank">
                      Visit Site
                    </Link>
                  </Button>
                </div>
              </div>

              {/* PROJECT 3 */}
              <div className="flex flex-col md:flex-row bg-white/5 border border-white/10 rounded-lg overflow-hidden backdrop-blur-sm">
                <div className="w-full md:w-1/2 border-r border-white/10 relative h-48 md:h-auto">
                  <Image
                    src="/bvg.png"
                    alt="Bella Vista Grill Website"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-col gap-3 p-5 text-white md:w-1/2">
                  <Badge className="bg-white/10 w-fit border-white/20">Restaurant</Badge>
                  <h3 className="text-xl font-bold">Bella Vista Grill</h3>
                  <p className="text-gray-300 text-sm">
                    <strong>Industry:</strong> Restaurant & Food
                    <br />
                    <strong>Pricing Tier:</strong> Starter + Add-ons ($700)
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-fit bg-white/5 border-white/20 hover:bg-white/10 text-xs"
                    asChild
                  >
                    <Link href="https://v0-bellavistagrill.vercel.app/" target="_blank">
                      Visit Site
                    </Link>
                  </Button>
                </div>
              </div>

              {/* PROJECT 4 */}
              <div className="flex flex-col md:flex-row bg-white/5 border border-white/10 rounded-lg overflow-hidden backdrop-blur-sm">
                <div className="w-full md:w-1/2 border-r border-white/10 relative h-48 md:h-auto">
                  <Image
                    src="/atx.png"
                    alt="Sunrise Property Group Website"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-col gap-3 p-5 text-white md:w-1/2">
                  <Badge className="bg-white/10 w-fit border-white/20">Real Estate</Badge>
                  <h3 className="text-xl font-bold">Sunrise Property Group</h3>
                  <p className="text-gray-300 text-sm">
                    <strong>Industry:</strong> Real Estate Agency
                    <br />
                    <strong>Pricing Tier:</strong> Growth Conversion Site ($1,300)
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-fit bg-white/5 border-white/20 hover:bg-white/10 text-xs"
                    asChild
                  >
                    <Link href="https://altysdesign.vercel.app/" target="_blank">
                      Visit Site
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Index 3: Pricing */}
        <section
          id="pricing"
          ref={pricingSectionRef}
          className="relative min-w-full snap-start overflow-y-auto px-4 pt-24 pb-20 [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {/* BG Pattern */}
          <div
            aria-hidden="true"
            className={cn(
              "absolute inset-0 z-0 size-full pointer-events-none",
              "bg-[radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)]",
              "bg-[size:12px_12px]",
              "opacity-30",
            )}
          />

          <div className="relative z-10 mx-auto w-full max-w-6xl">
            <div className="mx-auto mb-12 text-center max-w-3xl">
              <h1 className="text-4xl lg:text-6xl font-extrabold text-white [text-shadow:_0_4px_20px_rgb(0_0_0_/_70%)] font-open-sans-custom">
                Transparent Pricing.
              </h1>
              <p className="text-gray-300 mt-4 text-sm md:text-base font-open-sans-custom">
                No guesswork. No hidden fees. Choose a plan that matches your growth stage.
              </p>
            </div>

            {/* Pricing Grid */}
            <div className="grid gap-6 md:grid-cols-3">
              {/* Tier 1 — Starter */}
              <div className="relative bg-white/5 border border-white/15 rounded-xl backdrop-blur-sm p-6 flex flex-col justify-between hover:bg-white/10 transition">
                <DotPattern width={6} height={6} />

                <div>
                  <h2 className="text-white text-2xl font-semibold font-open-sans-custom mb-2">Starter</h2>
                  <p className="text-gray-300 text-sm">A professional presence to get your business online.</p>

                  <p className="text-4xl text-white font-bold mt-6">$499</p>

                  <ul className="mt-6 space-y-2 text-gray-300 text-sm">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 text-white" /> 3-5 page website
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 text-white" /> Mobile-optimized design
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 text-white" /> Contact form setup
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 text-white" /> Basic SEO + Speed Optimization
                    </li>
                  </ul>
                </div>

                <Button
                  size="lg"
                  className="mt-8 bg-white text-black hover:bg-gray-100 font-semibold"
                  onClick={() => setIsContactModalOpen(true)}
                >
                  Start Project
                </Button>
              </div>

              {/* Tier 2 — Growth (Highlighted) */}
              <div className="relative bg-white/10 border border-white/25 rounded-xl backdrop-blur-xl p-6 scale-[1.03] shadow-[0_0_40px_rgba(255,255,255,0.2)] flex flex-col justify-between">
                <DotPattern width={6} height={6} />

                <Badge className="w-fit mb-4 bg-white/20 border-white/30 text-white">Most Popular</Badge>

                <div>
                  <h2 className="text-white text-2xl font-semibold font-open-sans-custom mb-2">Growth</h2>
                  <p className="text-gray-300 text-sm">Best for businesses focused on conversions & lead-gen.</p>

                  <p className="text-4xl text-white font-bold mt-6">$899</p>

                  <ul className="mt-6 space-y-2 text-gray-300 text-sm">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 text-white" /> 7+-page website
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 text-white" /> Local SEO + Analytics
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 text-white" /> Booking & Payment Integration
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 text-white" /> Lead Capture Automations
                    </li>
                  </ul>
                </div>

                <Button
                  size="lg"
                  className="mt-8 bg-white text-black hover:bg-gray-100 font-semibold"
                  onClick={() => setIsContactModalOpen(true)}
                >
                  Choose Growth
                </Button>
              </div>

              {/* Tier 3 — Scale */}
              <div className="relative bg-white/5 border border-white/15 rounded-xl backdrop-blur-sm p-6 flex flex-col justify-between hover:bg-white/10 transition">
                <DotPattern width={6} height={6} />

                <div>
                  <h2 className="text-white text-2xl font-semibold font-open-sans-custom mb-2">Scale</h2>
                  <p className="text-gray-300 text-sm">Ideal for eCommerce & businesses ready to scale.</p>

                  <p className="text-4xl text-white font-bold mt-6">$1499+</p>

                  <ul className="mt-6 space-y-2 text-gray-300 text-sm">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 text-white" /> Full Shopify/Webflow Build
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 text-white" /> Automated Email Workflows
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 text-white" /> CRM + Retargeting Setup
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 text-white" /> Ongoing Optimizations
                    </li>
                  </ul>
                </div>

                <Button
                  size="lg"
                  className="mt-8 bg-white text-black hover:bg-gray-100 font-semibold"
                  onClick={() => setIsContactModalOpen(true)}
                >
                  Request Proposal
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Index 4: About */}
        <section
          id="about"
          ref={aboutSectionRef}
          className="relative min-w-full snap-start overflow-y-auto px-4 pt-24 pb-20 [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div
            aria-hidden="true"
            className={cn(
              "absolute inset-0 z-0 size-full pointer-events-none",
              "bg-[radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)]",
              "bg-[size:12px_12px]",
              "opacity-30",
            )}
          />

          <div className="relative z-10 mx-auto w-full max-w-7xl">
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl text-white [text-shadow:_0_4px_20px_rgb(0_0_0_/_60%)] font-open-sans-custom">
                About Us
              </h1>
              <p className="text-gray-300 mt-4 text-sm md:text-base font-open-sans-custom [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)]">
                Learn more about our mission, philosophy, and specialized expertise.
              </p>
            </div>
            <div className="mx-auto mb-10 max-w-7xl px-6 md:mb-20 xl:px-0">
              <div className="relative flex flex-col items-center border-2 border-white/20 rounded-lg backdrop-blur-sm bg-white/5">
                <DotPattern width={5} height={5} />

                <div className="absolute -left-1.5 -top-1.5 h-3 w-3 bg-white/80" />
                <div className="absolute -bottom-1.5 -left-1.5 h-3 w-3 bg-white/80" />
                <div className="absolute -right-1.5 -top-1.5 h-3 w-3 bg-white/80" />
                <div className="absolute -bottom-1.5 -right-1.5 h-3 w-3 bg-white/80" />

                <div className="relative z-20 mx-auto max-w-5xl rounded-[40px] py-10 md:p-10 xl:py-20">
                  <div className="space-y-4 md:space-y-6">
                    <p className="text-sm md:text-base lg:text-lg xl:text-xl text-white/90 [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-open-sans-custom leading-relaxed">
                      At HireWebDev, we are obsessed with building high-quality, SEO-optimized websites for small businesses
                      across the United States. Our mission is to help business owners establish a professional online
                      presence, attract more customers, and simplify the way they operate.
                    </p>
                    <p className="text-sm md:text-base lg:text-lg xl:text-xl text-white/90 [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-open-sans-custom leading-relaxed">
                      Alongside web development, we offer local SEO setup, booking/payment integrations, analytics
                      tracking, and light automation workflows to help you work smarter, not harder. We believe great
                      websites shouldn’t be complicated or overpriced — they should simply work. With HireWebDev, you get a
                      partner committed to growing your business, one page at a time.
                    </p>
                  </div>

                  <div className="mt-8 pt-8 border-t border-white/20">
                    <p className="text-sm md:text-base text-gray-400 font-open-sans-custom mb-4">
                      <strong>Tools We Specialize In:</strong>
                    </p>

                    <div className="grid grid-cols-3 gap-3">
                      {[
                        "WordPress",
                        "Google Analytics",
                        "Zapier",
                        "Shopify",
                        "Figma",
                        "Next.js",
                        "Stripe",
                        "Tailwind CSS",
                        "Calendly",
                      ].map((tool, i) => (
                        <div
                          key={i}
                          className="px-3 py-2 bg-white/5 border border-white/10 rounded text-xs text-gray-300 font-open-sans-custom text-center"
                        >
                          {tool}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Index 5: Contact */}
        <section
          id="contact"
          ref={contactSectionRef}
          className="relative min-w-full snap-start overflow-y-auto px-4 pt-24 pb-20"
        >
          <div
            aria-hidden="true"
            className={cn(
              "absolute inset-0 z-0 size-full pointer-events-none",
              "bg-[radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)]",
              "bg-[size:12px_12px]",
              "opacity-30",
            )}
          />

          <div className="relative z-10 mx-auto w-full max-w-5xl mt-[5vh]">
            <ContactCard
              title="Let's Build Your Web Presence"
              description="Ready to transform your online operations? Tell us about your challenges and we'll create a tailored strategy to build your website, optimize SEO and generate leads."
              contactInfo={[
              
                {
                  icon: MapPinIcon,
                  label: "Address",
                  value: "Pune, MH",
                },
                 {
                  icon: MailIcon,
                  label: "Email",
                  value: "hirewebdevsales@gmail.com",
                  className: "col-span-2",

                },
              ]}
            >
              {/* Hidden iframe to avoid redirecting user to Google confirmation */}
              <iframe name="hidden_iframe" style={{ display: "none" }}></iframe>

              <form
                action="https://forms.gle/yMM4vebRJnfrYLdj8"
                method="POST"
                target="hidden_iframe"
                className="w-full space-y-4"
                onSubmit={() => {
                  setSubmitted(true)
                  toast({
                    title: "Message Sent!",
                    description: "Thanks for reaching out. We’ll get back to you soon.",
                    duration: 3000,
                  })
                }}
              >
                <div className="flex flex-col gap-2">
                  <Label className="text-white font-open-sans-custom">Name</Label>
                  <Input
                    name="entry.1996151955"
                    type="text"
                    placeholder="Your name"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label className="text-white font-open-sans-custom">Email</Label>
                  <Input
                    name="entry.1756661667"
                    type="email"
                    placeholder="your@email.com"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label className="text-white font-open-sans-custom">Company</Label>
                  <Input
                    name="entry.406372998"
                    type="text"
                    placeholder="Your company"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label className="text-white font-open-sans-custom">Tell us about your web presence challenges</Label>
                  <Textarea
                    name="entry.1865774663"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    placeholder="Describe your goals..."
                    required
                  />
                </div>

                <Button
                  className="w-full bg-white text-black hover:bg-gray-100 font-open-sans-custom"
                  type="submit"
                  disabled={submitted}
                >
                  {submitted ? "Sent!" : "Schedule a Call"}
                </Button>
              </form>
            </ContactCard>
          </div>
        </section>
      </div>
    </main>
  )
}
