"use client";

import { Stepper, Image } from "@mantine/core";
import { getSpecIcon } from "@/utils/imageUtils";
import { GameModeType } from "@/types/GameMode";
import {
  IconCircleX,
  IconCompassFilled,
  IconCrosshair,
  IconEyeglass,
  IconFriends,
  IconReceipt,
  IconReceipt2,
  IconReceiptFilled,
  IconThumbDown,
  IconThumbDownFilled,
  IconThumbUp,
  IconThumbUpFilled,
  IconZoom,
} from "@tabler/icons-react";
import { useSetupContext } from "@/hooks/useSetupState";
import { SetupSteps } from "@/types/SetupSteps";

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

  const disableTeammateStep = state.gameMode?.value === GameModeType.SOLO;
  return (
    <Stepper
      active={state.active}
      onStepClick={onStepClick}
      orientation="vertical"
    >
      <Stepper.Step
        label="Game Mode"
        description="Choose Solo Shuffle, or Arena"
        color="blue"
        completedIcon={state.gameMode && <state.gameMode.icon size={24} />}
      />
      <Stepper.Step
        label="You"
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
        color={disableTeammateStep ? "red" : "blue"}
        disabled={disableTeammateStep}
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
