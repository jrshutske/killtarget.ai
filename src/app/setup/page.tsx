"use client";

import { useEffect } from "react";
import StepperComponent from "../../components/StepperComponent";
import ClassSelection from "./classSelection";
import GameModeSelection from "./gameModeSelection";
import { AppShell, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import styles from "./main.module.css";
import { SetupSteps } from "@/types/SetupSteps";
import ReviewSelection from "./reviewSelection";
import { ThemeToggle } from "@/components/ThemeToggle";
import KillTarget from "./killTarget";
import { SetupContext, useSetupState } from "@/hooks/useSetupState";
import SubmitButton from "@/components/SubmitButton";
import Link from "next/link";

// Step titles mapping
const STEP_TITLES: Record<SetupSteps, string> = {
  [SetupSteps.GameMode]: "Game Mode",
  [SetupSteps.ClassSelection]: "You",
  [SetupSteps.TeammateSelection]: "Teammates",
  [SetupSteps.OpponentSelection]: "Opponents",
  [SetupSteps.ReviewSelection]: "Review",
  [SetupSteps.KillTarget]: "Kill Target",
};

// Component mapping for each step
const STEP_COMPONENTS: Record<SetupSteps, React.ComponentType> = {
  [SetupSteps.GameMode]: GameModeSelection,
  [SetupSteps.ClassSelection]: ClassSelection,
  [SetupSteps.TeammateSelection]: ClassSelection,
  [SetupSteps.OpponentSelection]: ClassSelection,
  [SetupSteps.ReviewSelection]: ReviewSelection,
  [SetupSteps.KillTarget]: KillTarget,
};

export default function Page() {
  const [opened, { toggle }] = useDisclosure();
  const setupState = useSetupState();
  const { state } = setupState;
  // Disable right-click context menu
  useEffect(() => {
    const handleContextMenu = (e: Event) => e.preventDefault();
    document.addEventListener("contextmenu", handleContextMenu);
    return () => document.removeEventListener("contextmenu", handleContextMenu);
  }, []);

  // Get current step title and component
  const currentTitle = STEP_TITLES[state.active];
  const CurrentComponent = STEP_COMPONENTS[state.active];

  return (
    <SetupContext.Provider value={setupState}>
      <AppShell
        padding="md"
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
      >
        <AppShell.Header className={styles.header}>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="xl" />
          <span className={styles.logoDesktop}>
            <Link href="/">killtarget.ai</Link>
          </span>
          <span className={styles.sectionHeader}>{currentTitle}</span>
        </AppShell.Header>

        <AppShell.Navbar className={styles.navbar}>
          <StepperComponent />
          <ThemeToggle />
        </AppShell.Navbar>

        <AppShell.Main className={styles.mainContent}>
          <div className={styles.scrollableArea}>
            <CurrentComponent />
          </div>
          <SubmitButton step={state.active} />
        </AppShell.Main>
      </AppShell>
    </SetupContext.Provider>
  );
}
