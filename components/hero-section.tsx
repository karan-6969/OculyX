"use client"

import { WorkflowDiagram } from "@/components/workflow-diagram"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

const ease = [0.22, 1, 0.36, 1] as const

export function HeroSection({ onDemo }: { onDemo: () => void }) {
  return (
    <section className="relative w-full px-6 pt-6 pb-12 sm:px-12 lg:px-24 lg:pt-10 lg:pb-16">
      <div className="flex flex-col items-center text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="flex items-center gap-3 border border-foreground/20 px-3 py-1.5 mb-6"
        >
          <span className="h-1.5 w-1.5 bg-[#ea580c] animate-blink" />
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground">
            {"// SYSTEM: OCULYX_INFERENCE_ENGINE"}
          </span>
        </motion.div>

        {/* Top headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, ease }}
          className="font-display text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight text-foreground mb-2 select-none uppercase"
        >
          Predict. Protect.
        </motion.h1>

        {/* Central signal-fusion diagram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease }}
          className="w-full max-w-2xl my-4 lg:my-6"
        >
          <WorkflowDiagram />
        </motion.div>

        {/* Bottom headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.25, ease }}
          className="font-display text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight text-foreground mb-4 select-none uppercase"
        >
          Verify.
        </motion.h1>

        {/* Original-site headline */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease }}
          className="text-base sm:text-xl lg:text-2xl font-display font-bold tracking-tight uppercase text-foreground mb-4 text-balance max-w-2xl"
        >
          The Shortest Path to
          <span className="text-[#ea580c]"> Operational Truth</span>
        </motion.h2>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45, ease }}
          className="text-xs lg:text-sm text-muted-foreground max-w-xl mb-6 leading-relaxed font-mono"
        >
          OCULYX is the multi-modal inference engine between raw signal and
          operational truth. Video, audio, telemetry, and behavior fused into a
          single verdict — structural integrity, threat probability, and
          authenticity confidence, evaluated at the edge.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6, ease }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <motion.button
            onClick={onDemo}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="group flex items-center gap-0 bg-foreground text-background text-sm font-mono tracking-wider uppercase"
          >
            <span className="flex items-center justify-center w-10 h-10 bg-[#ea580c]">
              <motion.span
                className="inline-flex"
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <ArrowRight size={16} strokeWidth={2} className="text-background" />
              </motion.span>
            </span>
            <span className="px-5 py-2.5">Request a Demo</span>
          </motion.button>

          <motion.a
            href="#about"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 border border-foreground/30 px-4 py-3 text-xs font-mono tracking-wider uppercase text-muted-foreground hover:text-foreground hover:border-foreground transition-colors duration-200"
          >
            Know more
            <span className="text-[#ea580c]">{"v"}</span>
          </motion.a>

          <motion.a
            href="#platform"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-3 border-2 border-foreground px-5 py-3 text-sm font-mono tracking-wider uppercase text-foreground hover:bg-foreground hover:text-background transition-colors duration-200"
          >
            Explore Platform
            <span className="text-[#ea580c]">{"->"}</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
