import { Image } from "@mantine/core";
import styles from "./main.module.css";
import { GAME_MODE_DUO, GAME_MODE_TRIO } from "@/types/GameMode";
import { useSetupContext } from "@/hooks/useSetupState";

export default function GameModeSelection() {
  const { setGameMode } = useSetupContext();
  return (
    <div className={styles.imageContainer}>
      <div className={styles.imageWrapper}>
        <Image
          src="/2v2.jpg"
          alt="2v2"
          className={styles.hoverableImage}
          onClick={() => setGameMode(GAME_MODE_DUO)}
        />
        <div className={styles.imageOverlay}>2v2</div>
      </div>
      <div className={styles.imageWrapper}>
        <Image
          src="/3v3.jpg"
          alt="3v3"
          className={styles.hoverableImage}
          onClick={() => setGameMode(GAME_MODE_TRIO)}
        />
        <div className={styles.imageOverlay}>3v3</div>
      </div>
    </div>
  );
}
