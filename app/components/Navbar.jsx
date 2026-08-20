"use client";

import React from 'react';
import CardNav from './reactbits/CardNav';
import logo from '@/public/icon-dark.png';

const Navbar = () => {
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
        <header className="fixed top-0 left-0 w-full z-[9999] pointer-events-none">
            <div className="pointer-events-auto w-full flex justify-center px-4">
                <CardNav
                    logo={logo.src || logo}
                    logoAlt="Classroom Logo"
                    items={items}
                    baseColor="rgba(17, 24, 39, 0.65)"
                    menuColor="#ffffff"
                    buttonBgColor="#38bdf8"
                    buttonTextColor="#0f172a"
                    ease="power3.out"
                />
            </div>
        </header>
    );
};

export default Navbar;