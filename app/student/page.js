'use client'

import Navbar from "../components/Navbar";
import StudentListPage from "./components/Student";
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