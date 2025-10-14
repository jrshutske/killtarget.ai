import { Grid, Image } from "@mantine/core";
import { GAME_MODES, GameMode } from "@/types/GameMode";
import IconButton from "@/components/IconButton";
import SelectionCard from "@/components/SelectionCard";
import { useSetupContext } from "@/hooks/useSetupState";
import { IconCircleCheckFilled } from "@tabler/icons-react";

export default function GameModeSelection() {
  const { setGameMode, state } = useSetupContext();

  const renderRightIcon = (gameMode?: GameMode) => {
    if (gameMode === state.gameMode) {
      return <IconCircleCheckFilled />;
    }
  };

  return (
    <>
      <Grid gutter="sm" mx="auto" maw={1000} justify="center">
        <Grid.Col span={{ base: 12, xs: 6, sm: 4, md: 3 }}>
          <SelectionCard
            title="Game Mode"
            image={<Image src={"pvp.png"} alt={"pvp icon"} w={30} h={30} />}
            buttons={GAME_MODES.map((gameMode) => (
              <IconButton
                key={gameMode.value}
                leftIcon={<gameMode.icon size={25} />}
                rightIcon={renderRightIcon(gameMode)}
                label={gameMode.label}
                onClick={() => setGameMode(gameMode)}
                onRightClick={() => setGameMode(undefined)}
              />
            ))}
          />
        </Grid.Col>
      </Grid>
    </>
  );
}
