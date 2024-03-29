import { useCallback, useContext, memo, useState } from "react";
import { Typography, Switch, Button } from "antd";
import Image from "next/image";

import { ISelectPlanType } from "./SelectPlan";
import styles from "./SelectPlan.module.css";
import { FormContext } from "@/context/form-context";
import Arcade from "../../public/icon-arcade.svg";
import Advanced from "../../public/icon-advanced.svg";
import Pro from "../../public/icon-pro.svg";

const { Title, Paragraph } = Typography;

const SELECT_PLAN_ITEMS: ISelectPlanType[] = [
  {
    icon: Arcade,
    title: "Arcade",
    price: "$9",
    id: "arcade",
  },
  {
    icon: Advanced,
    title: "Advanced",
    price: "$12",
    id: "advanced",
  },
  {
    icon: Pro,
    title: "Pro",
    price: "$15",
    id: "pro",
  },
];

const SelectPlan = () => {
  const [plan, setPlan] = useState("Monthly");
  const [selectedPlan, setSelectedPlan] = useState<string | undefined>(
    undefined
  );

  const { formState, updateFormState } = useContext(FormContext);

  const onChangePlan = useCallback(
    (checked: boolean) => {
      console.log(`switch to ${checked}`);
      if (!checked) {
        setPlan("Monthly");
      } else {
        setPlan("Yearly");
      }
    },
    [setPlan]
  );

  const selectPlan = useCallback(
    (planId: string) => () => {
      setSelectedPlan(planId);
    },
    [setSelectedPlan]
  );

  const _checkDisable = useCallback(() => {
    if (selectedPlan?.length) {
      return false;
    }
    return true;
  }, [selectedPlan]);

  const _handleProceed = useCallback(() => {
    updateFormState({ selectPlan: false, addOns: true });
  }, [updateFormState]);

  const _handleGoBack = useCallback(() => {
    updateFormState({ yourInfo: true, selectPlan: false });
  }, [updateFormState]);

  const rightSideSection = useCallback(() => {
    return (
      <>
        <div className={styles.mainSectionContainer}>
          <div className={styles.planContent}>
            <Title className={styles.title} level={2}>
              Select your plan
            </Title>
            <Paragraph className={styles.subtitle}>
              You have the option of monthly or yearly billing
            </Paragraph>
            <div className={styles.cards}>
              {SELECT_PLAN_ITEMS.map((item: ISelectPlanType) => {
                return (
                  <div
                    className={styles.itemCard}
                    style={{
                      backgroundColor:
                        selectedPlan === item.id ? "hsl(217, 100%, 97%)" : "",
                      borderColor:
                        selectedPlan === item.id
                          ? "hsl(228, 100%, 84%)"
                          : "hsl(229, 24%, 87%)",
                    }}
                    onClick={selectPlan(item.id)}
                  >
                    <div className={styles.icon}>
                      <Image
                        width={40}
                        height={40}
                        src={item.icon}
                        alt={item.title}
                      />
                    </div>
                    <div>
                      <Title className={styles.itemTitle} level={2}>
                        {item.title}
                      </Title>
                      <Paragraph className={styles.itemPrice}>
                        {`${item.price}/month`}
                      </Paragraph>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className={styles.plan}>
              <Paragraph
                className={styles.planMontly}
                style={{
                  color:
                    plan === "Monthly"
                      ? "hsl(213, 96%, 18%)"
                      : "hsl(231, 11%, 63%)",
                }}
              >
                Monthly
              </Paragraph>
              <Switch
                style={{
                  backgroundColor:
                    plan === "Monthly"
                      ? "hsl(213, 96%, 18%)"
                      : "hsl(231, 11%, 63%)",
                }}
                className={styles.planSwitch}
                onChange={onChangePlan}
              />
              <Paragraph
                style={{
                  color:
                    plan === "Yearly"
                      ? "hsl(213, 96%, 18%)"
                      : "hsl(231, 11%, 63%)",
                }}
                className={styles.planYearly}
              >
                Yearly
              </Paragraph>
            </div>
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <div className={styles.formButton}>
            <Button
              onClick={_handleGoBack}
              className={styles.cancelButton}
              type="link"
              size={"large"}
            >
              Go Back
            </Button>
            <Button
              disabled={_checkDisable()}
              onClick={_handleProceed}
              className={styles.button}
              size={"large"}
            >
              Next Step
            </Button>
          </div>
        </div>
      </>
    );
  }, [
    SELECT_PLAN_ITEMS,
    formState,
    onChangePlan,
    plan,
    selectPlan,
    selectedPlan,
  ]);

  return rightSideSection();
};

export default memo(SelectPlan);
