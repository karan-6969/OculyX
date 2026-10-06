"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Minus, Plus } from "lucide-react"

const ease = [0.22, 1, 0.36, 1] as const

interface Tab {
  id: string
  label: string
  heading: string
  body: string
  chips: string[]
  items: { index: string; title: string; body: string }[]
}

const TABS: Tab[] = [
  {
    id: "sense",
    label: "Sensing & Understanding",
    heading: "Sensing & Understanding",
    body: "Collect data from sensors, cameras, audio streams, and operational systems, then apply computer vision, audio intelligence, time-series AI, and anomaly detection across every modality.",
    chips: ["Sense Signals", "Understand Context", "Temporal Baseline"],
    items: [
      {
        index: "01",
        title: "Sense",
        body: "Collect data from sensors, cameras, audio streams, and operational systems.",
      },
      {
        index: "02",
        title: "Understand",
        body: "Apply advanced computer vision, audio intelligence, time-series AI, and anomaly detection.",
      },
      {
        index: "03",
        title: "Signal Ingestion",
        body: "Continuously process and normalize high-frequency telemetry at the edge to build a robust operational baseline.",
      },
    ],
  },
  {
    id: "surveil",
    label: "Surveillance & Intelligence",
    heading: "Surveillance & Intelligence",
    body: "Watch every feed at once. OCULYX detects meaningful events, ranks them by risk, and writes the incident summary before an operator opens the queue.",
    chips: ["Behavior Analytics", "Risk Ranking", "Auto Summaries"],
    items: [
      {
        index: "01",
        title: "Detect",
        body: "Behavior analytics run across every camera and audio feed in real time — no sampling, no blind windows.",
      },
      {
        index: "02",
        title: "Prioritize",
        body: "Events are scored against site context and historical baselines, so only actionable risk reaches the operator.",
      },
      {
        index: "03",
        title: "Summarize",
        body: "Each incident ships with a timeline, the source signals, and a plain-language brief ready for handoff.",
      },
    ],
  },
  {
    id: "infer",
    label: "Inference & Action",
    heading: "Inference & Action",
    body: "One fusion pass converts correlated signals into a verdict — threat probability, structural integrity, authenticity confidence — then routes it to the system that acts on it.",
    chips: ["Cross-Modal Fusion", "Verdict Routing", "Truth Reports"],
    items: [
      {
        index: "01",
        title: "Fuse",
        body: "Video, audio, telemetry, behavior, and history are reconciled into one state model per asset.",
      },
      {
        index: "02",
        title: "Verify",
        body: "Causal checks separate genuine correlation from coincident noise and confirm authenticity claims.",
      },
      {
        index: "03",
        title: "Act",
        body: "Verdicts trigger mitigation loops, quarantine shields, and signed truth reports — with full provenance.",
      },
    ],
  },
]

export function CapabilityTabs() {
  const [activeId, setActiveId] = useState(TABS[0].id)
  const [openItem, setOpenItem] = useState<string | null>("01")

  const active = TABS.find((t) => t.id === activeId) ?? TABS[0]

  return (
    <section id="capabilities" className="w-full px-6 py-20 lg:px-12">
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease }}
        className="flex items-center gap-4 mb-8"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
          {"// SECTION: CAPABILITY_MATRIX"}
        </span>
        <div className="flex-1 border-t border-border" />
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
          006
        </span>
      </motion.div>

      {/* Tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 border-2 border-foreground mb-0" role="tablist" aria-label="Capability areas">
        {TABS.map((tab, i) => {
          const isActive = tab.id === activeId
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              id={`tab-${tab.id}`}
              onClick={() => {
                setActiveId(tab.id)
                setOpenItem("01")
              }}
              className={`text-left px-5 py-4 text-xs font-mono tracking-widest uppercase border-foreground transition-colors duration-200 ${
                i < 2 ? "border-b-2 lg:border-b-0 lg:border-r-2" : ""
              } ${isActive ? "bg-foreground text-background" : "bg-background text-muted-foreground hover:text-foreground"}`}
            >
              <span className="flex items-center justify-between gap-3">
                {tab.label}
                <span className={isActive ? "text-[#ea580c]" : "text-muted-foreground"}>
                  {String(i + 1).padStart(2, "0")}
                </span>
              </span>
            </button>
          )
        })}
      </div>

      {/* Panel */}
      <div
        id={`panel-${active.id}`}
        role="tabpanel"
        aria-labelledby={`tab-${active.id}`}
        className="border-2 border-t-0 border-foreground grid grid-cols-1 lg:grid-cols-5"
      >
        {/* Left: intro + accordion */}
        <div className="lg:col-span-3 p-5 lg:p-6 flex flex-col gap-5 border-b-2 lg:border-b-0 lg:border-r-2 border-foreground">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground">
              {`// HOW IT WORKS`}
            </span>
            <h3 className="text-xl lg:text-2xl font-display font-extrabold uppercase tracking-tight">
              {active.heading}
            </h3>
            <p className="text-xs lg:text-sm font-mono text-muted-foreground leading-relaxed">
              {active.body}
            </p>
          </div>

          {/* Accordion */}
          <div className="border-2 border-foreground">
            {active.items.map((item) => {
              const isOpen = openItem === item.index
              return (
                <div key={item.index} className="border-b border-border last:border-b-0">
                  <button
                    onClick={() => setOpenItem(isOpen ? null : item.index)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 px-4 py-3 text-left"
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-[10px] font-mono text-[#ea580c]">{item.index}</span>
                      <span
                        className={`text-sm font-mono uppercase tracking-wide ${
                          isOpen ? "text-foreground font-bold" : "text-foreground"
                        }`}
                      >
                        {item.title}
                      </span>
                    </span>
                    <span className="text-muted-foreground">
                      {isOpen ? <Minus size={14} strokeWidth={2} /> : <Plus size={14} strokeWidth={2} />}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease }}
                        className="overflow-hidden"
                      >
                        <p className="px-4 pb-4 pl-11 text-xs font-mono text-muted-foreground leading-relaxed">
                          {item.body}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right: visual */}
        <div className="lg:col-span-2 p-5 lg:p-6 flex flex-col gap-4 bg-foreground text-background">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-background/60">
              MODULE_STATE
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 bg-[#ea580c] animate-blink" />
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#ea580c]">
                ACTIVE
              </span>
            </span>
          </div>

          <div className="flex flex-col gap-2 flex-1 justify-center">
            {active.chips.map((chip, i) => (
              <motion.div
                key={chip}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08, duration: 0.35, ease }}
                className="flex items-center justify-between border border-background/30 px-3 py-2.5"
              >
                <span className="text-xs font-mono uppercase tracking-wide">{chip}</span>
                <span className="text-[10px] font-mono text-[#ea580c]">
                  {["OK", "OK", "OK"][i]}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="border-t border-background/20 pt-3 flex items-center justify-between">
            <span className="text-[10px] font-mono text-background/50 uppercase tracking-[0.2em]">
              {"// oclyx.fusion"}</span>
            <span className="text-[10px] font-mono text-background/50 uppercase tracking-[0.2em]">
              v4.0.1
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
