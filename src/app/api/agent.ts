import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import { ChatGroq } from "@langchain/groq";
import { HumanMessage } from "@langchain/core/messages";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { Player } from "@/types/Player";
import { SetupDataRequest } from "./setup/route";

// Define the tools for the agent to use
const agentTools = [new TavilySearchResults({ maxResults: 1 })];
const agentModel = new ChatGroq({
  model: "llama-3.1-8b-instant", // Current supported model
  temperature: 0,
});

// Initialize memory to persist state between graph runs
const agent = createReactAgent({
  llm: agentModel,
  tools: agentTools,
});

// Function to determine kill target in WoW arena
export async function determineKillTarget(teamData: SetupDataRequest) {
  const teammates = teamData.teammates
    .map((teammate) => `${teammate.spec} ${teammate.class}`)
    .join("\n");
  const opponents = teamData.opponents
    .map((opponent) => `${opponent.spec} ${opponent.class}`)
    .join("\n");
  const killTargetPrompt = `
    You are an expert World of Warcraft arena strategist. Based on the team composition data provided, determine the optimal kill target.
    
    Your Team:
    - Player: ${teamData.player.spec} ${teamData.player.class}
    - Teammates: ${teammates}
    
    Enemy Team (choose ONE of these as the kill target):
    ${opponents}
    
    Game Mode: ${teamData.gameMode.label}
    
    Analyze the following factors in detail when selecting a kill target:
    1. Survivability: Defensive cooldowns, self-healing, armor, health pool
    2. Mobility: Escape abilities, movement speed, teleports, blinks
    3. Threat Level: Burst damage potential, sustained damage, crowd control abilities
    4. Role Priority: Typically healers > damage dealers > tanks
    5. Class Synergy: How well they work with their teammates
    6. Your Team's Strengths: What your composition is good at countering
    7. Current Meta: Which specs are strong/weak in the current patch
    
    Search for current WoW arena meta information if needed to make an informed decision.
    
    Provide detailed reasoning that covers multiple factors (minimum 2-3 sentences explaining survivability, threat level, and why this target is optimal for your specific team composition).
    
    CRITICAL: Your ENTIRE response must be ONLY the JSON object below. Do NOT include any text before or after the JSON.
    
    FORMATTING REQUIREMENTS:
    - Start your response with { and end with }
    - No introduction, explanation, or commentary outside the JSON
    - No markdown, no code blocks, no backticks
    - The "class" field: base class name only (e.g., "Death Knight", "Priest", "Warrior")
    - The "spec" field: specialization name only (e.g., "Unholy", "Shadow", "Arms")
    - The "reasoning" field: detailed 2-4 sentence explanation covering:
      * Target's survivability weaknesses
      * Threat they pose if left alive
      * Why they're the best choice for YOUR specific team composition
      * CRITICAL: The class and spec you mention in the reasoning MUST EXACTLY match the "class" and "spec" fields
      * Use "Spec Class" format when referring to the TARGET (e.g., if class="Death Knight" and spec="Unholy", say "Unholy Death Knight")
    
    CONSISTENCY CHECK: If you select class="Monk" and spec="Mistweaver", your reasoning MUST discuss the "Mistweaver Monk" as the PRIMARY KILL TARGET. You may mention other opponents as CC targets or secondary considerations, but make it clear the Mistweaver Monk is the one to kill.
    
    Return EXACTLY this JSON structure with no other text:
    {"class": "class_name", "spec": "spec_name", "reasoning": "detailed explanation about the class_name spec_name target"}
  `;

  const response = await agent.invoke(
    { messages: [new HumanMessage(killTargetPrompt)] },
    { configurable: { thread_id: "arena_analysis" } }
  );

  const content = response.messages[response.messages.length - 1]
    .content as string;

  try {
    // Try to parse directly first
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(content);
    } catch {
      // If direct parse fails, try to extract JSON from the content
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedResponse = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No JSON object found in response");
      }
    }

    // Validate that class and spec are present
    if (
      !parsedResponse.class ||
      !parsedResponse.spec ||
      !parsedResponse.reasoning
    ) {
      throw new Error("Missing required fields in AI response");
    }

    // Return as Player object - the AI response should match the Player interface
    const killTarget: Player = {
      class: parsedResponse.class,
      spec: parsedResponse.spec,
      reasoning: parsedResponse.reasoning,
    };

    // Validate consistency: check if the class and spec appear in the reasoning
    const expectedReference = `${killTarget.spec} - ${killTarget.class}`;
    const alternativeReference = `${killTarget.spec}-${killTarget.class}`;
    const reasoning = killTarget.reasoning || "";
    const hasCorrectReference =
      reasoning.includes(expectedReference) ||
      reasoning.includes(alternativeReference) ||
      reasoning.includes(killTarget.spec);

    if (!hasCorrectReference) {
      console.warn(
        `Warning: Reasoning may not match selected target.\n` +
          `Selected: ${expectedReference}\n` +
          `Reasoning: ${reasoning}`
      );
    }

    return killTarget;
  } catch (error) {
    console.error("Failed to parse AI response:", error);
    console.error("Raw content:", content);

    // Return a fallback or throw an error
    throw new Error(`Failed to parse kill target from AI response: ${error}`);
  }
}
