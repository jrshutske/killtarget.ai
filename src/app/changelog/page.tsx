import { Container, Title, Text, ThemeIcon, Stack, Box } from "@mantine/core";
import {
  IconSparkles,
  IconBrain,
  IconDeviceGamepad2,
  IconPalette,
  IconLayout,
  IconUsers,
} from "@tabler/icons-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Changelog - killtarget.ai",
  description:
    "Track the evolution and updates of killtarget.ai, the AI-powered WoW arena kill target analyzer.",
};

export default function ChangelogPage() {
  return (
    <Container size="md" py="xl">
      <Stack gap="xl">
        <div>
          <Title order={1} mb="xs">
            Changelog
          </Title>
          <Text c="dimmed">Track the evolution of killtarget.ai</Text>
          <Link
            href="/"
            style={{
              color: "var(--mantine-color-blue-6)",
              marginTop: "1rem",
              display: "inline-block",
            }}
          >
            ← Back to Home
          </Link>
        </div>

        <Stack gap="xl">
          <Box style={{ display: "flex", gap: "1rem" }}>
            <ThemeIcon size={40} variant="gradient" radius="xl">
              <IconSparkles size={20} />
            </ThemeIcon>
            <div style={{ flex: 1 }}>
              <Title order={3}>Version 0.1.0 - Initial Release</Title>
              <Text c="dimmed" size="sm">
                December 2024
              </Text>
              <Text size="sm" mt="xs">
                🎮 <strong>Core Features</strong>
              </Text>
              <ul style={{ fontSize: "14px", marginTop: "0.5rem" }}>
                <li>AI-powered kill target recommendations for WoW Arena</li>
                <li>Support for 2v2 and 3v3 arena formats</li>
                <li>Detailed tactical reasoning with meta considerations</li>
                <li>All classes and specializations from current WoW patch</li>
              </ul>
            </div>
          </Box>

          <Box style={{ display: "flex", gap: "1rem" }}>
            <ThemeIcon size={40} variant="gradient" radius="xl">
              <IconBrain size={20} />
            </ThemeIcon>
            <div style={{ flex: 1 }}>
              <Title order={3}>AI Integration</Title>
              <Text size="sm" mt="xs">
                🤖 <strong>LangChain & Groq Integration</strong>
              </Text>
              <ul style={{ fontSize: "14px", marginTop: "0.5rem" }}>
                <li>Llama 3.1 8B model for strategic analysis</li>
                <li>Real-time meta information via Tavily search</li>
                <li>
                  Multi-factor analysis: survivability, threat level, team
                  synergy
                </li>
                <li>JSON-structured responses with validation</li>
              </ul>
            </div>
          </Box>

          <Box style={{ display: "flex", gap: "1rem" }}>
            <ThemeIcon size={40} variant="gradient" radius="xl">
              <IconDeviceGamepad2 size={20} />
            </ThemeIcon>
            <div style={{ flex: 1 }}>
              <Title order={3}>User Experience</Title>
              <Text size="sm" mt="xs">
                ✨ <strong>Setup Flow</strong>
              </Text>
              <ul style={{ fontSize: "14px", marginTop: "0.5rem" }}>
                <li>Interactive stepper with visual progress tracking</li>
                <li>Class and spec selection with icon previews</li>
                <li>Review step to confirm team compositions</li>
                <li>Animated submit button with smooth transitions</li>
              </ul>
            </div>
          </Box>

          <Box style={{ display: "flex", gap: "1rem" }}>
            <ThemeIcon size={40} variant="gradient" radius="xl">
              <IconPalette size={20} />
            </ThemeIcon>
            <div style={{ flex: 1 }}>
              <Title order={3}>Design System</Title>
              <Text size="sm" mt="xs">
                🎨 <strong>Visual Design</strong>
              </Text>
              <ul style={{ fontSize: "14px", marginTop: "0.5rem" }}>
                <li>Dark/light mode support with theme toggle</li>
                <li>Mantine UI components for consistent styling</li>
                <li>Responsive design for mobile and desktop</li>
                <li>Hover effects and interactive elements</li>
                <li>Custom CSS animations and transitions</li>
              </ul>
            </div>
          </Box>

          <Box style={{ display: "flex", gap: "1rem" }}>
            <ThemeIcon size={40} variant="gradient" radius="xl">
              <IconLayout size={20} />
            </ThemeIcon>
            <div style={{ flex: 1 }}>
              <Title order={3}>Layout & Navigation</Title>
              <Text size="sm" mt="xs">
                📱 <strong>Responsive Interface</strong>
              </Text>
              <ul style={{ fontSize: "14px", marginTop: "0.5rem" }}>
                <li>
                  Adaptive header: logo + title on desktop, title only on mobile
                </li>
                <li>Collapsible sidebar navigation</li>
                <li>Full-screen game mode selection with hover effects</li>
                <li>Optimized layouts for all screen sizes</li>
              </ul>
            </div>
          </Box>

          <Box style={{ display: "flex", gap: "1rem" }}>
            <ThemeIcon size={40} variant="gradient" radius="xl">
              <IconUsers size={20} />
            </ThemeIcon>
            <div style={{ flex: 1 }}>
              <Title order={3}>Icon System</Title>
              <Text size="sm" mt="xs">
                🎯 <strong>Spec Icon Display</strong>
              </Text>
              <ul style={{ fontSize: "14px", marginTop: "0.5rem" }}>
                <li>Dynamic icon grids for team compositions</li>
                <li>Pizza-slice layout for 3-player teams</li>
                <li>Side-by-side for 2-player teams</li>
                <li>Single icon for solo players</li>
                <li>All icons fit within circular stepper indicators</li>
              </ul>
            </div>
          </Box>
        </Stack>

        <div
          style={{
            marginTop: "3rem",
            padding: "2rem",
            backgroundColor: "var(--mantine-color-dark-6)",
            borderRadius: "8px",
          }}
        >
          <Title order={3} mb="md">
            Technology Stack
          </Title>
          <Text size="sm">
            <strong>Frontend:</strong> Next.js 15, React 19, TypeScript, Mantine
            UI
          </Text>
          <Text size="sm" mt="xs">
            <strong>AI/ML:</strong> LangChain, Groq (Llama 3.1), Tavily Search
          </Text>
          <Text size="sm" mt="xs">
            <strong>Styling:</strong> CSS Modules, Responsive Design, Dark Mode
          </Text>
          <Text size="sm" mt="xs">
            <strong>Package Manager:</strong> pnpm
          </Text>
          <Text size="sm" mt="xs">
            <strong>License:</strong> GPL-3.0
          </Text>
        </div>

        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <Text size="sm" c="dimmed">
            Made with ❤️ for the WoW arena community
          </Text>
        </div>
      </Stack>
    </Container>
  );
}
