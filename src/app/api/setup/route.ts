import { NextRequest, NextResponse } from "next/server";
import { Player } from "@/types/Player";
import { GameMode } from "@/types/GameMode";
import { determineKillTarget } from "../agent";

export interface SetupDataRequest {
  gameMode: GameMode;
  player: Player;
  teammates: Player[];
  opponents: Player[];
}

export async function POST(request: NextRequest) {
  try {
    const setupData: SetupDataRequest = await request.json();

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
