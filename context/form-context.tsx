"use client";

import React, { createContext, useState } from "react";

const FormContext = createContext<any>({} as any);
const { Provider } = FormContext;

type IChildrenProps = React.ReactNode;

const FormProvider = ({ children }: { children: IChildrenProps }) => {
  const [formState, setFormState] = useState({
    yourInfo: true,
    selectPlan: false,
    addOns: false,
    summary: false,
  });

  const resetState = () => {
    setFormState({
      yourInfo: true,
      selectPlan: false,
      addOns: false,
      summary: false,
    });
  };

  const updateFormState = (updatedValues: { [key: string]: boolean }) => {
    setFormState((prevFormVal) => ({
      ...prevFormVal,
      ...updatedValues,
    }));
  };

  return (
    <Provider
      value={{
        updateFormState,
        resetState,
        formState,
      }}
    >
      {children}
    </Provider>
  );
};

export { FormContext, FormProvider };
