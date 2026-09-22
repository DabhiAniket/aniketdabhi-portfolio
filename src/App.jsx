import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "react-hot-toast";

import Header from "@/components/Header";
import Nav from "@/components/Nav";
import TopLeftImg from "@/components/TopLeftImg";
import Transition from "@/components/Transition";
import ParticlesContainer from "@/components/ParticlesContainer";

import Home from "@/pages/page";
import About from "@/pages/about/page";
import Services from "@/pages/services/page";
import Work from "@/pages/work/page";
import Testimonials from "@/pages/testimonials/page";
import Contact from "@/pages/contact/page";

function App() {
  const location = useLocation();

  return (
    <div className="page bg-site text-white bg-cover bg-no-repeat relative font-sora">
      <TopLeftImg />
      <Nav />
      <Header />

      {/* Global Background Animation for other pages */}
      {location.pathname !== "/" && (
        <div className="fixed inset-0 pointer-events-none z-0 mix-blend-screen">
          <ParticlesContainer />
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div key={location.pathname}>
          <Transition />
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/work" element={<Work />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </motion.div>
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
  );
}

export default App;
