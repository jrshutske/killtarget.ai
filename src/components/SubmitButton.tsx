"use client";

import { useSetupContext } from "@/hooks/useSetupState";
import { Button } from "@mantine/core";
import { useEffect, useState } from "react";
import styles from "./SubmitButton.module.css";
import { SetupSteps } from "@/types/SetupSteps";

interface SubmitButtonProps {
  step: SetupSteps;
}
export default function SubmitButton({ step }: SubmitButtonProps) {
  const { state, isStepComplete, setActive, submitSetup } = useSetupContext();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isStepComplete[state.active]) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [isStepComplete, state.active]);

  function handleSubmit() {
    if (step === SetupSteps.ReviewSelection) {
      submitSetup();
    } else {
      setActive(state.active + 1);
    }
  }
  let label: string;

  if (state.submitting) {
    label = "Processing...";
  } else if (step === SetupSteps.ReviewSelection) {
    label = "Submit";
  } else {
    label = "Next";
  }
  return (
    <div
      className={`${styles.container} ${
        isVisible ? styles.containerVisible : styles.containerHidden
      }`}
    >
      <Button
        onClick={handleSubmit}
        loading={state.submitting}
        disabled={!isStepComplete[state.active]}
        size="xl"
        fullWidth
        className={styles.button}
      >
        {state.submitting ? "Processing..." : label}
      </Button>
    </div>
  );
}
