import type { ElementType, ReactNode } from "react";
import { motion } from "motion/react";

// Text that rises out of a mask when it scrolls into view.
export default function MaskText({
  as: Tag = "h2",
  className = "",
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag className={`overflow-hidden pb-[0.1em] ${className}`}>
      <motion.span
        className="block"
        initial={{ y: "110%", rotate: 2 }}
        whileInView={{ y: 0, rotate: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.span>
    </Tag>
  );
}
