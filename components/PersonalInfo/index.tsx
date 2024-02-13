import { useCallback, useState, useContext, memo } from "react";
import { Typography, Input, Button } from "antd";

import styles from "./PersonalInfo.module.css";
import { IPersonalInfoFormType } from "./PersonalInfo";
import { FormContext } from "@/context/form-context";

const { Title, Paragraph } = Typography;

const PersonalInfo = () => {
  const [formData, setFormData] = useState<IPersonalInfoFormType>();
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>(
    {}
  );

  const { updateFormState } = useContext(FormContext);

  const handleSubmitForm = useCallback(
    (event: { preventDefault: () => void }) => {
      event.preventDefault();
      if (
        formData?.name?.length &&
        formData?.email?.length &&
        formData?.phone_number?.length
      ) {
        updateFormState({ yourInfo: false, selectPlan: true });
      }
    },
    [formData, updateFormState]
  );

  const handleBlur = useCallback(
    (fieldName: string) => {
      setTouchedFields((prevTouchedFields) => ({
        ...prevTouchedFields,
        [fieldName]: true,
      }));
    },
    [setTouchedFields]
  );

  const handleInputChange = useCallback(
    (fieldName: string, value: string) => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [fieldName]: value,
      }));
    },
    [setFormData]
  );

  const _checkDisable = useCallback(() => {
    if (
      formData?.name?.length &&
      formData?.email?.length &&
      formData?.phone_number?.length
    ) {
      return false;
    } else {
      return true;
    }
  }, [formData]);

  return (
    <div className={styles.mainSectionContainer}>
      <Title className={styles.title} level={2}>
        Personal Info
      </Title>
      <Paragraph className={styles.subtitle}>
        Please provide your name, email address, and phone number.
      </Paragraph>

      {/* FORM */}
      <div className={styles.form}>
        <form onSubmit={handleSubmitForm}>
          <div className={styles.titleContainer}>
            <Title className={styles.title} level={5}>
              Name
            </Title>
            {touchedFields.name && !formData?.name?.length && (
              <Title className={styles.error} level={5}>
                This field is required
              </Title>
            )}
          </div>
          <Input
            size="large"
            status={
              touchedFields.name && !formData?.name?.length ? "error" : ""
            }
            onBlur={() => handleBlur("name")}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className={styles.formInput}
            name="name"
            type="text"
            placeholder="e.g. Vaneessa Mint"
          />
          <div className={styles.titleContainer}>
            <Title className={styles.title} level={5}>
              Email Address
            </Title>
            {touchedFields.email && !formData?.email?.length && (
              <Title className={styles.error} level={5}>
                This field is required
              </Title>
            )}
          </div>
          <Input
            size="large"
            status={
              touchedFields.email && !formData?.email?.length ? "error" : ""
            }
            onBlur={() => handleBlur("email")}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className={styles.formInput}
            name="email"
            type="email"
            placeholder="e.g. venessamint@gmail.com"
          />
          <div className={styles.titleContainer}>
            <Title className={styles.title} level={5}>
              Phone Number
            </Title>
            {touchedFields.phone_number && !formData?.phone_number?.length && (
              <Title className={styles.error} level={5}>
                This field is required
              </Title>
            )}
          </div>
          <Input
            size="large"
            status={
              touchedFields.phone_number && !formData?.phone_number?.length
                ? "error"
                : ""
            }
            onBlur={() => handleBlur("phone_number")}
            onChange={(e) => handleInputChange("phone_number", e.target.value)}
            className={styles.formInput}
            name="phone_number"
            type="text"
            placeholder="e.g. +1 234 567 890"
          />
          <div className={styles.formButton}>
            <Button
              disabled={_checkDisable()}
              htmlType="submit"
              className={styles.button}
              size={"large"}
            >
              Next Step
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default memo(PersonalInfo);
