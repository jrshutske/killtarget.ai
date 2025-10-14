import { IconUser, IconUsersGroup, IconUsers } from "@tabler/icons-react";

// GameMode.ts - enum for validation
export enum GameModeType {
  SOLO,
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

// GameModeData.ts - array for UI
export const GAME_MODES = [
  {
    value: GameModeType.DUO,
    label: "2v2",
    icon: IconUsers,
    maxTeammates: 1,
    maxOpponents: 2,
  },
  {
    value: GameModeType.TRIO,
    label: "3v3",
    icon: IconUsersGroup,
    maxTeammates: 2,
    maxOpponents: 3,
  },
];
