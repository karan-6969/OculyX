"use client"

import { motion } from "framer-motion"

const ease = [0.22, 1, 0.36, 1] as const

const FEEDS = [
  { id: "CAM-01", label: "ASSET-A / BRIDGE DECK", variant: 0 },
  { id: "CAM-02", label: "SITE-B / SUBSTATION", variant: 1 },
  { id: "CAM-03", label: "HUB-C / LOADING BAY", variant: 2 },
  { id: "CAM-04", label: "MINE-D / SHAFT-04", variant: 3 },
  { id: "CAM-05", label: "FACILITY-E / ZONE 3", variant: 1 },
  { id: "CAM-06", label: "GRID-N / SWITCHYARD", variant: 2 },
  { id: "CAM-07", label: "PIPE-7 / VALVE STATION", variant: 3 },
  { id: "CAM-08", label: "PERIM-2 / NORTH GATE", variant: 0 },
]

const PATTERNS = [
  "repeating-linear-gradient(0deg, rgba(234,88,12,0.18) 0 2px, transparent 2px 6px)",
  "radial-gradient(rgba(234,88,12,0.35) 1px, transparent 1px)",
  "repeating-linear-gradient(45deg, rgba(234,88,12,0.16) 0 3px, transparent 3px 9px)",
  "repeating-linear-gradient(90deg, rgba(234,88,12,0.22) 0 1px, transparent 1px 10px)",
]

function cellClass(index: number) {
  const base = "relative flex flex-col bg-background"
  const bottom =
    index < 6 ? "border-b-2" : index === 6 ? "border-b-2 lg:border-b-0" : "border-b-0"
  const rightSm = index % 2 === 0 ? "sm:border-r-2" : ""
  const rightLg = index === 1 || index === 5 ? "lg:border-r-2" : ""
  return `${base} ${bottom} ${rightSm} ${rightLg} border-foreground`
}

function FeedTile({ feed, index }: { feed: (typeof FEEDS)[number]; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: (index % 4) * 0.08, duration: 0.5, ease }}
      className={cellClass(index)}
    >
      {/* header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-border">
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 bg-[#ea580c] animate-blink" />
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-foreground">
            {feed.id}
          </span>
        </span>
        <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#ea580c]">
          LIVE
        </span>
      </div>

      {/* feed surface */}
      <div
        className="relative h-32 overflow-hidden bg-foreground group-hover:transition-transform duration-300"
        style={{ backgroundImage: PATTERNS[feed.variant], backgroundSize: "12px 12px" }}
      >
        {/* scanning sweep */}
        <motion.span
          className="absolute inset-x-0 h-8 bg-[#ea580c]/25"
          initial={{ top: -32 }}
          animate={{ top: 160 }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "linear", delay: index * 0.32 }}
        />
        {/* crosshair */}
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="block w-8 h-8 border border-background/50" />
        </span>
        <span className="absolute bottom-1.5 right-2 text-[9px] font-mono text-background/70">
          1920x1080
        </span>
      </div>

      {/* footer */}
      <div className="flex items-center justify-between px-3 py-2 border-t border-border">
        <span className="text-[10px] font-mono uppercase text-muted-foreground truncate">
          {feed.label}
        </span>
        <span className="text-[10px] font-mono text-muted-foreground" style={{ fontVariantNumeric: "tabular-nums" }}>
          {String(9 + (index % 3)).padStart(2, "0")}:
          {String((index * 7) % 60).padStart(2, "0")}
        </span>
      </div>
    </motion.article>
  )
}

export function LiveShowcase() {
  return (
    <section id="live" className="w-full px-6 py-20 lg:px-12">
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease }}
        className="flex items-center gap-4 mb-8"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
          {"// SECTION: REAL_TIME_OPERATIONS"}
        </span>
        <div className="flex-1 border-t border-border" />
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
          007
        </span>
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease }}
        className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10"
      >
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl lg:text-4xl font-display font-extrabold tracking-tight uppercase text-balance">
            3D Showcase of
            <br />
            <span className="text-[#ea580c]">Live Systems</span>
          </h2>
          <p className="text-xs lg:text-sm font-mono text-muted-foreground leading-relaxed max-w-xl">
            Eight instrumented feeds rendered live from the fusion core — every frame scored
            for threat, integrity, and authenticity as it arrives.
          </p>
        </div>
        <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground whitespace-nowrap">
          {"[ 8 feeds // 4.2ms p99 ]"}
        </span>
      </motion.div>

      {/* Feed grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-2 border-foreground">
        {FEEDS.map((feed, i) => (
          <FeedTile key={feed.id} feed={feed} index={i} />
        ))}
      </div>
    </section>
  )
}
