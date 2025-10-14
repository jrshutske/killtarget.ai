import { Player } from "./Player";
import { GameMode } from "./GameMode";
import { SetupSteps } from "./SetupSteps";

export type SetupState = {
  error: string;
  submitting: boolean;
  active: SetupSteps;
  gameMode?: GameMode;
  player?: Player;
  teammates: Player[];
  opponents: Player[];
  target?: Player;
};
