"use client";

import { useContext } from "react";

import Sidebar from "@/components/Sidebar";
import PersonalInfo from "@/components/PersonalInfo";
import SelectPlan from "@/components/SelectPlan";
import AddOnes from "@/components/AddOnes";

import { FormContext } from "@/context/form-context";

export default function Home() {
  const { formState } = useContext(FormContext);
  console.log("formstae", formState);
  return (
    <main className="main-container">
      <div className="form-container">
        <Sidebar />
        <div className="container">
          <div className="right-side-container">
            {formState.yourInfo && <PersonalInfo />}
            {formState.selectPlan && <SelectPlan />}
            {formState.addOnes && <AddOnes />}
          </div>
        </div>
      </div>
    </main>
  );
}
