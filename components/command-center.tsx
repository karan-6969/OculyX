"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const ease = [0.22, 1, 0.36, 1] as const

const ALERTS = [
  { text: "Acoustic anomaly detected — Facility E, Zone 3", time: "09:41" },
  { text: "Cross-modal risk confirmed — Site B", time: "09:12" },
  { text: "All signals nominal — Asset A", time: "08:55" },
]

const STATS = [
  { value: "2,500+", label: "Signals Ingested" },
  { value: "840K", label: "Data Points / s" },
  { value: "1.2M", label: "Inferences Today" },
  { value: "99.99%", label: "System Uptime" },
]

const PIPELINE = ["SIGNAL", "CONTEXT", "INFERENCE", "TRUTH"]

/* ── animated confidence score ── */
function ConfidenceScore() {
  const [value, setValue] = useState(0)

  useEffect(() => {
    let raf = 0
    const start = performance.now()
    const target = 94.7

    const tick = (now: number) => {
      const t = Math.min((now - start) / 1400, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(target * eased)
      if (t < 1) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <span
      className="font-display font-extrabold tabular-nums"
      style={{ fontVariantNumeric: "tabular-nums" }}
    >
      {value.toFixed(1)}%
    </span>
  )
}

/* ── live-ish signal map (pulsing node grid) ── */
function SignalMap() {
  const nodes = [
    { x: 18, y: 30 },
    { x: 38, y: 58 },
    { x: 55, y: 26 },
    { x: 72, y: 66 },
    { x: 86, y: 40 },
  ]

  return (
    <div className="relative w-full h-full min-h-[170px] overflow-hidden">
      <svg
        viewBox="0 0 100 90"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
        aria-label="Signal ingestion map showing five monitored sites"
        role="img"
      >
        {/* grid */}
        {Array.from({ length: 11 }).map((_, i) => (
          <line
            key={`v-${i}`}
            x1={i * 10}
            y1={0}
            x2={i * 10}
            y2={90}
            stroke="hsl(var(--foreground) / 0.12)"
            strokeWidth={0.3}
          />
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <line
            key={`h-${i}`}
            x1={0}
            y1={i * 10}
            x2={100}
            y2={i * 10}
            stroke="hsl(var(--foreground) / 0.12)"
            strokeWidth={0.3}
          />
        ))}

        {/* link lines to center */}
        {nodes.map((node, i) => (
          <line
            key={`link-${i}`}
            x1={50}
            y1={45}
            x2={node.x}
            y2={node.y}
            stroke="#ea580c"
            strokeWidth={0.35}
            strokeDasharray="2 2"
            opacity={0.65}
          />
        ))}

        {/* nodes */}
        {nodes.map((node, i) => (
          <g key={`node-${i}`}>
            <circle cx={node.x} cy={node.y} r={2.4} fill="#ea580c" />
            <circle cx={node.x} cy={node.y} r={2.4} fill="none" stroke="#ea580c" strokeWidth={0.5}>
              <animate
                attributeName="r"
                values="2.4;7;2.4"
                dur="2.8s"
                begin={`${i * 0.45}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.9;0;0.9"
                dur="2.8s"
                begin={`${i * 0.45}s`}
                repeatCount="indefinite"
              />
            </circle>
          </g>
        ))}

        {/* core */}
        <rect x={46} y={41} width={8} height={8} fill="hsl(var(--foreground))" />
        <circle cx={50} cy={45} r={10} fill="none" stroke="hsl(var(--foreground))" strokeWidth={0.5} opacity={0.5} />
      </svg>
      <span className="absolute bottom-2 left-3 text-[9px] font-mono tracking-[0.2em] uppercase text-muted-foreground">
        ingestion_map.live
      </span>
    </div>
  )
}

export function CommandCenter() {
  return (
    <section id="platform" className="w-full px-6 py-20 lg:px-12">
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease }}
        className="flex items-center gap-4 mb-8"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
          {"// SECTION: PLATFORM_SHOWCASE"}
        </span>
        <div className="flex-1 border-t border-border" />
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
          009
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
        <div className="flex flex-col gap-4 max-w-2xl">
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground">
            THE OCULYX INFERENCE ENGINE™
          </span>
          <h2 className="text-2xl lg:text-4xl font-display font-extrabold tracking-tight uppercase text-balance">
            Beyond detection.
            <br />
            <span className="text-[#ea580c]">Toward understanding.</span>
          </h2>
          <p className="text-xs lg:text-sm font-mono text-muted-foreground leading-relaxed">
            Most systems score a single signal. OCULYX fuses video, audio,
            sensor telemetry, behavioral patterns, environmental context, and
            historical baselines — then returns structural integrity, threat
            probability, authenticity confidence, and predictive risk as one
            explainable verdict.
          </p>
        </div>

        <motion.a
          href="#solutions"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="self-start lg:self-end flex items-center gap-3 border-2 border-foreground px-5 py-3 text-xs font-mono tracking-widest uppercase hover:bg-foreground hover:text-background transition-colors duration-200"
        >
          Explore Platform
          <span className="text-[#ea580c]">{"->"}</span>
        </motion.a>
      </motion.div>

      {/* Dashboard */}
      <motion.div
        initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease }}
        className="border-2 border-foreground bg-foreground text-background"
      >
        {/* Dashboard top bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b-2 border-background/20">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 bg-[#ea580c]" />
            <span className="h-2 w-2 bg-background/60" />
            <span className="h-2 w-2 border border-background/40" />
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-background/70">
              OCULYX COMMAND CENTER — INFERENCE DASHBOARD
            </span>
          </div>
          <span className="flex items-center gap-2 border border-[#ea580c] px-2 py-1">
            <span className="h-1.5 w-1.5 bg-[#ea580c] animate-blink" />
            <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-[#ea580c]">
              Live
            </span>
          </span>
        </div>

        {/* Dashboard body */}
        <div className="grid grid-cols-1 lg:grid-cols-3">
          {/* Signal map */}
          <div className="border-b-2 lg:border-b-0 lg:border-r-2 border-background/20 p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-background/60">
                Signal Ingestion Map
              </span>
              <span className="text-[10px] font-mono text-background/40">52 SITES</span>
            </div>
            <SignalMap />
            <div className="flex-1" />
          </div>

          {/* Confidence score */}
          <div className="border-b-2 lg:border-b-0 lg:border-r-2 border-background/20 p-4 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-background/60">
                Inference Confidence
              </span>
              <span className="text-[10px] font-mono text-background/40">FUSION_v4</span>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-4xl lg:text-5xl leading-none text-[#ea580c] whitespace-nowrap">
                <ConfidenceScore />
              </span>
            </div>
            <div className="mt-4 h-3 border border-background/30">
              <motion.div
                className="h-full bg-[#ea580c]"
                initial={{ width: 0 }}
                whileInView={{ width: "94.7%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease }}
              />
            </div>
            <div className="mt-2 flex items-center justify-between text-[9px] font-mono uppercase tracking-[0.2em] text-background/50">
              <span>threshold 85.0%</span>
              <span>pass</span>
            </div>

            {/* Alert timeline */}
            <div className="mt-auto pt-6">
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-background/60">
                Alert Timeline
              </span>
              <div className="flex flex-col gap-0 mt-3 border-t border-background/20">
                {ALERTS.map((alert) => (
                  <div
                    key={alert.time}
                    className="flex items-start gap-3 py-3 border-b border-background/20 last:border-b-0"
                  >
                    <span className="h-1.5 w-1.5 bg-[#ea580c] mt-1.5 shrink-0" />
                    <p className="flex-1 text-[11px] font-mono leading-relaxed text-background/80">
                      {alert.text}
                    </p>
                    <span
                      className="text-[10px] font-mono text-background/50 shrink-0"
                      style={{ fontVariantNumeric: "tabular-nums" }}
                    >
                      {alert.time} AM
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats + pipeline */}
          <div className="p-4 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-background/60">
                Throughput
              </span>
              <span className="text-[10px] font-mono text-[#ea580c]">NOMINAL</span>
            </div>
            <div className="grid grid-cols-2 gap-0 border border-background/20">
              {STATS.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`p-4 border-background/20 ${
                    i % 2 === 0 ? "border-r" : ""
                  } ${i < 2 ? "border-b" : ""}`}
                >
                  <div className="text-xl font-display font-bold text-background">
                    {stat.value}
                  </div>
                  <div className="text-[9px] font-mono uppercase tracking-[0.15em] text-background/50 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Pipeline */}
            <div className="mt-auto pt-6">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
                {PIPELINE.map((step, i) => (
                  <span key={step} className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-mono tracking-[0.2em] uppercase ${
                        i === PIPELINE.length - 1 ? "text-[#ea580c]" : "text-background/80"
                      }`}
                    >
                      {step}
                    </span>
                    {i < PIPELINE.length - 1 && (
                      <span className="text-[10px] font-mono text-background/40">{"->"}</span>
                    )}
                  </span>
                ))}
              </div>
              <div className="mt-4 border-t border-background/20 pt-4">
                <p className="text-[11px] font-mono text-background/60 leading-relaxed">
                  {"// Every verdict ships with the signals that produced it."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
