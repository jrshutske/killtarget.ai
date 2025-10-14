import { Grid } from "@mantine/core";
import {
  IconCircleCheckFilled,
  IconCircleNumber1Filled,
  IconCircleNumber2Filled,
  IconCircleNumber3Filled,
  IconCircleNumber4Filled,
  IconCircleNumber5Filled,
} from "@tabler/icons-react";
import { v4 } from "uuid";
import IconButton from "@/components/IconButton";
import { WOW_CLASSES } from "@/types/WowClass";
import { SetupSteps } from "@/types/SetupSteps";
import SelectionCard, {
  ClassCardImage,
  ClassCardSpecImage,
} from "@/components/SelectionCard";
import { useSetupContext } from "@/hooks/useSetupState";

// Constants
const NUMBER_ICONS = [
  undefined,
  <IconCircleNumber1Filled key={1} />,
  <IconCircleNumber2Filled key={2} />,
  <IconCircleNumber3Filled key={3} />,
  <IconCircleNumber4Filled key={4} />,
  <IconCircleNumber5Filled key={5} />,
] as const;

const MAX_ICON_COUNT = NUMBER_ICONS.length - 1;

export default function ClassSelection() {
  const { state, updatePlayer, updateTeammates, updateOpponents } =
    useSetupContext();

  const renderRightIcon = (className: string, spec: string) => {
    // Only show count icons for teammate/opponent selection
    if (state.active === SetupSteps.ClassSelection) {
      if (state.player?.class === className && state.player?.spec === spec)
        return <IconCircleCheckFilled />;
      return;
    }

    // Get the appropriate player list based on current step
    const players =
      state.active === SetupSteps.TeammateSelection
        ? state.teammates
        : state.opponents;

    // Count matching players
    const count = players.filter(
      (player) => player.class === className && player.spec === spec
    ).length;

    // Return appropriate icon based on count (capped at max)
    return NUMBER_ICONS[Math.min(count, MAX_ICON_COUNT)];
  };

  const addPlayers = (className: string, spec: string) => {
    // Create new player object
    const newPlayer = {
      playerId: v4(),
      class: className,
      spec: spec,
    };
    // Dispatch appropriate action based on current step
    switch (state.active) {
      case SetupSteps.ClassSelection:
        updatePlayer({ class: className, spec: spec });
        break;

      case SetupSteps.TeammateSelection:
        if (state.teammates.length >= (state.gameMode?.maxTeammates ?? 0))
          return;
        updateTeammates([...state.teammates, newPlayer]);
        break;

      case SetupSteps.OpponentSelection:
        if (state.opponents.length >= (state.gameMode?.maxOpponents ?? 0))
          return;
        updateOpponents([...state.opponents, newPlayer]);
        break;
    }
  };

  const removePlayers = (className: string, spec: string) => {
    switch (state.active) {
      case SetupSteps.ClassSelection:
        updatePlayer();
        break;

      case SetupSteps.TeammateSelection: {
        const firstMatchingTeammate = state.teammates.find(
          (teammate) => teammate.class === className && teammate.spec === spec
        );
        if (firstMatchingTeammate) {
          updateTeammates(
            state.teammates.filter(
              (teammate) => teammate.playerId !== firstMatchingTeammate.playerId
            )
          );
        }
        break;
      }

      case SetupSteps.OpponentSelection: {
        const firstMatchingOpponent = state.opponents.find(
          (opponent) => opponent.class === className && opponent.spec === spec
        );
        if (firstMatchingOpponent) {
          updateOpponents(
            state.opponents.filter(
              (opponent) => opponent.playerId !== firstMatchingOpponent.playerId
            )
          );
        }
        break;
      }
    }
  };

  return (
    <Grid gutter="sm" mx="auto" maw={1000}>
      {WOW_CLASSES.map((wowClass) => (
        <Grid.Col
          key={wowClass.class}
          span={{ base: 12, xs: 6, sm: 6, md: 4, lg: 3 }}
        >
          <SelectionCard
            title={wowClass.class}
            image={<ClassCardImage className={wowClass.class} />}
            buttons={wowClass.specs.map((spec) => (
              <IconButton
                key={spec}
                label={spec}
                leftIcon={
                  <ClassCardSpecImage className={wowClass.class} spec={spec} />
                }
                rightIcon={renderRightIcon(wowClass.class, spec)}
                onClick={() => addPlayers(wowClass.class, spec)}
                onRightClick={() => removePlayers(wowClass.class, spec)}
              />
            ))}
          />
        </Grid.Col>
      ))}
    </Grid>
  );
}
