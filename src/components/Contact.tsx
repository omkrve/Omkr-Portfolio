import { ArrowUpRight } from "lucide-react";
import { profile } from "../data";
import Magnetic from "./Magnetic";
import MaskText from "./MaskText";

export default function Contact() {
  const socials = profile.socials.filter((s) => s.href);
  return (
    <section id="contact" className="relative z-10 pb-28 md:pb-12">
      <div className="shell">
        <div className="relative overflow-hidden rounded-[32px] border border-line bg-surface px-6 py-16 md:rounded-[44px] md:px-14 md:py-28">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-40 -right-40 h-[480px] w-[480px] rounded-full opacity-40 blur-3xl"
            style={{ background: "radial-gradient(circle, var(--accent), transparent 65%)" }}
          />
          <div className="relative">
            <MaskText className="display text-[clamp(2.5rem,8vw,6.75rem)]">Let's build</MaskText>
            <MaskText className="display text-[clamp(2.5rem,8vw,6.75rem)] text-ink-3">something together.</MaskText>

            <div className="mt-12">
              <Magnetic strength={0.2}>
                <a
                  href={`mailto:${profile.email}`}
                  className="group inline-flex max-w-full items-center gap-4 rounded-full bg-accent px-8 py-5 text-[clamp(1.05rem,3.2vw,1.6rem)] font-medium text-white shadow-[0_20px_60px_-20px_var(--accent)] transition-transform active:scale-[0.98]"
                >
                  <span className="break-all">{profile.email}</span>
                  <ArrowUpRight className="shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              </Magnetic>
            </div>

            <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-lg text-ink-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noreferrer noopener" className="transition-colors hover:text-ink">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-8 px-2 text-sm text-ink-3">
          © {new Date().getFullYear()} {profile.name}. Built with React, Vite and Motion.
        </p>
      </div>
    </section>
  );
}
