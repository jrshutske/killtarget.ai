import styles from "./page.module.css";
import {
  IconCrosshair,
  IconBrandGithub,
  IconLogs,
  IconDownload,
} from "@tabler/icons-react";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.title}>
          <h1>killtarget.ai</h1>
        </div>
        <div className={styles.ctas}>
          <a className={styles.primary} href="/setup">
            <IconCrosshair size={20} />
            Whose the kill target?
          </a>
          <a
            className={styles.primary}
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Deploy now
          </a>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://github.com/jrshutske"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconBrandGithub size={20} />
          jrshutske
        </a>
        <a href="/changelog" target="_blank" rel="noopener noreferrer">
          <IconLogs size={20} />
          Changelog
        </a>
        {/* <a href="" target="_blank" rel="noopener noreferrer">
          <IconDownload size={20} />
          Download the Add-On →
        </a> */}
      </footer>
    </div>
  );
}
