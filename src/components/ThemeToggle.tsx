"use client";
import { Button, useMantineColorScheme } from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import styles from "@/app/page.module.css";

export function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [mounted, setMounted] = useState(false);

  // Ensure component only renders theme-dependent content after hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div style={{ position: "fixed", bottom: "20px", right: "20px" }}>
      <Button
        className={styles.themeToggle}
        onClick={() => toggleColorScheme()}
        variant="default"
        size="lg"
        aria-label="Toggle color scheme"
      >
        {mounted ? colorScheme === "dark" ? <IconSun /> : <IconMoon /> : null}
      </Button>
    </div>
  );
}
