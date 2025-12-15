"use client"

import React, { useEffect, useRef, useState, useCallback, memo, forwardRef } from "react"
import Link from "next/link"
import Image from "next/image"
import dynamic from "next/dynamic"
// import { LiquidMetalBackground } from "@/components/liquid-metal-background"
import { FloatingNavbar } from "@/components/floating-navbar"
import { ShinyButton } from "@/components/ui/shiny-button"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ContactCard } from "@/components/ui/contact-card"
const ContactModal = dynamic(
  () => import("@/components/contact-modal").then((mod) => ({ default: mod.ContactModal })),
  { ssr: false },
)
import { Badge } from "@/components/ui/badge"
import { DotPattern } from "@/components/ui/dot-pattern"
import { MailIcon, MapPinIcon, Check } from "lucide-react"
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

const throttle = <T extends (...args: any[]) => void>(func: T, delay: number): T => {
  let timeoutId: NodeJS.Timeout | null = null
  let lastRan = 0

  return ((...args: Parameters<T>) => {
    const now = Date.now()

    if (now - lastRan >= delay) {
      func(...args)
      lastRan = now
    } else {
      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = setTimeout(
        () => {
          func(...args)
          lastRan = Date.now()
        },
        delay - (now - lastRan),
      )
    }
  }) as T
}

// --- Custom Hook for Scroll Logic ---
const useScrollNavigation = (
  containerRef: React.RefObject<HTMLDivElement>,
  sectionRefs: React.RefObject<HTMLDivElement>[],
) => {
  const [containerWidth, setContainerWidth] = useState(0)

  const updateWidth = useCallback(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth)
    }
  }, [containerRef])

  // Debounced resize handler
  useEffect(() => {
    updateWidth()

    let resizeTimer: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(updateWidth, 100)
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
      clearTimeout(resizeTimer)
    }
  }, [updateWidth])

  useEffect(() => {
    const scrollContainer = containerRef.current
    if (!scrollContainer || containerWidth === 0) return

    const handleWheel = throttle((e: WheelEvent) => {
      const delta = e.deltaY
      const currentScroll = scrollContainer.scrollLeft
      const currentSectionIndex = Math.round(currentScroll / containerWidth)

      const verticalSectionMap: Record<number, number> = { 2: 0, 3: 1, 4: 2, 5: 3 }

      const targetRefIndex = verticalSectionMap[currentSectionIndex]

      if (targetRefIndex !== undefined && sectionRefs[targetRefIndex]?.current) {
        const sectionEl = sectionRefs[targetRefIndex].current!
        const isAtTop = sectionEl.scrollTop <= 0
        const isAtBottom = Math.abs(sectionEl.scrollTop + sectionEl.clientHeight - sectionEl.scrollHeight) <= 2

        if (delta > 0 && !isAtBottom) return
        if (delta < 0 && !isAtTop) return

        if (delta < 0 && isAtTop) {
          e.preventDefault()
          scrollContainer.scrollTo({ left: (currentSectionIndex - 1) * containerWidth, behavior: "smooth" })
          return
        }
        if (delta > 0 && isAtBottom) {
          e.preventDefault()
          if (currentSectionIndex === 5) return
          scrollContainer.scrollTo({ left: (currentSectionIndex + 1) * containerWidth, behavior: "smooth" })
          return
        }
      }

      e.preventDefault()

      if (Math.abs(delta) > 10) {
        let targetSection = currentSectionIndex
        if (delta > 0) {
          targetSection = Math.min(currentSectionIndex + 1, 5)
        } else {
          targetSection = Math.max(currentSectionIndex - 1, 0)
        }

        if (targetSection !== currentSectionIndex) {
          scrollContainer.scrollTo({
            left: targetSection * containerWidth,
            behavior: "smooth",
          })
        }
      }
    }, 16) // 60fps throttle

    scrollContainer.addEventListener("wheel", handleWheel, { passive: false })
    return () => scrollContainer.removeEventListener("wheel", handleWheel)
  }, [containerWidth, containerRef, sectionRefs])
}

// --- Sub-Components ---

const HeroSection = memo(({ onContactClick }: { onContactClick: () => void }) => (
  <section
    id="home"
    className="flex min-w-full snap-start items-center justify-center px-4 py-20"
    style={{ contentVisibility: "auto" }}
  >
    <div className="mx-auto max-w-4xl">
      <div className="text-center px-0 leading-5">
        <h1 className="mb-8 text-balance text-5xl tracking-tight text-white [text-shadow:_0_4px_20px_rgb(0_0_0_/_60%)] md:text-6xl lg:text-8xl">
          <span className="font-open-sans-custom not-italic">Turn </span>{" "}
          <span className="font-serif italic">Clicks</span>{" "}
          <span className="font-open-sans-custom not-italic">Into Customers.</span>
        </h1>

        <p className="mb-8 mx-auto max-w-2xl text-pretty leading-relaxed text-gray-300 [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-thin font-open-sans-custom tracking-wide text-xl">
          Professional, fast, and SEO-optimized websites for small businesses{" "}
          <span className="font-serif italic">leveraging AI</span> to boost leads, bookings, and sales.
        </p>

        <div className="flex justify-center">
          <ShinyButton className="px-8 py-3 text-base" onClick={onContactClick}>
            Get a Quote
          </ShinyButton>
        </div>
      </div>
    </div>
  </section>
))
HeroSection.displayName = "HeroSection"

const FeatureItem = memo(({ title, desc }: { title: string; desc: string }) => (
  <div className="flex flex-row gap-6 w-full items-start">
    <Check className="w-[1.05rem] h-[1.05rem] mt-2 text-white shrink-0" strokeWidth={3} />
    <div className="flex flex-col gap-1">
      <p className="text-white font-open-sans-custom">{title}</p>
      <p className="text-gray-300 text-sm font-open-sans-custom">{desc}</p>
    </div>
  </div>
))
FeatureItem.displayName = "FeatureItem"

const FeaturesSection = memo(() => (
  <section
    id="features"
    className="flex min-w-full snap-start items-center justify-center px-4 py-20"
    style={{ contentVisibility: "auto" }}
  >
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
  <div className="flex flex-col md:flex-row bg-white/5 border border-white/10 rounded-lg overflow-hidden backdrop-blur-sm">
    <div className="w-full md:w-1/2 border-r border-white/10 relative h-48 md:h-auto">
      <Image
        src={project.img || "/placeholder.svg"}
        alt={`${project.title} Website`}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover"
        loading="lazy"
      />
    </div>
    <div className="flex flex-col gap-3 p-5 text-white md:w-1/2">
      <Badge className="bg-white/10 w-fit border-white/20">{project.type}</Badge>
      <h3 className="text-xl font-bold">{project.title}</h3>
      <p className="text-gray-300 text-sm whitespace-pre-line">{project.desc.replace(" | ", "\n")}</p>
      <Button
        variant="outline"
        size="sm"
        className="w-fit bg-white/5 border-white/20 hover:bg-white/10 text-xs"
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
    <section
      id="portfolio"
      ref={ref}
      className="relative min-w-full snap-start overflow-y-auto px-4 pt-24 pb-20 [&::-webkit-scrollbar]:hidden"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none", contentVisibility: "auto" }}
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
        "relative border rounded-xl backdrop-blur-sm p-6 flex flex-col justify-between transition",
        isPopular
          ? "bg-white/10 border-white/25 backdrop-blur-xl scale-[1.03] shadow-[0_0_40px_rgba(255,255,255,0.2)]"
          : "bg-white/5 border-white/15 hover:bg-white/10",
      )}
    >
      <DotPattern width={6} height={6} />
      {isPopular && <Badge className="w-fit mb-4 bg-white/20 border-white/30 text-white">Most Popular</Badge>}
      <div>
        <h2 className="text-white text-2xl font-semibold font-open-sans-custom mb-2">{title}</h2>
        <p className="text-gray-300 text-sm">{description}</p>
        <p className="text-4xl text-white font-bold mt-6">{price}</p>
        <ul className="mt-6 space-y-2 text-gray-300 text-sm">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center gap-2">
              <Check className="w-4 text-white" /> {feature}
            </li>
          ))}
        </ul>
      </div>
      <Button size="lg" className="mt-8 bg-white text-black hover:bg-gray-100 font-semibold" onClick={onButtonClick}>
        {buttonText}
      </Button>
    </div>
  ),
)
PricingCard.displayName = "PricingCard"

const PricingSection = memo(
  forwardRef<HTMLDivElement, { onContactClick: () => void }>(({ onContactClick }, ref) => (
    <section
      id="pricing"
      ref={ref}
      className="relative min-w-full snap-start overflow-y-auto px-4 pt-24 pb-20 [&::-webkit-scrollbar]:hidden"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none", contentVisibility: "auto" }}
    >
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

        <div className="grid gap-6 md:grid-cols-3">
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
  <div className="px-3 py-2 bg-white/5 border border-white/10 rounded text-xs text-gray-300 font-open-sans-custom text-center">
    {tool}
  </div>
))
ToolBadge.displayName = "ToolBadge"

const AboutSection = memo(
  forwardRef<HTMLDivElement, {}>((props, ref) => (
    <section
      id="about"
      ref={ref}
      className="relative min-w-full snap-start overflow-y-auto px-4 pt-24 pb-20 [&::-webkit-scrollbar]:hidden"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none", contentVisibility: "auto" }}
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
                  Alongside web development, we offer local SEO setup, booking/payment integrations, analytics tracking,
                  and light automation workflows to help you work smarter, not harder. We believe websites shouldn't be
                  complicated or overpriced — they should simply work. With HireWebDev, you get a partner committed to
                  growing your business, one page at a time.
                </p>
              </div>

              <div className="mt-8 pt-8 border-t border-white/20">
                <p className="text-sm md:text-base text-gray-400 font-open-sans-custom mb-4">
                  <strong>Tools We Specialize In:</strong>
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {TOOLS_DATA.map((tool, i) => (
                    <ToolBadge key={i} tool={tool} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )),
)
AboutSection.displayName = "AboutSection"

const ContactSection = memo(
  forwardRef<HTMLDivElement, {}>((props, ref) => {
    const [submitted, setSubmitted] = useState(false)
    const { toast } = useToast()

    const handleSubmit = useCallback(() => {
      setSubmitted(true)
      toast({
        title: "Message Sent!",
        description: "Thanks for reaching out. We'll get back to you soon.",
        duration: 3000,
      })
    }, [toast])

    return (
      <section
        id="contact"
        ref={ref}
        className="relative min-w-full snap-start overflow-y-auto px-4 pt-24 pb-20"
        style={{ contentVisibility: "auto" }}
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
            description="Ready to transform your online operations? Tell us about your challenges and we'll create a tailored strategy."
            contactInfo={[
              { icon: MapPinIcon, label: "Address", value: "Pune, MH" },
              { icon: MailIcon, label: "Email", value: "hirewebdevsales@gmail.com", className: "col-span-2" },
            ]}
          >
            <iframe name="hidden_iframe" style={{ display: "none" }} title="hidden-iframe"></iframe>

            <form
              action="https://forms.gle/yMM4vebRJnfrYLdj8"
              method="POST"
              target="hidden_iframe"
              className="w-full space-y-4"
              onSubmit={handleSubmit}
            >
              {FORM_FIELDS.map((field, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <Label className="text-white font-open-sans-custom">{field.label}</Label>
                  <Input
                    name={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    required={field.label !== "Company"}
                  />
                </div>
              ))}

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
    )
  }),
)
ContactSection.displayName = "ContactSection"

// --- Main Component ---

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const portfolioRef = useRef<HTMLDivElement>(null)
  const pricingSectionRef = useRef<HTMLDivElement>(null)
  const aboutSectionRef = useRef<HTMLDivElement>(null)
  const contactSectionRef = useRef<HTMLDivElement>(null)

  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  const openContact = useCallback(() => setIsContactModalOpen(true), [])

  const sectionRefs = React.useMemo(() => [portfolioRef, pricingSectionRef, aboutSectionRef, contactSectionRef], [])

  useScrollNavigation(scrollContainerRef, sectionRefs)

  return (
    <main className="relative h-screen overflow-hidden">
      <LiquidMetalBackground />

      <div className="fixed inset-0 z-[5] bg-black/50" />

      <FloatingNavbar onContactClick={openContact} />

      <ContactModal open={isContactModalOpen} onOpenChange={setIsContactModalOpen} />

      <div
        ref={scrollContainerRef}
        className="relative z-10 flex h-screen w-full overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory will-change-scroll"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

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
