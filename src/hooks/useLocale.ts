import { useState, useEffect } from "react";

interface Translations {
  language: string;
  title: string;
  subtitle: string;
  commentator: string;
  start: string;
  clubs: string;
  hearts: string;
  diamonds: string;
  spades: string;
  startComment1: string;
  startComment2: string;
  randomComment1: string;
  randomComment2: string;
  randomComment3: string;
  randomComment4: string;
  closeComment1: string;
  closeComment2: string;
  closeComment3: string;
  winComment1: string;
  winComment2: string;
  winComment3: string;
}

export default function useLocale(language: string) {
  const [translations, setTranslations] = useState<Translations>({
    language: "",
    title: "",
    subtitle: "",
    commentator: "",
    start: "",
    clubs: "",
    hearts: "",
    diamonds: "",
    spades: "",
    startComment1: "",
    startComment2: "",
    randomComment1: "",
    randomComment2: "",
    randomComment3: "",
    randomComment4: "",
    closeComment1: "",
    closeComment2: "",
    closeComment3: "",
    winComment1: "",
    winComment2: "",
    winComment3: "",
  });

  useEffect(() => {
    fetch("/locales.json")
      .then((res) => res.json())
      .then((data) => setTranslations(data[language] || ({} as Translations)))
      .catch(() =>
        setTranslations({
          language: "한국어",
          title: "트럼프 경마",
          subtitle: "카드를 클릭하면 게임이 시작됩니다.",
          commentator: "중계",
          start: "경기 시작됩니다.",
          clubs: "클로버 챔프",
          hearts: "하트브레이커",
          diamonds: "다이아 피어서",
          spades: "블랙스페이드",
          startComment1: "선두로 뛰쳐나가는건, ",
          startComment2: ",먼저 뛰쳐나갑니다.",
          randomComment1: "앞서나가는, ",
          randomComment2: ",달립니다.",
          randomComment3: "뜁니다, 뜁니다",
          randomComment4: ", 분발할 필요가 있어보입니다",
          closeComment1: "경기의 끝이 보이기 시작했습니다.",
          closeComment2: "한치 앞을 알 수 없는 승부",
          closeComment3: "결승선을 통과하는 것은 과연",
          winComment1: ", 우승컵을 들어올립니다!",
          winComment2: "끝내 결승컵을 들어올리는 것은,",
          winComment3: ", 우승을 차지합니다!",
        })
      );
  }, [language]);

  return translations;
}
