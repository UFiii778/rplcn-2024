"use client";

import React, { useState } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import CardNav from './reactbits/CardNav';
import logo from '@/public/icon-dark.png';

const Navbar = () => {
    const [hidden, setHidden] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        
        if (latest > previous && latest > 50) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });

    const items = [
        {
            label: "About",
            bgColor: "#1B1722",
            textColor: "#fff",
            links: [
                { label: "Company", ariaLabel: "About Company", href: "#about" },
                { label: "Careers", ariaLabel: "About Careers", href: "#careers" }
            ]
        },
        {
            label: "Projects",
            bgColor: "#155573",
            textColor: "#fff",
            links: [
                { label: "Featured", ariaLabel: "Featured Projects", href: "#work" },
                { label: "Case Studies", ariaLabel: "Project Case Studies", href: "#gallery" }
            ]
        },
        {
            label: "Contact",
            bgColor: "#2F293A",
            textColor: "#fff",
            links: [
                { label: "Email", ariaLabel: "Email us", href: "#contact" },
                { label: "Twitter", ariaLabel: "Twitter", href: "https://twitter.com" },
                { label: "LinkedIn", ariaLabel: "LinkedIn", href: "https://linkedin.com" }
            ]
        }
    ];

    return (
        <header 
            className={`fixed top-0 left-0 w-full z-[9999] pointer-events-none transition-transform duration-300 ease-in-out ${
                hidden ? "-translate-y-full" : "translate-y-0"
            }`}
        >
            <div className="pointer-events-auto w-full flex justify-center px-4">
                <CardNav
                    logo={logo.src || logo}
                    logoAlt="Company Logo"
                    items={items}
                    baseColor="#ffffff"
                    menuColor="#000000"
                    buttonBgColor="#111111"
                    buttonTextColor="#ffffff"
                    ease="power3.out"
                    theme="light"
                />
            </div>
        </header>
    );
};

export default Navbar;