import { Button, Grid, Text } from "@mantine/core";
import IconButton from "@/components/IconButton";
import SelectionCard, {
  ClassCardImage,
  ClassCardSpecImage,
} from "@/components/SelectionCard";
import { useSetupContext } from "@/hooks/useSetupState";
import styles from "./setup.module.css";

export default function ReviewSelection() {
  const { state, isStepComplete, submitSetup } = useSetupContext();
  if (
    !state.player ||
    state.teammates.length === 0 ||
    state.opponents.length === 0
  ) {
    return null;
  }
  return (
    <>
      <Text fw={1000} ta="center" m="lg">
        Teamates
      </Text>
      <Grid gutter="sm" mx="auto" maw={1000} justify="center">
        {[state.player, ...state.teammates].map((teammate, index) => (
          <Grid.Col
            key={`teammate-${index}-${teammate.playerId || teammate.class}`}
            span={{ base: 12, xs: 6, sm: 6, md: 4, lg: 3 }}
          >
            <SelectionCard
              title={teammate.class + (index === 0 ? " (You)" : "")}
              image={<ClassCardImage className={teammate.class} />}
              buttons={
                <IconButton
                  label={teammate.spec}
                  leftIcon={
                    <ClassCardSpecImage
                      className={teammate.class}
                      spec={teammate.spec}
                    />
                  }
                />
              }
            />
          </Grid.Col>
        ))}
      </Grid>
      <Text fw={1000} ta="center" m="lg">
        Opponents
      </Text>

      <Grid gutter="sm" mx="auto" maw={1000} justify="center">
        {state.opponents.map((opponent, index) => (
          <Grid.Col
            key={`opponent-${index}-${opponent.playerId || opponent.class}`}
            span={{ base: 12, xs: 6, sm: 6, md: 4, lg: 3 }}
          >
            <SelectionCard
              title={opponent.class}
              image={<ClassCardImage className={opponent.class} />}
              buttons={
                <IconButton
                  label={opponent.spec}
                  leftIcon={
                    <ClassCardSpecImage
                      className={opponent.class}
                      spec={opponent.spec}
                    />
                  }
                />
              }
            />
          </Grid.Col>
        ))}
      </Grid>
      <Button
        onClick={submitSetup}
        loading={state.submitting}
        disabled={!isStepComplete[state.active]}
        size="lg"
        fullWidth
        className={styles.submitButton}
      >
        {state.submitting ? "Processing..." : "Submit"}
      </Button>
    </>
  );
}
