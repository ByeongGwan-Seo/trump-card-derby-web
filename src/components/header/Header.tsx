import { useRouter } from "next/router";
import styles from "@/styles/Header.module.css";

interface HeaderProps {
  setLanguage: (lang: string) => void;
  setComments: (comments: string[]) => void;
}

export default function Header({ setLanguage, setComments }: HeaderProps) {
  const router = useRouter();
  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    setComments([]);
    router.push("/");
    router.push("/");
  };

  return (
    <div className={styles.header}>
      <button
        onClick={() => handleLanguageChange("ko")}
        className={styles.flagButton}
      >
        한국어
      </button>
      <button
        onClick={() => handleLanguageChange("jp")}
        className={styles.flagButton}
      >
        日本語
      </button>
    </div>
  );
}
