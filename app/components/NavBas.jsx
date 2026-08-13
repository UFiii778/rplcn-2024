"use client";

import { assets } from '@/assets/assets';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PillNav from './reactbits/PillNav';
import logo from '@/public/icon-dark.png';
import CardNav from './reactbits/CardNav';
import { label } from 'framer-motion/client';

const Navbar = () => {
    const items = [
        {
            label: "About",
            bgColor: "#1B1722",
            textColor: "#fff",
            links: [
                { label: "Company", ariaLabel: "About Company" },
                { label: "Careers", ariaLabel: "About Careers" }
            ]
        },
        {
            label: "Projects",
            bgColor: "#2F293A",
            textColor: "#fff",
            links: [
                { label: "Featured", ariaLabel: "Featured Projects" },
                { label: "Case Studies", ariaLabel: "Project Case Studies" }
            ]
        },
        {
            label: "Contact",
            bgColor: "#2F293A",
            textColor: "#fff",
            links: [
                { label: "Email", ariaLabel: "Email us" },
                { label: "Twitter", ariaLabel: "Twitter" },
                { label: "LinkedIn", ariaLabel: "LinkedIn" }
            ]
        }
    ];

    return (
        <nav className={`w-full fixed px-5 lg:px-8 xl:px-[-8%] py-4 flex items-center justify-between z-50 transition-all duration-300`}>

            <CardNav
                logo={logo.src}
                logoAlt="Company Logo"
                items={items}
                baseColor="#fff"
                menuColor="#000"
                buttonBgColor="#111"
                buttonTextColor="#fff"
                ease="power3.out"
                theme="light"
            />
        </nav>
    );
};

export default Navbar;