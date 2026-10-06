"use client"

import { motion } from "framer-motion"

const ease = [0.22, 1, 0.36, 1] as const

const WORDS = ["Predict", "Protect", "Verify"]

export function VerifyBand() {
  return (
    <section aria-label="Predict. Protect. Verify." className="w-full px-6 pb-4 lg:px-12">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease }}
        className="border-2 border-foreground bg-foreground text-background px-5 py-8 lg:px-10 lg:py-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 lg:gap-x-10"
      >
        {WORDS.map((word, i) => (
          <span key={word} className="flex items-baseline">
            <motion.span
              initial={{ opacity: 0, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5, ease }}
              className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight uppercase"
            >
              {word}
            </motion.span>
            <span className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-[#ea580c]">
              .
            </span>
          </span>
        ))}
        <span className="w-full text-center text-[10px] font-mono tracking-[0.3em] uppercase text-background/50 mt-2">
          {"// one fused verdict across every modality"}
        </span>
      </motion.div>
    </section>
  )
}
