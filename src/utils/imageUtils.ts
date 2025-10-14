import { ClassName, SpecName } from "@/types/WowClass";

// Utility functions for handling WoW class images

export const getClassIcon = (className: ClassName): string => {
  const classFolderName = className.toLowerCase().replace(/\s+/g, "-");
  return `/classes/${classFolderName}/class.png`;
};

// Get spec icon from classes folder (since you have them organized by class)
export const getSpecIcon = (
  className: ClassName,
  specName: SpecName
): string => {
  const classFolderName = className.toLowerCase().replace(/\s+/g, "-");
  const specIconName = specName.toLowerCase().replace(/\s+/g, "-");
  return `/classes/${classFolderName}/${specIconName}.jpg`;
};

export const getClassIconUrl = (className: ClassName): string => {
  // Alternative: Use external CDN
  const classFolderName = className.toLowerCase().replace(/\s+/g, "-");
  return `https://mycdn.com/images/classes/${classFolderName}/icon.jpg`;
};

export const getSpecIconUrl = (
  className: ClassName,
  specName: SpecName
): string => {
  // Alternative: Use external CDN
  const classFolderName = className.toLowerCase().replace(/\s+/g, "-");
  const specIconName = specName.toLowerCase().replace(/\s+/g, "-");
  return `https://mycdn.com/images/classes/${classFolderName}/${specIconName}.jpg`;
};
