import { Suspense, lazy, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { Toaster } from "react-hot-toast";

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
const ParticlesContainer = lazy(() => import("@/components/ParticlesContainer"));

function App() {
  const location = useLocation();

  // Warm the other route chunks once the browser is idle so navigation stays instant.
  useEffect(() => {
    const preload = () => Object.values(pageImports).forEach((load) => load());
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(preload, { timeout: 3000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(preload, 2000);
    return () => clearTimeout(id);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="page bg-site text-white bg-cover bg-no-repeat relative font-sora">
        <Seo />
        <TopLeftImg />
        <Nav />
        <Header />

        {/* Global Background Animation for other pages */}
        {location.pathname !== "/" && (
          <div className="fixed inset-0 pointer-events-none z-0 mix-blend-screen">
            <Suspense fallback={null}>
              <ParticlesContainer />
            </Suspense>
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.main key={location.pathname} id="main-content">
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
          </motion.main>
        </AnimatePresence>

        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#393a47",
              color: "#fff",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            },
          }}
        />
      </div>
    </MotionConfig>
  );
}

export default App;
