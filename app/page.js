'use client'

import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import About from "./components/About";
import BentoSection from "./components/BentoSection";
import Certificates from "./components/Cerificates";
import Gallery from "./components/Gallery";
import Contact from "./components/Contach";
import Footer from "./components/Footer";

export default function Home() {

  return (
    <>
      <Navbar />
      <div style={{ backgroundColor: "#00172E", minHeight: "100vh" }}>
        <Header />
      </div>
      <About />
      <BentoSection />
      <Gallery />
      <Certificates />
      <Footer />
    </>
  );
}