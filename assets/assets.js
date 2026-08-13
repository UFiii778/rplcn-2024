import { FaCode, FaGraduationCap, FaProjectDiagram } from "react-icons/fa";

import profile from './profile.jpeg';
import cert_revou from './revou.webp';
import cert_react from './react.webp';
import cert_full from './full-stack.webp';
import thumbnailD from './darahkita.webp';
import thumbnailS from './sowanqr.webp';
import mainMe from './main-me.webp';
import Rider from './ride.webp';
import meOnyellow from './me-yellow.webp';
import Neo from './neo.webp';
import CameraMan from './cameramen.webp';
import Gemera from './gemera.webp';
import MineCraft from './wanna-play.webp';
import Where from './where.webp';
import Me45 from './me45.webp';
import Rpls from './rpls.jpeg';

export const assets = {
    CameraMan,
    Gemera,
    MineCraft,
    Where,
    profile,
    cert_revou,
    cert_react,
    cert_full,
    thumbnailD,
    thumbnailS,
    mainMe,
    Rider,
    meOnyellow,
    Neo,
    Me45,
    Rpls
};


export const infoList = [
    { 
        icon: FaCode, // Cukup tulis seperti ini, tidak perlu iconDark lagi karena bisa diwarnai lewat Tailwind
        title: 'My Fav Tech', 
        description: 'JavaScript, React Js, Next Js, Typescript, php, Laravel' 
    },
    { 
        icon: FaGraduationCap, 
        title: 'Education', 
        description: 'Software Engineering, Machine Learning & Devops' 
    },
    { 
        icon: FaProjectDiagram, 
        title: 'Projects', 
        description: 'Built more than 5 projects' 
    }
];

