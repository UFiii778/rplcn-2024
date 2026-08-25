'use client'

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import About from "./components/About";
import BentoSection from "./components/BentoSection";
import Gallery from "./components/Gallery";
import Next from "./components/Next";
import Certificates from "./components/Cerificates";
import Contact from "./components/Contach";
import Footer from "./components/Footer";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Navbar />
          <div style={{ backgroundColor: "#00172E", minHeight: "100vh" }}>
            <Header />
          </div>
          <BentoSection />
          <About />
          <Gallery />
          <Next />
          <Certificates />
          <Footer />
        </motion.div>
      )}
    </>
  );
}