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

    // Example: Call your AI service
    const aiResponse = await determineKillTarget(setupData);

    return NextResponse.json(aiResponse);
  } catch (error) {
    console.error("Error processing setup data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
