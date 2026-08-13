"use client";

import { assets } from "@/assets/assets";
import Image from "next/image";
import React from "react";
import ScrollExpand from "./reactbits/ScrollExpand";

const Header = () => {
    return (
        <div>
            <ScrollExpand
                src={assets.Rpls.src || assets.Rpls}
                alt="Product hero"
                title="RPLG 2024 - 2027"
                scrollHint="Scroll inside the frame"
                useWindowScroll
            >
                <h2 className="text-white">Every pixel, everywhere</h2>
                <h4 className="text-white">The frame opens up as you scroll and hands the whole stage to your media.</h4>
            </ScrollExpand>
        </div>
    );
};

export default Header;