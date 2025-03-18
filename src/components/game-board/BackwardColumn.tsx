import { useState, useEffect } from "react";
import styles from "@/styles/BackwardColumn.module.css";
import Image from "next/image";

const suits = ["1", "2", "3", "4"];
const suitImages: Record<string, string> = {
  "1": "/images/clubs.svg",
  "2": "/images/hearts.svg",
  "3": "/images/diamonds.svg",
  "4": "/images/spades.svg",
};

interface BackwardColumnProps {
  onCardReveal: (suit: string) => void;
  cardPositions: Record<string, number>;
}

const BackwardColumn = ({
  onCardReveal,
  cardPositions,
}: BackwardColumnProps) => {
  const [revealedCards, setRevealedCards] = useState<
    Record<number, string | null>
  >({});

  useEffect(() => {
    console.log("현재 카드 위치:", cardPositions);
  }, [cardPositions]);

  const handleCardClick = (rowIndex: number) => {
    if (revealedCards[rowIndex]) return;

    const canReveal = suits.every((suit) => cardPositions[suit] < rowIndex);
    console.log(`Row ${rowIndex} canReveal 상태:`, canReveal);

    if (canReveal) {
      const drawnSuit = suits[Math.floor(Math.random() * suits.length)];
      setRevealedCards((prev) => ({ ...prev, [rowIndex]: drawnSuit }));
      onCardReveal(drawnSuit);
    }
  };

  return (
    <div className={styles.column}>
      {Array.from({ length: 8 }).map((_, rowIndex) => {
        const reversedRowIndex = 7 - rowIndex;
        const canReveal = suits.every(
          (suit) => cardPositions[suit] < reversedRowIndex
        );
        const alreadyRevealed = !canReveal;

        return (
          <div
            key={reversedRowIndex}
            className={`${styles.cell} ${canReveal ? "pulse" : ""}`}
            onClick={() => handleCardClick(reversedRowIndex)}
          >
            {reversedRowIndex === 0 ? null : (
              <div className={styles.cardBack}>
                <Image
                  src={
                    revealedCards[reversedRowIndex]
                      ? suitImages[revealedCards[reversedRowIndex]!]
                      : "/images/card_back.svg"
                  }
                  alt="Card"
                  width={80}
                  height={60}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                  }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default BackwardColumn;
