import { useCallback, useContext, memo, useState } from "react";
import { Typography, Button, Checkbox, CheckboxProps } from "antd";

import { IAddOneType } from "./AddOnes";
import styles from "./AddOnes.module.css";
import { FormContext } from "@/context/form-context";
const { Title, Paragraph } = Typography;

const ADD_ONES_ITEMS: IAddOneType[] = [
  {
    title: "Online services",
    subtitle: "Access to multiplayer games",
    price: "$1",
    id: "online-services",
  },
  {
    title: "Larger storage",
    subtitle: "Extra 1TB of cloud save",
    price: "$2",
    id: "larger-storage",
  },
  {
    title: "Customizable profile",
    subtitle: "Customize theme on your profile",
    price: "$2",
    id: "customizable-profile",
  },
];

const AddOnes = () => {
  const [plan, setPlan] = useState("Monthly");
  const [selectedPlan, setSelectedPlan] = useState<string | undefined>(
    undefined
  );
  const [checkedCheckboxes, setCheckedCheckboxes] = useState<string[]>([]);

  const { formState, updateFormState } = useContext(FormContext);

  const _checkDisable = useCallback(() => {
    if (selectedPlan?.length) {
      return false;
    }
    return true;
  }, [selectedPlan]);

  const _handleProceed = useCallback(() => {
    updateFormState({ selectPlan: false, addOnes: true });
  }, [updateFormState]);

  const _handleGoBack = useCallback(() => {
    updateFormState({ yourInfo: true, selectPlan: false });
  }, [updateFormState]);

  const _onChangeCheckbox = useCallback(
    (fieldId: string) => () => {
      console.log("checked = id ^^", fieldId);

      if (checkedCheckboxes.includes(fieldId)) {
        const filtered = checkedCheckboxes.filter((id) => {
          return id !== fieldId;
        });
        setCheckedCheckboxes(filtered);
      } else {
        setCheckedCheckboxes([...checkedCheckboxes, fieldId]);
      }
    },
    [setCheckedCheckboxes, checkedCheckboxes]
  );

  const rightSideSection = useCallback(() => {
    return (
      <>
        <div className={styles.mainSectionContainer}>
          <div className={styles.planContent}>
            <Title className={styles.title} level={2}>
              Pick add-ones
            </Title>
            <Paragraph className={styles.subtitle}>
              Add-ones help enhance your gaming experience
            </Paragraph>
            {ADD_ONES_ITEMS.map((item: IAddOneType) => {
              const { id, title, price } = item;
              const isChecked = checkedCheckboxes.includes(id);
              //   console.log("isChecked", isChecked);
              return (
                <div
                  onClick={_onChangeCheckbox(id)}
                  className={styles.itemCard}
                  style={{
                    backgroundColor: checkedCheckboxes.includes(id)
                      ? "hsl(217, 100%, 97%)"
                      : "",
                    borderColor: checkedCheckboxes.includes(id)
                      ? "hsl(228, 100%, 84%)"
                      : "hsl(229, 24%, 87%)",
                  }}
                >
                  <div className={styles.icon}>
                    <Checkbox
                      checked={isChecked}
                      onChange={_onChangeCheckbox(id)}
                    />
                  </div>
                  <div>
                    <Title className={styles.itemTitle} level={2}>
                      {title}
                    </Title>
                    <Paragraph className={styles.itemPrice}>
                      {`+${price}/month`}
                    </Paragraph>
                  </div>
                </div>
              );
            })}
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
    ADD_ONES_ITEMS,
    formState,
    plan,
    _onChangeCheckbox,
    selectedPlan,
    checkedCheckboxes,
  ]);

  return rightSideSection();
};

export default memo(AddOnes);
