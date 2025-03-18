import Head from "next/head";
import { useState } from "react";
import Header from "@/components/header/Header";
import Cards from "@/components/cards/Cards";
import styles from "@/styles/Home.module.css";
import useLocale from "@/hooks/useLocale";
import Commentary from "@/components/commentary/Commentary";

export default function Home() {
  const [language, setLanguage] = useState("ko");
  const translations = useLocale(language);
  const [comments, setComments] = useState<string[]>([]);

  const handleCardClick = () => {
    const commentsList = [
      translations.randomComment1,
      translations.randomComment2,
      translations.randomComment3,
      translations.randomComment4,
    ];
    const newComment =
      commentsList[Math.floor(Math.random() * commentsList.length)];

    setComments((prev) => [...prev, newComment]);
  };

  return (
    <>
      <Head>
        <title>Trump Card Derby</title>
        <meta name="description" content="Made by Gomserker" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.page}>
        <div className={styles.contentContainer}>
          <Header setLanguage={setLanguage} />

          <main className={styles.main}>
            <h1>{translations.title || "failed to read"}</h1>
            <h2>
              {translations.subtitle || "카드를 클릭하면 게임이 시작됩니다."}
            </h2>
            <div className={styles.gridContainer}>
              <div className={styles.leftColumn}></div>
              <div className={styles.rightColumn}>
                <div className={styles.topBlock}>
                  <Commentary
                    comments={comments}
                    commentator={translations.commentator}
                  />
                </div>
                <div className={styles.cardContainer}>
                  <Cards onCardClick={handleCardClick} />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
