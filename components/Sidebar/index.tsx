import { useCallback, useContext } from "react";
import { Typography, Layout, Grid } from "antd";

import { ISidebarType } from "./Sidebar";
import styles from "./Sidebar.module.css";
import { FormContext } from "@/context/form-context";

const { Title, Paragraph } = Typography;
const { useBreakpoint } = Grid;

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
  const { sm, md, lg } = useBreakpoint();

  console.log("md", md);
  console.log("sm", sm);

  const desktopScreen = useCallback(() => {
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
                <div>
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
  }, [SIDE_BAR_CONTENT]);

  return lg ? (
    desktopScreen()
  ) : (
    <div>
      <h1>Its is a mobile screen</h1>
    </div>
  );
};

export default Sidebar;
