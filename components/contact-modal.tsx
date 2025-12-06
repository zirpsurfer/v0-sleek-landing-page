"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, ExternalLink } from "lucide-react"

interface ContactModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ContactModal({ open, onOpenChange }: ContactModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)

    const params = new URLSearchParams()
    params.append("entry.1996151955", formData.get("name") as string)
    params.append("entry.1756661667", formData.get("email") as string)
    params.append("entry.406372998", formData.get("company") as string)
    params.append("entry.1865774663", formData.get("message") as string)

    try {
      // POST to Google Form
      await fetch(
        "https://docs.google.com/forms/d/e/1FAIpQLSe-OgT19gHdZkgkvFamTbuCf-qZ_yVPu4VPW20n__4Jr9A42g/formResponse",
        {
          method: "POST",
          body: params,
          mode: "no-cors",
        },
      )

      toast({
        title: "Message sent!",
        description: "We'll get back to you within 24 hours.",
      })
      ;(e.target as HTMLFormElement).reset()
      onOpenChange(false)
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] border-2 border-white/10 bg-white/5 backdrop-blur-sm text-white p-6">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-2xl font-bold font-open-sans-custom [text-shadow:_0_2px_8px_rgb(0_0_0_/_40%)]">
            Get a Quote
          </DialogTitle>
          <DialogDescription className="font-open-sans-custom text-gray-300 [text-shadow:_0_2px_6px_rgb(0_0_0_/_40%)]">
            Let us know how to contact you and we'll reach out to you within 24 hours.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="font-open-sans-custom text-gray-200 text-sm [text-shadow:_0_2px_6px_rgb(0_0_0_/_40%)]"
            >
              Name *
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="Your full name"
              required
              className="font-open-sans-custom bg-white/5 border border-white/10 text-white placeholder:text-gray-400 focus:bg-white/10 focus:border-white/20 transition-all [text-shadow:_0_2px_6px_rgb(0_0_0_/_40%)]"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="font-open-sans-custom text-gray-200 text-sm [text-shadow:_0_2px_6px_rgb(0_0_0_/_40%)]"
            >
              Email *
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="your@email.com"
              required
              className="font-open-sans-custom bg-white/5 border border-white/10 text-white placeholder:text-gray-400 focus:bg-white/10 focus:border-white/20 transition-all [text-shadow:_0_2px_6px_rgb(0_0_0_/_40%)]"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="company"
              className="font-open-sans-custom text-gray-200 text-sm [text-shadow:_0_2px_6px_rgb(0_0_0_/_40%)]"
            >
              Company
            </Label>
            <Input
              id="company"
              name="company"
              placeholder="Your company name"
              className="font-open-sans-custom bg-white/5 border border-white/10 text-white placeholder:text-gray-400 focus:bg-white/10 focus:border-white/20 transition-all [text-shadow:_0_2px_6px_rgb(0_0_0_/_40%)]"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="message"
              className="font-open-sans-custom text-gray-200 text-sm [text-shadow:_0_2px_6px_rgb(0_0_0_/_40%)]"
            >
              Message *
            </Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Tell us about your project..."
              rows={4}
              required
              className="font-open-sans-custom resize-none bg-white/5 border border-white/10 text-white placeholder:text-gray-400 focus:bg-white/10 focus:border-white/20 transition-all [text-shadow:_0_2px_6px_rgb(0_0_0_/_40%)]"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-white text-black hover:bg-gray-100 font-open-sans-custom [text-shadow:_0_1px_2px_rgb(0_0_0_/_10%)]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              "Send Message"
            )}
          </Button>
        </form>

        {/* Calendly CTA */}
        <div className="mt-4 pt-4 border-t border-white/10">
          <Button
            variant="outline"
            className="w-full font-open-sans-custom bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white transition-all [text-shadow:_0_2px_6px_rgb(0_0_0_/_40%)]"
            asChild
          >
            <a
              href="https://calendly.com/pranavkadam1111/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              Prefer a quick call? Book a meeting
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
