'use client'

import Navbar from "../components/Navbar";
import StudentListPage from "./Components/Student";
import Footer from "../components/Footer";

export default function Home() {

    return (
        <>
            <Navbar />
            <StudentListPage />
            <Footer />
        </>
    );
}