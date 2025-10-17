"use client";

import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import styles from "@/app/setup/setup.module.css";
import { useSetupContext } from "@/hooks/useSetupState";
import { SetupSteps } from "@/types/SetupSteps";

interface NavigationButtonProps {
  direction: "left" | "right";
}

export default function NavigationButton({ direction }: NavigationButtonProps) {
  const { state, setActive, isStepComplete } = useSetupContext();

  const canGoBack =
    state.active > SetupSteps.GameMode &&
    state.active !== SetupSteps.KillTarget;
  const canGoForward =
    state.active < SetupSteps.ReviewSelection && isStepComplete[state.active];

  const isVisible = direction === "left" ? canGoBack : canGoForward;

  const handleClick = () => {
    if (direction === "left" && canGoBack) {
      setActive(state.active - 1);
    } else if (direction === "right" && canGoForward) {
      setActive(state.active + 1);
    }
  };

  const Icon = direction === "left" ? IconChevronLeft : IconChevronRight;

  return (
    <Icon
      size={30}
      onClick={isVisible ? handleClick : undefined}
      className={`${styles.navIcon} ${
        isVisible ? styles.visible : styles.hidden
      }`}
      style={{
        cursor: isVisible ? "pointer" : "default",
        pointerEvents: isVisible ? "auto" : "none",
      }}
    />
  );
}
