import Navbar from "../components/Navbar";
import StudentListPage from "./components/Student";
import Footer from "../components/Footer";

import { getStudents } from "@/lib/students";

export default async function Home() {
  const students = await getStudents();

  return (
    <>
      <Navbar />

      <StudentListPage
        students={students}
      />

      <Footer />
    </>
  );
}