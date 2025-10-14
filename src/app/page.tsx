import Link from "next/link";
import styles from "./page.module.css";
import { IconCrosshair, IconBrandGithub, IconLogs } from "@tabler/icons-react";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.title}>
          <h1>killtarget.ai</h1>
        </div>
        <div className={styles.ctas}>
          <Link className={styles.primary} href="/setup">
            <IconCrosshair size={20} />
            Whose the kill target?
          </Link>
        </div>
      </main>
      <footer className={styles.footer}>
        <Link
          href="https://github.com/jrshutske"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconBrandGithub size={20} />
          jrshutske
        </Link>
        <Link href="/changelog" target="_blank" rel="noopener noreferrer">
          <IconLogs size={20} />
          Changelog
        </Link>
      </footer>
    </div>
  );
}
