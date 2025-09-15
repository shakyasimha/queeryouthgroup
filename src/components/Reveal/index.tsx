"use client";

import { motion } from "framer-motion";
import { ReactNode, useRef } from "react";
import { useInView } from "framer-motion";

interface RevealProps {
  children: ReactNode;
  delay?: number;
}

export default function Reveal({ children, delay = 0 }: RevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.2 }); // 20% visibility

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
