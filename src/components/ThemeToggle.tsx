"use client";
import { useMantineColorScheme } from "@mantine/core";
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

  if (!mounted) return null;
  return colorScheme === "dark" ? (
    <IconSun
      size={30}
      onClick={() => toggleColorScheme()}
      className={styles.themeToggle}
    />
  ) : (
    <IconMoon
      size={30}
      onClick={() => toggleColorScheme()}
      className={styles.themeToggle}
    />
  );
}
