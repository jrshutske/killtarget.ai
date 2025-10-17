import { GAME_MODE_DUO, GAME_MODE_TRIO } from "./GameMode";

export interface WowClass {
  class: string;
  specs: string[];
}

export const WOW_CLASSES: WowClass[] = [
  {
    class: "Death Knight",
    specs: ["Blood", "Frost", "Unholy"],
  },
  {
    class: "Demon Hunter",
    specs: ["Havoc", "Vengeance"],
  },
  {
    class: "Druid",
    specs: ["Balance", "Feral", "Guardian", "Restoration"],
  },
  {
    class: "Evoker",
    specs: ["Devastation", "Preservation", "Augmentation"],
  },
  {
    class: "Hunter",
    specs: ["Beast Mastery", "Marksmanship", "Survival"],
  },
  {
    class: "Mage",
    specs: ["Arcane", "Fire", "Frost"],
  },
  {
    class: "Monk",
    specs: ["Brewmaster", "Mistweaver", "Windwalker"],
  },
  {
    class: "Paladin",
    specs: ["Holy", "Protection", "Retribution"],
  },
  {
    class: "Priest",
    specs: ["Discipline", "Holy", "Shadow"],
  },
  {
    class: "Rogue",
    specs: ["Assassination", "Outlaw", "Subtlety"],
  },
  {
    class: "Shaman",
    specs: ["Elemental", "Enhancement", "Restoration"],
  },
  {
    class: "Warlock",
    specs: ["Affliction", "Demonology", "Destruction"],
  },
  {
    class: "Warrior",
    specs: ["Arms", "Fury", "Protection"],
  },
];

// Type for class names
export type ClassName = (typeof WOW_CLASSES)[number]["class"];

// Type for spec names
export type SpecName = (typeof WOW_CLASSES)[number]["specs"][number];

// Helper functions
export const getClassSpecs = (className: ClassName): string[] => {
  const wowClass = WOW_CLASSES.find((c) => c.class === className);
  return wowClass?.specs || [];
};

export const getAllClassNames = (): ClassName[] => {
  return WOW_CLASSES.map((c) => c.class);
};

export const getAllSpecNames = (): SpecName[] => {
  return WOW_CLASSES.flatMap((c) => c.specs);
};

export const isValidClass = (className: string): className is ClassName => {
  return WOW_CLASSES.some((c) => c.class === className);
};

export const isValidSpec = (specName: string): specName is SpecName => {
  return WOW_CLASSES.some((c) => c.specs.includes(specName));
};

// Game mode validation
export const isValidGameModeLabel = (gameModeLabel: string): boolean => {
  const validLabels = [GAME_MODE_DUO.label, GAME_MODE_TRIO.label];
  return validLabels.includes(gameModeLabel);
};
