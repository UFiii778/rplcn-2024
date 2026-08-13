'use client'

import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/NavBas";
import Header from "./components/Header";
import About from "./components/About";
import Certificates from "./components/Cerificates";
import Work from "./components/Work";
import Gallery from "./components/Gallery";
import Contact from "./components/Contach";
import Footer from "./components/Footer";
import ScrollReveal from "./components/reactbits/ScrollReveal";

export default function Home() {

  return (
    <>
      <div style={{ backgroundColor: "#00172E", minHeight: "100vh" }}>
        <Header />
      </div>
      <Navbar />
      <About />
      <Gallery />
      <Certificates />
      <Footer />
    </>
  );
}