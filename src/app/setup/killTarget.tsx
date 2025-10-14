import SelectionCard, {
  ClassCardImage,
  ClassCardSpecImage,
} from "@/components/SelectionCard";
import { Card, Grid, Stack, Text } from "@mantine/core";
import { useSetupContext } from "@/hooks/useSetupState";
import IconButton from "@/components/IconButton";

export default function KillTarget() {
  const { state } = useSetupContext();
  if (!state.target) {
    return null;
  }
  return (
    <>
      <Grid mx="auto" maw={1000} justify="center">
        <Grid.Col
          key={state.target.class}
          span={{ base: 12, xs: 6, sm: 6, md: 4, lg: 3 }}
        >
          <SelectionCard
            title={state.target.class}
            image={<ClassCardImage className={state.target.class} />}
            buttons={
              <IconButton
                key={state.target.playerId}
                label={state.target.spec}
                leftIcon={
                  <ClassCardSpecImage
                    className={state.target.class}
                    spec={state.target.spec}
                  />
                }
              />
            }
          />
        </Grid.Col>
      </Grid>
      <Grid mx="auto" maw={1000} justify="center" mt="lg">
        <Grid.Col key={state.target.class}>
          <Card>
            <Card.Section inheritPadding>
              <Text fw={1000} ta="center" m="md">
                Reasoning:
              </Text>
              <Text ta="center" m="md">
                {state.target.reasoning}
              </Text>
            </Card.Section>
          </Card>
        </Grid.Col>
      </Grid>
    </>
  );
}
