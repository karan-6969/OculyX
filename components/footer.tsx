"use client"

import { Aperture, Github, Linkedin, Youtube } from "lucide-react"
import { motion } from "framer-motion"

const ease = [0.22, 1, 0.36, 1] as const

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Intelligence Platform",
    links: [
      { label: "Critical Infrastructure Intelligence", href: "#solutions" },
      { label: "Surveillance Intelligence Lab™", href: "#solutions" },
      { label: "Reality Trust Center™", href: "#solutions" },
      { label: "OCULYX Command Center™", href: "#platform" },
    ],
  },
  {
    title: "Insights",
    links: [
      { label: "Case Simulations", href: "#research" },
      { label: "Research & Innovation", href: "#research" },
      { label: "Industries We Serve", href: "#research" },
      { label: "AI Trust Index™", href: "#capabilities" },
      { label: "Blogs", href: "#research" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#about" },
      { label: "As Seen In", href: "#company" },
      { label: "Careers", href: "#company" },
      { label: "Contact Us", href: "#request-demo" },
      { label: "FAQs", href: "#capabilities" },
    ],
  },
]

const ALLIANCES = [
  "DPIIT · STARTUP INDIA",
  "NVIDIA INCEPTION",
  "AWS ACTIVATE",
  "AWS SECURITY BEST PRACTICES",
  "DPDP ACT 2023",
  "IIT DELHI · FITT",
]

const LEGAL = [
  { label: "Privacy", href: "#company" },
  { label: "Terms", href: "#company" },
  { label: "Status", href: "#platform" },
  { label: "GitHub", href: "https://github.com" },
]

function scrollTo(href: string, onDemo: () => void) {
  if (href === "#request-demo") {
    onDemo()
    return
  }
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
}

export function Footer({ onDemo }: { onDemo: () => void }) {
  return (
    <motion.footer
      id="company"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease }}
      className="w-full border-t-2 border-foreground px-6 pt-12 pb-8 lg:px-12"
    >
      {/* Quote */}
      <div className="border-2 border-foreground px-5 py-6 lg:px-8 lg:py-8 mb-12">
        <p className="text-lg lg:text-2xl font-display font-bold tracking-tight uppercase leading-snug text-balance max-w-4xl">
          {"“The future's greatest challenge is not the lack of data. It is the ability to determine what is true.”"}
        </p>
        <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground mt-4">
          — OCULYX FIELD NOTES / MULTI-MODAL INFERENCE ENGINE
        </p>
      </div>

      {/* Main footer grid */}
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 pb-10 border-b-2 border-foreground">
        {/* Brand */}
        <div className="flex flex-col gap-4 lg:w-72 shrink-0">
          <div className="flex items-center gap-2.5">
            <Aperture size={16} strokeWidth={1.5} className="text-[#ea580c]" />
            <span className="text-xs font-display tracking-[0.2em] uppercase font-bold">
              OCULYX
            </span>
          </div>
          <p className="text-xs font-mono text-muted-foreground leading-relaxed">
            Multiple weak signals individually mean little. Combined intelligently, they reveal
            operational truth — that is the core of OCULYX.
          </p>
          <p className="text-xs font-mono text-muted-foreground leading-relaxed">
            We build the real-world inference engine that converts fragmented signals into
            operational truth across infrastructure, authenticity, and industrial systems.
          </p>
          <div className="flex items-center gap-3 pt-1">
            {[
              { Icon: Github, label: "OCULYX on GitHub", href: "https://github.com" },
              { Icon: Linkedin, label: "OCULYX on LinkedIn", href: "https://linkedin.com" },
              { Icon: Youtube, label: "OCULYX on YouTube", href: "https://youtube.com" },
            ].map(({ Icon, label, href }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -2 }}
                className="flex items-center justify-center w-9 h-9 border border-foreground/20 text-muted-foreground hover:text-foreground hover:border-foreground transition-colors duration-200"
                aria-label={label}
              >
                <Icon size={14} strokeWidth={1.5} />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 flex-1">
          {COLUMNS.map((col) => (
            <div key={col.title} className="flex flex-col gap-4">
              <h4 className="text-[10px] font-mono tracking-[0.2em] uppercase text-foreground font-bold">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault()
                        scrollTo(link.href, onDemo)
                      }}
                      className="text-xs font-mono text-muted-foreground hover:text-[#ea580c] transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Partner alliances */}
      <div className="py-6 border-b-2 border-foreground">
        <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground">
          {"PARTNER COMPANIES & ECOSYSTEM ALLIANCES"}
        </span>
        <div className="flex flex-wrap gap-2 mt-3">
          {ALLIANCES.map((name) => (
            <span
              key={name}
              className="border border-foreground/25 px-3 py-2 text-[10px] font-mono tracking-[0.15em] uppercase text-muted-foreground"
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-6">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-display tracking-[0.15em] uppercase font-bold text-foreground">
            OCULYX
          </span>
          <span className="text-[10px] font-mono tracking-widest text-muted-foreground">
            {`(C) 2026 OCULYX ANALYTICS. ALL RIGHTS RESERVED.`}
          </span>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">
            {"MULTI-MODAL INFERENCE ENGINE"}
          </span>
          <span className="hidden sm:flex items-center gap-2 border border-foreground/20 px-2.5 py-1.5">
            <span className="h-1.5 w-1.5 bg-[#ea580c] animate-blink" />
            <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-muted-foreground">
              Status: Nominal
            </span>
          </span>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-[10px] font-mono leading-relaxed text-muted-foreground pt-5">
        <span className="font-bold text-foreground">DISCLAIMER:</span>{" "}
        {"OCULYX strives to provide accurate and up-to-date information; however, we are not liable for discrepancies."}
      </p>

      {/* Secondary legal row */}
      <div className="flex items-center gap-6 pt-6">
        {LEGAL.map((link) => (
          <motion.a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noreferrer" : undefined}
            onClick={(e) => {
              if (link.href.startsWith("http")) return
              e.preventDefault()
              scrollTo(link.href, onDemo)
            }}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease }}
            className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            {link.label}
          </motion.a>
        ))}
      </div>
    </motion.footer>
  )
}
