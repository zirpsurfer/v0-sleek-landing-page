"use client"

import { useRef } from "react"
import { MapPinIcon } from "lucide-react"

import type React from "react"
import { useState, useCallback, memo, forwardRef } from "react"
import Link from "next/link"
import Image from "next/image"
import dynamic from "next/dynamic"
import { FloatingNavbar } from "@/components/floating-navbar"
import { ShinyButton } from "@/components/ui/shiny-button"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { CheckIcon, MailIcon } from "lucide-react"
const ContactModal = dynamic(
  () => import("@/components/contact-modal").then((mod) => ({ default: mod.ContactModal })),
  { ssr: false },
)
import { DotPattern } from "@/components/ui/dot-pattern"
import { cn } from "@/lib/utils"
import { LiquidMetalBackground } from "@/components/liquid-metal-background"

const FEATURES_DATA = [
  { title: "Website Development", desc: "Modern, fast websites built for sales, not just design." },
  { title: "Local SEO & Visibility", desc: "Get found on Google, Maps, Yelp & drive real foot-traffic." },
  { title: "Booking & Payments Setup", desc: "Accept appointments, payments & inquiries automatically." },
  { title: "Analytics & Performance", desc: "Track website traffic, conversions & customer behavior." },
  { title: "Automation Workflows", desc: "Automate follow-ups, lead nurturing & CRM updates." },
  { title: "Business Intelligence", desc: "Data-backed decisions with dashboards & reporting." },
] as const

const PORTFOLIO_PROJECTS = [
  {
    img: "/gg.png",
    title: "Glow & Grace Beauty Studio",
    type: "Salon Website",
    desc: "Industry: Salon & Spa | Pricing Tier: Growth Plan ($500)",
    link: "https://glowngrace.vercel.app",
  },
  {
    img: "/ubc.png",
    title: "UrbanFit Apparel",
    type: "E-Commerce",
    desc: "Industry: Clothing & Retail | Pricing Tier: Full Business Plan ($2,000)",
    link: "https://urbanfitapparel.vercel.app",
  },
  {
    img: "/bvg.png",
    title: "Bella Vista Grill",
    type: "Restaurant",
    desc: "Industry: Restaurant & Food | Pricing Tier: Starter + Add-ons ($1000)",
    link: "https://v0-bellavistagrill.vercel.app/",
  },
  {
    img: "/atx.png",
    title: "Altys Group",
    type: "Real Estate",
    desc: "Industry: Real Estate Agency | Pricing Tier: Growth Conversion Site ($800)",
    link: "https://altysdesign.vercel.app/",
  },
] as const

const TOOLS_DATA = [
  "WordPress",
  "Google Analytics",
  "Zapier",
  "Shopify",
  "Figma",
  "Next.js",
  "Stripe",
  "Tailwind CSS",
  "Calendly",
] as const

const FORM_FIELDS = [
  { label: "Name", name: "entry.1996151955", type: "text", placeholder: "Your name" },
  { label: "Email", name: "entry.1756661667", type: "email", placeholder: "your@email.com" },
  { label: "Company", name: "entry.406372998", type: "text", placeholder: "Your company" },
] as const

// --- Sub-Components ---

const HeroSection = memo(({ onContactClick }: { onContactClick: () => void }) => (
  <section id="home" className="flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
    <div className="mx-auto max-w-4xl w-full">
      <div className="text-center px-0 leading-5">
        <h1 className="mb-6 sm:mb-8 text-balance text-4xl sm:text-5xl md:text-6xl lg:text-8xl tracking-tight text-white [text-shadow:_0_4px_20px_rgb(0_0_0_/_60%)]">
          <span className="font-open-sans-custom not-italic">Turn </span>{" "}
          <span className="font-serif italic">Clicks</span>{" "}
          <span className="font-open-sans-custom not-italic">Into Customers.</span>
        </h1>

        <p className="mb-6 sm:mb-8 mx-auto max-w-2xl text-pretty leading-relaxed text-gray-300 [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-thin font-open-sans-custom tracking-wide text-base sm:text-lg lg:text-xl px-4">
          Professional, fast, and SEO-optimized websites for small businesses{" "}
          <span className="font-serif italic">leveraging AI</span> to boost leads, bookings, and sales.
        </p>

        <div className="flex justify-center">
          <ShinyButton className="px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base" onClick={onContactClick}>
            Get a Quote
          </ShinyButton>
        </div>
      </div>
    </div>
  </section>
))
HeroSection.displayName = "HeroSection"

const FeatureItem = memo(({ title, desc }: { title: string; desc: string }) => (
  <div className="flex flex-row gap-4 sm:gap-6 w-full items-start">
    <CheckIcon className="w-4 h-4 sm:w-[1.05rem] sm:h-[1.05rem] mt-1 sm:mt-2 text-white shrink-0" strokeWidth={3} />
    <div className="flex flex-col gap-1">
      <p className="text-white font-open-sans-custom text-sm sm:text-base">{title}</p>
      <p className="text-gray-300 text-xs sm:text-sm font-open-sans-custom">{desc}</p>
    </div>
  </div>
))
FeatureItem.displayName = "FeatureItem"

const FeaturesSection = memo(() => (
  <section id="features" className="flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
    <div className="mx-auto max-w-7xl w-full">
      <div className="w-full">
        <div className="container mx-auto px-4">
          <div className="flex gap-4 flex-col items-start">
            <div>
              <Badge className="bg-white/10 text-white border-white/20 backdrop-blur-sm text-xs sm:text-sm">
                Services
              </Badge>
            </div>
            <div className="flex gap-2 flex-col">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tighter lg:max-w-xl font-open-sans-custom text-white [text-shadow:_0_4px_20px_rgb(0_0_0_/_60%)]">
                Our Development Services
              </h2>
              <p className="text-base sm:text-lg max-w-xl lg:max-w-xl leading-relaxed tracking-tight text-gray-300 font-open-sans-custom [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)]">
                Complete solutions to grow your online presence.
              </p>
            </div>
            <div className="flex gap-6 sm:gap-10 pt-8 sm:pt-12 flex-col w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-start gap-6 sm:gap-8 lg:gap-10">
                {FEATURES_DATA.map((feature, i) => (
                  <FeatureItem key={i} title={feature.title} desc={feature.desc} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
))
FeaturesSection.displayName = "FeaturesSection"

const ProjectCard = memo(({ project }: { project: (typeof PORTFOLIO_PROJECTS)[number] }) => (
  <div className="flex flex-col md:flex-row bg-white/5 border border-white/10 rounded-lg overflow-hidden backdrop-blur-sm hover:bg-white/10 transition-colors">
    <div className="w-full md:w-1/2 border-b md:border-b-0 md:border-r border-white/10 relative h-48 md:h-64">
      <Image
        src={project.img || "/placeholder.svg"}
        alt={`${project.title} Website`}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
        loading="lazy"
      />
    </div>
    <div className="flex flex-col gap-3 p-4 sm:p-5 text-white md:w-1/2">
      <Badge className="bg-white/10 w-fit border-white/20 text-xs">{project.type}</Badge>
      <h3 className="text-lg sm:text-xl font-bold">{project.title}</h3>
      <p className="text-gray-300 text-xs sm:text-sm whitespace-pre-line">{project.desc.replace(" | ", "\n")}</p>
      <Button
        variant="outline"
        size="sm"
        className="w-fit bg-white/5 border-white/20 hover:bg-white/10 text-xs mt-auto"
        asChild
      >
        <Link href={project.link} target="_blank">
          Visit Site
        </Link>
      </Button>
    </div>
  </div>
))
ProjectCard.displayName = "ProjectCard"

const PortfolioSection = memo(
  forwardRef<HTMLDivElement, {}>((props, ref) => (
    <section id="portfolio" ref={ref} className="relative min-h-screen px-4 sm:px-6 lg:px-8 py-20 flex items-center">
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 z-0 size-full pointer-events-none",
          "bg-[radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)]",
          "bg-[size:12px_12px]",
          "opacity-30",
        )}
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="mx-auto mb-8 sm:mb-10 max-w-2xl text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white [text-shadow:_0_4px_20px_rgb(0_0_0_/_60%)] font-open-sans-custom">
            Portfolio
          </h1>
          <p className="text-gray-300 mt-3 sm:mt-4 text-sm sm:text-base font-open-sans-custom [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] px-4">
            Recent websites we've designed and launched for small businesses.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {PORTFOLIO_PROJECTS.map((project, i) => (
            <ProjectCard key={i} project={project} />
          ))}
        </div>
      </div>
    </section>
  )),
)
PortfolioSection.displayName = "PortfolioSection"

const PricingCard = memo(
  ({
    title,
    description,
    price,
    features,
    buttonText,
    onButtonClick,
    isPopular = false,
  }: {
    title: string
    description: string
    price: string
    features: readonly string[]
    buttonText: string
    onButtonClick: () => void
    isPopular?: boolean
  }) => (
    <div
      className={cn(
        "relative border rounded-xl backdrop-blur-sm p-5 sm:p-6 flex flex-col justify-between transition h-full",
        isPopular
          ? "bg-white/10 border-white/25 backdrop-blur-xl md:scale-[1.03] shadow-[0_0_40px_rgba(255,255,255,0.2)]"
          : "bg-white/5 border-white/15 hover:bg-white/10",
      )}
    >
      <DotPattern width={6} height={6} />
      {isPopular && <Badge className="w-fit mb-4 bg-white/20 border-white/30 text-white text-xs">Most Popular</Badge>}
      <div>
        <h2 className="text-white text-xl sm:text-2xl font-semibold font-open-sans-custom mb-2">{title}</h2>
        <p className="text-gray-300 text-xs sm:text-sm">{description}</p>
        <p className="text-3xl sm:text-4xl text-white font-bold mt-4 sm:mt-6">{price}</p>
        <ul className="mt-4 sm:mt-6 space-y-2 text-gray-300 text-xs sm:text-sm">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2">
              <CheckIcon className="w-4 h-4 text-white shrink-0 mt-0.5" /> <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <Button
        size="lg"
        className="mt-6 sm:mt-8 bg-white text-black hover:bg-gray-100 font-semibold text-sm sm:text-base font-open-sans-custom"
        onClick={onButtonClick}
      >
        {buttonText}
      </Button>
    </div>
  ),
)
PricingCard.displayName = "PricingCard"

const PricingSection = memo(
  forwardRef<HTMLDivElement, { onContactClick: () => void }>(({ onContactClick }, ref) => (
    <section id="pricing" ref={ref} className="relative min-h-screen px-4 sm:px-6 lg:px-8 py-20 flex items-center">
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 z-0 size-full pointer-events-none",
          "bg-[radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)]",
          "bg-[size:12px_12px]",
          "opacity-30",
        )}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="mx-auto mb-8 sm:mb-12 text-center max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white [text-shadow:_0_4px_20px_rgb(0_0_0_/_70%)] font-open-sans-custom">
            Transparent Pricing.
          </h1>
          <p className="text-gray-300 mt-3 sm:mt-4 text-sm sm:text-base font-open-sans-custom px-4">
            No guesswork. No hidden fees. Choose a plan that matches your growth stage.
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-3">
          <PricingCard
            title="Starter"
            description="A professional presence to get your business online."
            price="$499"
            features={[
              "3-5 page website",
              "Mobile-optimized design",
              "Contact form setup",
              "Basic SEO + Speed Optimization",
            ]}
            buttonText="Start Project"
            onButtonClick={onContactClick}
          />
          <PricingCard
            title="Growth"
            description="Best for businesses focused on conversions & lead-gen."
            price="$899"
            features={[
              "7+-page website",
              "Local SEO + Analytics",
              "Booking & Payment Integration",
              "Lead Capture Automations",
            ]}
            buttonText="Choose Growth"
            onButtonClick={onContactClick}
            isPopular
          />
          <PricingCard
            title="Scale"
            description="Ideal for eCommerce & businesses ready to scale."
            price="$1499+"
            features={[
              "Full Shopify/Webflow Build",
              "Automated Email Workflows",
              "CRM + Retargeting Setup",
              "Ongoing Optimizations",
            ]}
            buttonText="Request Proposal"
            onButtonClick={onContactClick}
          />
        </div>
      </div>
    </section>
  )),
)
PricingSection.displayName = "PricingSection"

const ToolBadge = memo(({ tool }: { tool: string }) => (
  <div className="px-3 py-2 bg-white/5 border border-white/10 rounded text-xs text-gray-300 font-open-sans-custom text-center whitespace-nowrap">
    {tool}
  </div>
))
ToolBadge.displayName = "ToolBadge"

const AboutSection = memo(
  forwardRef<HTMLDivElement, {}>((props, ref) => (
    <section id="about" ref={ref} className="relative min-h-screen px-4 sm:px-6 lg:px-8 py-20 flex items-center">
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
        <div className="mx-auto mb-8 sm:mb-10 max-w-2xl text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white [text-shadow:_0_4px_20px_rgb(0_0_0_/_60%)] font-open-sans-custom">
            About Us
          </h1>
          <p className="text-gray-300 mt-3 sm:mt-4 text-sm sm:text-base font-open-sans-custom [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] px-4">
            Learn more about our mission, philosophy, and specialized expertise.
          </p>
        </div>
        <div className="mx-auto mb-8 sm:mb-10 md:mb-20 max-w-7xl px-4 sm:px-6 xl:px-0">
          <div className="relative flex flex-col items-center border-2 border-white/20 rounded-lg backdrop-blur-sm bg-white/5">
            <DotPattern width={5} height={5} />
            <div className="absolute -left-1.5 -top-1.5 h-3 w-3 bg-white/80" />
            <div className="absolute -bottom-1.5 -left-1.5 h-3 w-3 bg-white/80" />
            <div className="absolute -right-1.5 -top-1.5 h-3 w-3 bg-white/80" />
            <div className="absolute -bottom-1.5 -right-1.5 h-3 w-3 bg-white/80" />

            <div className="relative z-20 mx-auto max-w-5xl rounded-[40px] py-8 px-4 sm:p-10 xl:py-20">
              <div className="space-y-4 md:space-y-6">
                <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-white/90 [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-open-sans-custom leading-relaxed">
                  At HWD, we are obsessed with building high-quality, SEO-optimized websites for small businesses. Our mission is to help business owners establish a professional online presence,
                  attract more customers, and simplify the way they operate.
                </p>
                <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-white/90 [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-open-sans-custom leading-relaxed">
                  Alongside web development, we offer local SEO setup, booking/payment integrations, analytics tracking,
                  and light automation workflows to help you work smarter, not harder. We believe websites shouldn't be
                  complicated — they should deliver results.
                </p>
                <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-white/90 [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-open-sans-custom leading-relaxed">
                  Whether you're a salon, restaurant, contractor, or retail store, we have the tools and expertise to
                  take your digital presence to the next level.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-3xl text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white [text-shadow:_0_4px_20px_rgb(0_0_0_/_60%)] font-open-sans-custom mb-3 sm:mb-4">
            Tools We Specialize In
          </h2>
          <p className="text-gray-300 text-sm sm:text-base font-open-sans-custom [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] px-4">
            We build with the latest tools and platforms to ensure your site is fast, modern, and scalable.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 max-w-4xl mx-auto px-4">
          {TOOLS_DATA.map((tool, i) => (
            <ToolBadge key={i} tool={tool} />
          ))}
        </div>
      </div>
    </section>
  )),
)
AboutSection.displayName = "AboutSection"

const ContactSection = memo(
  forwardRef<HTMLDivElement, {}>((props, ref) => {
    const { toast } = useToast()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = useCallback(
      async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)

        const formData = new FormData(e.currentTarget)
        const formUrl =
          "https://docs.google.com/forms/d/e/1FAIpQLSe-OgT19gHdZkgkvFamTbuCf-qZ_yVPu4VPW20n__4Jr9A42g/formResponse"

        try {
          await fetch(formUrl, {
            method: "POST",
            body: formData,
            mode: "no-cors",
          })

          toast({
            title: "Message sent!",
            description: "We'll get back to you within 24 hours.",
          })
          ;(e.target as HTMLFormElement).reset()
        } catch (error) {
          toast({
            title: "Error",
            description: "Something went wrong. Please try again.",
            variant: "destructive",
          })
        } finally {
          setIsSubmitting(false)
        }
      },
      [toast],
    )

    const openCalendly = useCallback(() => {
      window.open("https://calendly.com/pranavkadam1111/30min", "_blank")
    }, [])

    return (
      <section id="contact" ref={ref} className="relative min-h-screen px-4 sm:px-6 lg:px-8 py-20 flex items-center">
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
          <div className="relative border-2 border-white/20 rounded-lg backdrop-blur-sm bg-black/40 p-8 sm:p-12 lg:p-16">
            {/* Corner markers */}
            <div className="absolute -left-1.5 -top-1.5 h-3 w-3 bg-white/80" />
            <div className="absolute -bottom-1.5 -left-1.5 h-3 w-3 bg-white/80" />
            <div className="absolute -right-1.5 -top-1.5 h-3 w-3 bg-white/80" />
            <div className="absolute -bottom-1.5 -right-1.5 h-3 w-3 bg-white/80" />

            {/* Dot pattern overlay */}
            <div
              aria-hidden="true"
              className={cn(
                "absolute inset-0 z-0 size-full pointer-events-none rounded-lg",
                "bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)]",
                "bg-[size:16px_16px]",
              )}
            />

            <div className="relative z-10 grid lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Left side - Heading and info */}
              <div className="space-y-6 sm:space-y-8">
                <div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 font-open-sans-custom leading-tight">
                    Let's Build Your Web Presence
                  </h1>
                  <p className="text-gray-300 text-base sm:text-lg font-open-sans-custom leading-relaxed">
                    Ready to transform your online operations? Tell us about your challenges and we'll create a tailored
                    strategy.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 p-2 rounded-lg bg-white/10">
                      <MapPinIcon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1 font-open-sans-custom">Address</h3>
                      <p className="text-gray-300 font-open-sans-custom">Pune, MH</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="mt-1 p-2 rounded-lg bg-white/10">
                      <MailIcon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1 font-open-sans-custom">Email</h3>
                      <p className="text-gray-300 font-open-sans-custom break-all">hirewebdevsales@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side - Form */}
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="entry.1851818395" className="text-white text-sm sm:text-base font-open-sans-custom">
                    Name
                  </Label>
                  <Input
                    id="entry.1851818395"
                    name="entry.1851818395"
                    type="text"
                    placeholder="Your name"
                    required
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-500 text-sm sm:text-base font-open-sans-custom h-11 sm:h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="entry.457268666" className="text-white text-sm sm:text-base font-open-sans-custom">
                    Email
                  </Label>
                  <Input
                    id="entry.457268666"
                    name="entry.457268666"
                    type="email"
                    placeholder="your@email.com"
                    required
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-500 text-sm sm:text-base font-open-sans-custom h-11 sm:h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="entry.1656071400" className="text-white text-sm sm:text-base font-open-sans-custom">
                    Company
                  </Label>
                  <Input
                    id="entry.1656071400"
                    name="entry.1656071400"
                    type="text"
                    placeholder="Your company"
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-500 text-sm sm:text-base font-open-sans-custom h-11 sm:h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="entry.1036110973" className="text-white text-sm sm:text-base font-open-sans-custom">
                    Tell us about your web presence challenges
                  </Label>
                  <Textarea
                    id="entry.1036110973"
                    name="entry.1036110973"
                    placeholder="Describe your goals..."
                    required
                    className="min-h-[100px] sm:min-h-[120px] bg-white/5 border-white/20 text-white placeholder:text-gray-500 text-sm sm:text-base font-open-sans-custom resize-none"
                  />
                </div>

                <Button
                  type="button"
                  onClick={openCalendly}
                  size="lg"
                  className="w-full bg-white text-black hover:bg-gray-100 font-semibold text-sm sm:text-base font-open-sans-custom h-12 sm:h-14"
                >
                  Schedule a Call
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    )
  }),
)
ContactSection.displayName = "ContactSection"

export default function Home() {
  const portfolioRef = useRef<HTMLDivElement>(null)
  const pricingSectionRef = useRef<HTMLDivElement>(null)
  const aboutSectionRef = useRef<HTMLDivElement>(null)
  const contactSectionRef = useRef<HTMLDivElement>(null)

  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  const openContact = useCallback(() => setIsContactModalOpen(true), [])

  return (
    <main className="relative min-h-screen">
      <LiquidMetalBackground />

      <div className="fixed inset-0 z-[5] bg-black/50" />

      <FloatingNavbar onContactClick={openContact} />

      <ContactModal open={isContactModalOpen} onOpenChange={setIsContactModalOpen} />

      <div className="relative z-10">
        <HeroSection onContactClick={openContact} />
        <FeaturesSection />
        <PortfolioSection ref={portfolioRef} />
        <PricingSection ref={pricingSectionRef} onContactClick={openContact} />
        <AboutSection ref={aboutSectionRef} />
        <ContactSection ref={contactSectionRef} />
      </div>
    </main>
  )
}
