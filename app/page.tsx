"use client";

import { useContext } from "react";

import Sidebar from "@/components/Sidebar";
import PersonalInfo from "@/components/PersonalInfo";
import { FormContext } from "@/context/form-context";

export default function Home() {
  const { formState } = useContext(FormContext);
  return (
    <main className="main-container">
      <div className="form-container">
        <Sidebar />
        {formState.yourInfo && <PersonalInfo />}
        {formState.selectPlan && <PersonalInfo />}
      </div>
    </main>
  );
}
