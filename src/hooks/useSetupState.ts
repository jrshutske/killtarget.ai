import { useReducer, useMemo, useContext, createContext } from "react";
import axios from "axios";
import { SetupState } from "@/types/State";
import { SetupSteps } from "@/types/SetupSteps";
import { GameMode, GameModeType } from "@/types/GameMode";
import { Player } from "@/types/Player";
import { SetupDataRequest } from "@/app/api/setup/route";
import setupRequests from "@/app/requests/setup";

// Constants
const INITIAL_STATE: SetupState = {
  error: "",
  submitting: false,
  active: SetupSteps.GameMode,
  gameMode: undefined,
  player: undefined,
  teammates: [],
  opponents: [],
  target: undefined,
};

// Types
type Action =
  | { type: "SET_ACTIVE"; payload: SetupSteps }
  | { type: "SET_GAME_MODE"; payload?: GameMode }
  | { type: "UPDATE_PLAYER"; payload?: Player }
  | { type: "UPDATE_TEAMMATES"; payload: Player[] }
  | { type: "UPDATE_OPPONENTS"; payload: Player[] }
  | { type: "UPDATE_TARGET"; payload: Player }
  | { type: "SET_SUBMITTING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string };

// Reducer
const setupReducer = (state: SetupState, action: Action): SetupState => {
  switch (action.type) {
    case "SET_ACTIVE":
      return { ...state, active: action.payload };

    case "SET_GAME_MODE":
      return {
        ...INITIAL_STATE,
        gameMode: action.payload,
        active: SetupSteps.ClassSelection,
      };

    case "UPDATE_PLAYER":
      return { ...state, player: action.payload };

    case "UPDATE_TEAMMATES":
      return { ...state, teammates: action.payload };

    case "UPDATE_OPPONENTS":
      return { ...state, opponents: action.payload };

    case "UPDATE_TARGET":
      return { ...state, target: action.payload };

    case "SET_SUBMITTING":
      return { ...state, submitting: action.payload };

    case "SET_ERROR":
      return { ...state, error: action.payload };

    default:
      return state;
  }
};

// Context
export const SetupContext = createContext<ReturnType<
  typeof useSetupState
> | null>(null);

export const useSetupContext = () => {
  const context = useContext(SetupContext);

  if (!context) {
    throw new Error(
      "useSetupContext must be used within SetupContext.Provider"
    );
  }

  return context;
};

// Custom hook
export const useSetupState = () => {
  const [state, dispatch] = useReducer(setupReducer, INITIAL_STATE);

  // Computed values
  const computedState = useMemo(
    () => ({
      // Step completion status
      isStepComplete: {
        [SetupSteps.GameMode]: false,
        [SetupSteps.ClassSelection]: !!state.player,
        [SetupSteps.TeammateSelection]:
          state.teammates.length === (state.gameMode?.maxTeammates ?? 0),
        [SetupSteps.OpponentSelection]:
          state.opponents.length === (state.gameMode?.maxOpponents ?? 0),
        [SetupSteps.ReviewSelection]: true, // Always complete once reached
        [SetupSteps.KillTarget]: false, // Always complete once reached
      },
    }),
    [state]
  );

  // Action creators
  const actions = useMemo(
    () => ({
      setActive: (step: SetupSteps) =>
        dispatch({ type: "SET_ACTIVE", payload: step }),

      setGameMode: (gameMode?: GameMode) =>
        dispatch({ type: "SET_GAME_MODE", payload: gameMode }),

      updatePlayer: (player?: Player) =>
        dispatch({ type: "UPDATE_PLAYER", payload: player }),

      updateTeammates: (teammates: Player[]) =>
        dispatch({ type: "UPDATE_TEAMMATES", payload: teammates }),

      updateOpponents: (opponents: Player[]) =>
        dispatch({ type: "UPDATE_OPPONENTS", payload: opponents }),

      updateTarget: (target: Player) =>
        dispatch({ type: "UPDATE_TARGET", payload: target }),

      // New: Submit setup data to backend
      submitSetup: async () => {
        dispatch({ type: "SET_SUBMITTING", payload: true });
        dispatch({ type: "SET_ERROR", payload: "" });

        try {
          const data: SetupDataRequest = {
            gameMode: state.gameMode!,
            player: state.player!,
            teammates: state.teammates,
            opponents: state.opponents,
          };

          const response = await setupRequests.submitSetup(data);

          dispatch({ type: "UPDATE_TARGET", payload: response });
          dispatch({ type: "SET_ACTIVE", payload: SetupSteps.KillTarget });
        } catch (error) {
          console.error("Error submitting setup:", error);

          if (axios.isAxiosError(error)) {
            const errorMessage =
              error.response?.data?.error ||
              error.message ||
              `HTTP error! status: ${error.response?.status}`;
            dispatch({ type: "SET_ERROR", payload: errorMessage });
          } else {
            dispatch({ type: "SET_ERROR", payload: error as string });
          }

          throw error;
        } finally {
          dispatch({ type: "SET_SUBMITTING", payload: false });
        }
      },
    }),
    [state]
  );

  return {
    state,
    dispatch,
    ...computedState,
    ...actions,
  };
};
