"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CardNav from './reactbits/CardNav';
import logo from '@/public/icon-dark.png';

const Navbar = () => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const checkModalState = () => {
            setIsVisible(!document.body.classList.contains("modal-open"));
        };

        checkModalState();

        const observer = new MutationObserver(checkModalState);
        observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

        return () => observer.disconnect();
    }, []);

    const items = [
        {
            label: "Main",
            bgColor: "#111827",
            textColor: "#ffffff",
            links: [
                { label: "Home", ariaLabel: "Home Page", href: "/" }
            ]
        },
        {
            label: "Messages",
            bgColor: "#1F2937",
            textColor: "#ffffff",
            links: [
                { label: "Send Message", ariaLabel: "Send Message", href: "/message" }
            ]
        },
        {
            label: "Classroom",
            bgColor: "#0F172A",
            textColor: "#ffffff",
            links: [
                { label: "All Students", ariaLabel: "All Students", href: "/student" },
            ]
        }
    ];

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.header
                    initial={{ y: -80, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -80, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="fixed top-0 left-0 w-full z-[9999] pointer-events-none"
                >
                    <div className="pointer-events-auto w-full flex justify-center px-4">
                        <CardNav
                            logo={logo.src || logo}
                            logoAlt="Classroom Logo"
                            items={items}
                            baseColor="rgba(17, 24, 39, 0.65)"
                            menuColor="#ffffff"
                            buttonBgColor="#2E2E2E"
                            buttonTextColor="#ffffff"
                            ease="power3.out"
                        />
                    </div>
                </motion.header>
            )}
        </AnimatePresence>
    );
};

export default Navbar;