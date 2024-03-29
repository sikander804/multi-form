import { useCallback, useContext, memo } from "react";
import { Typography } from "antd";

import { ISidebarType } from "./Sidebar";
import styles from "./Sidebar.module.css";
import { FormContext } from "@/context/form-context";

const { Title, Paragraph } = Typography;

const SIDE_BAR_CONTENT: ISidebarType[] = [
  {
    id: "step-1",
    name: "Your Info",
    key: "yourInfo",
  },
  {
    id: "step-2",
    name: "Select Plan",
    key: "selectPlan",
  },
  {
    id: "step-3",
    name: "Add-ons",
    key: "addOns",
  },
  {
    id: "step-4",
    name: "Summary",
    key: "summary",
  },
];

const Sidebar = () => {
  const { formState } = useContext(FormContext);

  const leftSideSection = useCallback(() => {
    return (
      <div className={styles.sidebarContent}>
        {SIDE_BAR_CONTENT?.map((item: ISidebarType, i: number) => {
          return (
            <div className={styles.menuLink} key={item.id}>
              <div className={styles.menuLinkContent}>
                <div
                  style={{
                    backgroundColor: formState[item.key]
                      ? "hsl(206, 94%, 87%)"
                      : "",
                    color: formState[item.key] ? "hsl(213, 96%, 18%)" : "",
                  }}
                  className={styles.stepCount}
                >
                  {i + 1}
                </div>
                <div className={styles.sidebarTextContent}>
                  <Paragraph className={styles.subtitle}>{`STEP ${
                    i + 1
                  }`}</Paragraph>
                  <Title className={styles.title} level={5}>
                    {item.name.toUpperCase()}
                  </Title>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }, [SIDE_BAR_CONTENT, formState]);

  return leftSideSection();
};

export default memo(Sidebar);
