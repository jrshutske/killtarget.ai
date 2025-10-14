"use client";

import { MantineProvider, createTheme } from "@mantine/core";

// Create a custom theme with consistent font variables
const theme = createTheme({
  fontFamily: "var(--font-geist-sans), sans-serif",
  fontFamilyMonospace: "var(--font-geist-mono), monospace",
  headings: {
    fontFamily: "var(--font-geist-sans), sans-serif",
  },
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider
      theme={theme}
      withGlobalClasses
      withStaticClasses
      defaultColorScheme="dark"
    >
      {children}
    </MantineProvider>
  );
}
