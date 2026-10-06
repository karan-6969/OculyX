"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { SignalTicker } from "@/components/signal-ticker"
import { FeatureGrid } from "@/components/feature-grid"
import { AboutSection } from "@/components/about-section"
import { CapabilityTabs } from "@/components/capability-tabs"
import { SolutionsSection } from "@/components/solutions-section"
import { LiveShowcase } from "@/components/live-showcase"
import { VerifyBand } from "@/components/verify-band"
import { CommandCenter } from "@/components/command-center"
import { SystemFocus } from "@/components/system-focus"
import { MediaMarquee } from "@/components/media-marquee"
import { GlitchMarquee } from "@/components/glitch-marquee"
import { Footer } from "@/components/footer"
import { ChatWidget } from "@/components/chat-widget"
import { CookieBanner } from "@/components/cookie-banner"
import { DemoDialog } from "@/components/demo-dialog"

export default function Page() {
  const [demoOpen, setDemoOpen] = useState(false)
  const openDemo = () => setDemoOpen(true)

  return (
    <div id="top" className="min-h-screen dot-grid-bg">
      <Navbar onDemo={openDemo} />
      <main>
        <HeroSection onDemo={openDemo} />
        <SignalTicker />
        <FeatureGrid />
        <AboutSection />
        <CapabilityTabs />
        <LiveShowcase />
        <SolutionsSection />
        <VerifyBand />
        <CommandCenter />
        <SystemFocus />
        <MediaMarquee />
        <GlitchMarquee />
      </main>
      <Footer onDemo={openDemo} />
      <ChatWidget onDemo={openDemo} />
      <CookieBanner />
      <DemoDialog open={demoOpen} onClose={() => setDemoOpen(false)} />
    </div>
  )
}
