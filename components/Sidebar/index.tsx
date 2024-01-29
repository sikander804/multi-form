import { Typography } from "antd";

import { ISidebarType } from "./Sidebar";
import styles from "./Sidebar.module.css";

const { Title, Paragraph } = Typography;

const SIDE_BAR_CONTENT: ISidebarType[] = [
  {
    id: "step-1",
    name: "Your Info",
  },
  {
    id: "step-2",
    name: "Select Plan",
  },
  {
    id: "step-3",
    name: "Add-ons",
  },
  {
    id: "step-4",
    name: "Summary",
  },
];

const Sidebar = () => {
  return (
    <div className={styles.sidebarContent}>
      {SIDE_BAR_CONTENT?.map((item: ISidebarType, i: number) => {
        return (
          <div className={styles.menuLink} key={item.id}>
            <div className={styles.menuLinkContent}>
              <div className={styles.stepCount}>{i + 1}</div>
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
};

export default Sidebar;
