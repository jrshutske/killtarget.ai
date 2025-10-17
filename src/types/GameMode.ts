import { IconUser, IconUsersGroup, IconUsers } from "@tabler/icons-react";

// GameMode.ts - enum for validation
export enum GameModeType {
  DUO,
  TRIO,
}

export type GameMode = {
  value: GameModeType;
  label: string;
  icon: React.ElementType;
  maxTeammates: number;
  maxOpponents: number;
};

export const GAME_MODE_DUO = {
  value: GameModeType.DUO,
  label: "2v2",
  icon: IconUsers,
  maxTeammates: 1,
  maxOpponents: 2,
};

export const GAME_MODE_TRIO = {
  value: GameModeType.TRIO,
  label: "3v3",
  icon: IconUsersGroup,
  maxTeammates: 2,
  maxOpponents: 3,
};
