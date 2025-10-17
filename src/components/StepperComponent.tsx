"use client";

import { Stepper, Image } from "@mantine/core";
import { getSpecIcon } from "@/utils/imageUtils";
import { useSetupContext } from "@/hooks/useSetupState";
import { SetupSteps } from "@/types/SetupSteps";
import {
  IconCrosshair,
  IconThumbDown,
  IconThumbUp,
  IconZoom,
} from "@tabler/icons-react";

export default function StepperComponent() {
  const { state, isStepComplete, setActive } = useSetupContext();

  function onStepClick(step: number) {
    if (
      (!isStepComplete[state.active] && step >= state.active) ||
      step == SetupSteps.KillTarget
    ) {
      return;
    }
    setActive(step);
  }

  return (
    <Stepper
      active={state.active}
      onStepClick={onStepClick}
      orientation="vertical"
    >
      <Stepper.Step
        label="Game Mode"
        description="Choose Arena Game Mode"
        color="blue"
        completedIcon={state.gameMode && <state.gameMode.icon size={24} />}
      />
      <Stepper.Step
        label="Your Character"
        description="Select your class and specialization"
        color="blue"
        completedIcon={
          state.player && (
            <Image
              src={getSpecIcon(state.player?.class, state.player?.spec)}
              alt={state.player?.spec}
              w={40}
              h={40}
              radius="xl"
            />
          )
        }
      />

      <Stepper.Step
        label="Teamates"
        description="Choose teamates classes and specializations"
        color="blue"
        completedIcon={<IconThumbUp size={24} />}
      />

      <Stepper.Step
        label="Opponents"
        description="Choose opponent classes and specializations"
        color="blue"
        completedIcon={<IconThumbDown size={24} />}
      />
      <Stepper.Step
        label="Review"
        description="Confirm your setup and begin"
        color="blue"
        completedIcon={<IconZoom size={24} />}
      />
      <Stepper.Step
        label="Kill Target"
        description="Completed"
        color="blue"
        progressIcon={<IconCrosshair size={24} />}
      />
    </Stepper>
  );
}
