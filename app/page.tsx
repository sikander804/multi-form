"use client";

import Sidebar from "@/components/Sidebar";
import MainSection from "@/components/MainSection";

export default function Home() {
  return (
    <main className="main-container">
      <div className="form-container">
        <Sidebar />
        <MainSection />
      </div>
    </main>
  );
}
