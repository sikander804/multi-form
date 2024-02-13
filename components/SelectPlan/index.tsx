import { useCallback, useContext, memo } from "react";
import { Typography } from "antd";
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
  //   {
  //     icon: "/icon-advanced.svg",
  //     title: Advanced,
  //     price: "$12",
  //     id: "advanced",
  //   },
  //   {
  //     icon: Pro,
  //     title: "/icon-pro.svg",
  //     price: "$15",
  //     id: "pro",
  //   },
];

const SelectPlan = () => {
  const { formState } = useContext(FormContext);

  const rightSideSection = useCallback(() => {
    return (
      <div className={styles.mainSectionContainer}>
        <Title className={styles.title} level={2}>
          Select your plan
        </Title>
        <Paragraph className={styles.subtitle}>
          You have the option of monthly or yearly billing
        </Paragraph>

        {SELECT_PLAN_ITEMS.map((item: ISelectPlanType) => {
          return (
            <div className={styles.itemCard}>
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
    );
  }, [SELECT_PLAN_ITEMS, formState]);

  return rightSideSection();
};

export default memo(SelectPlan);
