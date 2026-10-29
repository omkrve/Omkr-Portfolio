import type { ReactNode } from "react";
import { motion } from "motion/react";

// Route wrapper: an accent curtain wipes over the old page, then lifts off the new one.
export default function Page({ children }: { children: ReactNode }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.35, duration: 0.4 } }}
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
      >
        {children}
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[150] bg-accent"
        style={{ transformOrigin: "top" }}
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0, transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.1 } }}
        exit={{ scaleY: 1, transformOrigin: "bottom", transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1] } }}
      />
    </>
  );
}
