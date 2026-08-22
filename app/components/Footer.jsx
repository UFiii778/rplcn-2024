"use client";

import React from "react";
import Image from "next/image";
import { CgInstagram } from "react-icons/cg";
import { FaDiscord, FaSpotify, FaTiktok } from "react-icons/fa";

const Footer = () => {

  const socials = [
    {
      name: "Instagram",
      href: "https://www.instagram.com/???igsh=Nm4xdnE1dmg4aHZy",
      icon: <CgInstagram className="w-5 h-5" />, 
    },
     {
      name: "Discord",
      href: "https://discord.com/users/898745354697195611",
      icon: <FaDiscord className="w-5 h-5" />,
    }
  ];

  return (
    <footer className="w-full bg-[#030014] text-gray-300 border-t border-gray-900 py-12 px-[5%] sm:px-[10%] flex flex-col items-center">
      <div className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-between gap-8 pb-8 border-b border-gray-900">

        <div className="flex items-center gap-4">
          {socials.map((social, index) => (
            <a
              key={index} 
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center text-gray-400 hover:text-sky-400 hover:border-sky-500/50 hover:bg-sky-950/30 transition-all duration-300 shadow-sm"
            >
              {social.icon}
            </a>
          ))}
        </div>

      </div>

      <div className="w-full max-w-5xl pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
        <p>© {new Date().getFullYear()} RPLCN 2024-2027 . All rights reserved.</p>
        <p className="font-light">
          Designed with ❤️   based in <span className="font-medium text-gray-400">Bandung</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;