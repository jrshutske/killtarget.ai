import { NextRequest, NextResponse } from "next/server";
import { Player } from "@/types/Player";
import { GameMode } from "@/types/GameMode";
import { determineKillTarget } from "../agent";
import {
  isValidClass,
  isValidSpec,
  isValidGameModeLabel,
} from "@/types/WowClass";

export interface SetupDataRequest {
  gameMode: GameMode;
  player: Player;
  teammates: Player[];
  opponents: Player[];
}

export async function POST(request: NextRequest) {
  try {
    const setupData: SetupDataRequest = await request.json();

    // Simple validation - check game mode, classes and specs
    if (!isValidGameModeLabel(setupData.gameMode.label)) {
      return NextResponse.json(
        { error: `Invalid game mode: ${setupData.gameMode.label}` },
        { status: 400 }
      );
    }

    const allPlayers = [
      setupData.player,
      ...setupData.teammates,
      ...setupData.opponents,
    ];

    for (const player of allPlayers) {
      if (!isValidClass(player.class) || !isValidSpec(player.spec)) {
        return NextResponse.json(
          { error: `Invalid class or spec: ${player.class} ${player.spec}` },
          { status: 400 }
        );
      }
    }

    const killTarget = await determineKillTarget(setupData);

    console.log("Agent: Kill target returned:", {
      class: killTarget.class,
      spec: killTarget.spec,
      reasoning: killTarget.reasoning,
    });

    return NextResponse.json(killTarget);
  } catch (error) {
    console.error("API: Error processing setup data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
