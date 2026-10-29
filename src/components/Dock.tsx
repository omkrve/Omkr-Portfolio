import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform, type MotionValue } from "motion/react";
import { FileText, Layers, Mail, Moon, PenTool, Sun, Terminal, User, type LucideIcon } from "lucide-react";
import { useTheme } from "../hooks";

type Item = { id: string; label: string; Icon: LucideIcon; to?: string };

const items: Item[] = [
  { id: "top", label: "Home", Icon: User },
  { id: "cloud", label: "Cloud", Icon: Terminal },
  { id: "design", label: "Design", Icon: PenTool },
  { id: "about", label: "About", Icon: Layers },
  { id: "contact", label: "Contact", Icon: Mail },
  { id: "resume", label: "Resume", Icon: FileText, to: "/resume" },
];

const sectionIds = ["top", "cloud", "design", "about", "contact"];

function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState("top");
  useEffect(() => {
    if (!enabled) return;
    const els = sectionIds.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [enabled]);
  return active;
}

function DesktopItem({
  item,
  active,
  mouseY,
  onSelect,
}: {
  item: Item;
  active: boolean;
  mouseY: MotionValue<number>;
  onSelect: (i: Item) => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const distance = useTransform(mouseY, (v) => {
    const r = ref.current?.getBoundingClientRect();
    return r ? v - (r.top + r.height / 2) : 9999;
  });
  const size = useSpring(useTransform(distance, [-110, 0, 110], [42, 58, 42]), { stiffness: 420, damping: 30 });
  const Icon = item.Icon;

  return (
    <motion.button
      ref={ref}
      type="button"
      style={{ width: size, height: size }}
      onClick={() => onSelect(item)}
      aria-label={item.label}
      aria-current={active ? "page" : undefined}
      className={`group relative grid place-items-center rounded-2xl transition-colors duration-300 ${
        active ? "bg-accent text-white" : "text-ink-2 hover:bg-ink/[0.07] hover:text-ink"
      }`}
    >
      <Icon size={20} strokeWidth={1.8} />
      <span className="pointer-events-none absolute left-full ml-4 -translate-x-1 rounded-lg border border-line bg-surface px-2.5 py-1.5 text-xs font-medium whitespace-nowrap text-ink opacity-0 shadow-xl transition duration-200 group-hover:translate-x-0 group-hover:opacity-100">
        {item.label}
      </span>
    </motion.button>
  );
}

function ThemeButton({ className = "" }: { className?: string }) {
  const { theme, toggle } = useTheme();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      className={`relative grid place-items-center overflow-hidden rounded-full border border-line text-ink-2 transition-colors hover:text-ink ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: 14, rotate: -60, opacity: 0 }}
          animate={{ y: 0, rotate: 0, opacity: 1 }}
          exit={{ y: -14, rotate: 60, opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="grid place-items-center"
        >
          {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

export default function Dock() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const onHome = pathname === "/";
  const spy = useActiveSection(onHome);
  const active = onHome ? spy : "resume";
  const mouseY = useMotionValue(9999);

  const select = (item: Item) => {
    if (item.to) return navigate(item.to);
    if (!onHome) return navigate(`/#${item.id}`);
    if (item.id === "top") return window.scrollTo({ top: 0, behavior: "smooth" });
    document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* Desktop: vertical dock with magnification */}
      <motion.nav
        aria-label="Primary"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        onMouseMove={(e) => mouseY.set(e.clientY)}
        onMouseLeave={() => mouseY.set(9999)}
        className="fixed top-1/2 left-5 z-50 hidden -translate-y-1/2 flex-col items-center gap-1.5 rounded-[26px] border border-line bg-surface/70 p-2 shadow-[0_20px_60px_-20px_rgba(0,0,0,.6)] backdrop-blur-xl md:flex"
      >
        {items.map((item) => (
          <DesktopItem key={item.id} item={item} active={active === item.id} mouseY={mouseY} onSelect={select} />
        ))}
        <span className="my-1 h-px w-7 bg-line" />
        <ThemeButton className="h-10 w-10" />
      </motion.nav>

      {/* Mobile: floating bar at the bottom */}
      <motion.nav
        aria-label="Primary"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 z-50 flex -translate-x-1/2 items-center gap-0.5 rounded-full border border-line bg-surface/80 p-1.5 shadow-[0_20px_50px_-15px_rgba(0,0,0,.7)] backdrop-blur-xl md:hidden"
      >
        {items.map((item) => {
          const Icon = item.Icon;
          const on = active === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => select(item)}
              aria-label={item.label}
              aria-current={on ? "page" : undefined}
              className={`grid h-11 w-11 place-items-center rounded-full transition-colors ${
                on ? "bg-accent text-white" : "text-ink-2 active:bg-ink/10"
              }`}
            >
              <Icon size={19} strokeWidth={1.8} />
            </button>
          );
        })}
        <ThemeButton className="ml-1 h-10 w-10" />
      </motion.nav>
    </>
  );
}
