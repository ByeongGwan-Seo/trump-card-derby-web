import styles from "@/styles/Header.module.css";

interface HeaderProps {
  setLanguage: (lang: string) => void;
}

export default function Header({ setLanguage }: HeaderProps) {
  return (
    <div className={styles.header}>
      <button onClick={() => setLanguage("ko")} className={styles.flagButton}>
        한국어
      </button>
      <button onClick={() => setLanguage("jp")} className={styles.flagButton}>
        日本語
      </button>
    </div>
  );
}
