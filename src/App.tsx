import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, MotionConfig } from "motion/react";
import Home from "./pages/Home";
import Resume from "./pages/Resume";
import Page from "./components/Page";
import Dock from "./components/Dock";
import ScrollProgress from "./components/ScrollProgress";

function ScrollManager() {
  const { pathname } = useLocation();
  useEffect(() => {
    // Wait for the exit curtain before jumping to the top of the new page.
    const id = window.setTimeout(() => {
      if (!window.location.hash) window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, 560);
    return () => window.clearTimeout(id);
  }, [pathname]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={true}>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <Page>
              <Home />
            </Page>
          }
        />
        <Route
          path="/resume"
          element={
            <Page>
              <Resume />
            </Page>
          }
        />
        <Route
          path="*"
          element={
            <Page>
              <Home />
            </Page>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        {/* page rails, like the guides in a design tool */}
        <div aria-hidden className="pointer-events-none fixed inset-0 z-[1] hidden md:block">
          <div className="mx-auto h-full max-w-[1180px] border-x border-line" />
        </div>
        <ScrollManager />
        <ScrollProgress />
        <Dock />
        <AnimatedRoutes />
      </BrowserRouter>
    </MotionConfig>
  );
}
