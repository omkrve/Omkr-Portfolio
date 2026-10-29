import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, Download } from "lucide-react";
import { profile } from "../data";

type State = "checking" | "ready" | "missing";

export default function Resume() {
  const [state, setState] = useState<State>("checking");

  useEffect(() => {
    let cancelled = false;
    fetch(profile.resumeFile, { method: "HEAD" })
      .then((r) => {
        const type = r.headers.get("content-type") ?? "";
        if (!cancelled) setState(r.ok && !type.includes("text/html") ? "ready" : "missing");
      })
      .catch(() => !cancelled && setState("missing"));
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="relative z-10 flex min-h-svh flex-col">
      <header className="shell relative flex w-full items-center justify-between gap-3 pt-5 pb-4 md:pt-8">
        <Link
          to="/"
          className="group inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 py-2.5 pr-5 pl-3.5 text-[15px] text-ink-2 backdrop-blur transition-colors hover:text-ink"
        >
          <ArrowLeft size={17} className="transition-transform group-hover:-translate-x-0.5" />
          Back
        </Link>
        <h1 className="display absolute left-1/2 hidden -translate-x-1/2 text-xl sm:block">Resume</h1>
        <a
          href={profile.resumeFile}
          download={profile.resumeDownloadName}
          className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-transform active:scale-[0.97]"
        >
          <Download size={16} />
          Download resume
        </a>
      </header>

      <main className="shell flex w-full flex-1 flex-col pb-28 md:pb-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
          className="flex-1 overflow-hidden rounded-[22px] border border-line bg-surface shadow-[0_30px_80px_-30px_rgba(0,0,0,.6)] md:rounded-[28px]"
        >
          {state === "ready" && (
            <object
              data={`${profile.resumeFile}#view=FitH`}
              type="application/pdf"
              aria-label="Resume PDF"
              className="h-[calc(100svh-15rem)] w-full md:h-[calc(100svh-11rem)]"
            >
              <div className="grid h-full place-items-center p-8 text-center">
                <div>
                  <p className="text-lg font-medium">This browser can't show the PDF here.</p>
                  <a href={profile.resumeFile} className="mt-3 inline-block text-accent-ink underline">
                    Open it in a new tab
                  </a>
                </div>
              </div>
            </object>
          )}

          {state === "missing" && (
            <div className="grid h-[60svh] place-items-center p-8 text-center">
              <div className="max-w-[40ch]">
                <p className="display text-3xl">Resume not uploaded yet</p>
                <p className="mt-3 text-ink-2">
                  Save your PDF as <code className="font-mono text-ink">public/resume.pdf</code> and reload this page.
                </p>
              </div>
            </div>
          )}
        </motion.div>

        {state === "ready" && (
          <p className="mt-3 px-1 text-center text-sm text-ink-3 md:hidden">
            Preview not loading?{" "}
            <a href={profile.resumeFile} target="_blank" rel="noreferrer noopener" className="text-accent-ink underline">
              Open the PDF directly
            </a>
            .
          </p>
        )}
      </main>
    </div>
  );
}
