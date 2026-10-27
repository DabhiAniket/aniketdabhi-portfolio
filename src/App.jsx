import { Suspense, lazy, useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, LazyMotion, MotionConfig, m } from "framer-motion";

import Header from "@/components/Header";
import Nav from "@/components/Nav";
import Seo from "@/components/Seo";
import TopLeftImg from "@/components/TopLeftImg";
import Transition from "@/components/Transition";

// Route-level code splitting keeps the first load small.
const pageImports = {
  home: () => import("@/pages/page"),
  about: () => import("@/pages/about/page"),
  services: () => import("@/pages/services/page"),
  work: () => import("@/pages/work/page"),
  testimonials: () => import("@/pages/testimonials/page"),
  contact: () => import("@/pages/contact/page"),
};

const Home = lazy(pageImports.home);
const About = lazy(pageImports.about);
const Services = lazy(pageImports.services);
const Work = lazy(pageImports.work);
const Testimonials = lazy(pageImports.testimonials);
const Contact = lazy(pageImports.contact);
// Animation features (variants, exit, gestures, in-view) load as their own chunk, in
// parallel with the page, instead of sitting in the main bundle. `m` components render
// their initial state until it arrives. No layout/drag animations are used.
const loadMotionFeatures = () => import("@/lib/motionFeatures").then((mod) => mod.default);
const ParticlesContainer = lazy(() => import("@/components/ParticlesContainer"));
const FluidLines = lazy(() => import("@/components/FluidLines"));

function App() {
  const location = useLocation();

  // After the page has loaded, use idle time to start the decorative canvases and then
  // warm the other route chunks (navigation stays instant), one step per idle slot so
  // none of it competes with the first paint or the first interaction.
  const [ambient, setAmbient] = useState(false);
  useEffect(() => {
    const idle = window.requestIdleCallback ?? ((cb) => setTimeout(cb, 200));
    const cancelIdle = window.cancelIdleCallback ?? clearTimeout;
    const queue = [() => setAmbient(true), ...Object.values(pageImports)];
    let id;
    const next = () => {
      id = idle(
        () => {
          queue.shift()();
          if (queue.length) next();
        },
        { timeout: 4000 },
      );
    };
    if (document.readyState === "complete") next();
    else window.addEventListener("load", next, { once: true });
    return () => {
      window.removeEventListener("load", next);
      cancelIdle(id);
    };
  }, []);

  return (
    <LazyMotion features={loadMotionFeatures} strict>
    <MotionConfig reducedMotion="user">
      <div className="page bg-site text-white bg-cover bg-no-repeat relative font-sora">
        <Seo />
        <TopLeftImg />
        <Nav />
        <Header />

        {/* Interactive node background: mounted once for every route so it never restarts on navigation.
            z-[1] keeps it above page backgrounds but below content (z-10); it never takes pointer events. */}
        {ambient && (
          <div className="fixed inset-0 pointer-events-none z-1 mix-blend-screen" aria-hidden>
            <Suspense fallback={null}>
              <ParticlesContainer />
            </Suspense>
          </div>
        )}
        {/* Glowing accent-red trails that follow the mouse/finger; its own layer above the nodes, still below content. */}
        {ambient && (
          <div className="fixed inset-0 pointer-events-none z-1 mix-blend-screen" aria-hidden>
            <Suspense fallback={null}>
              <FluidLines />
            </Suspense>
          </div>
        )}

        <AnimatePresence mode="wait">
          <m.main key={location.pathname} id="main-content">
            <Transition />
            <Suspense fallback={<div className="min-h-screen" />}>
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/work" element={<Work />} />
                <Route path="/testimonials" element={<Testimonials />} />
                <Route path="/contact" element={<Contact />} />
                {/* Unknown URLs: the host returns 404.html (noindex); send visitors home */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </m.main>
        </AnimatePresence>
      </div>
    </MotionConfig>
    </LazyMotion>
  );
}

export default App;
