import { useState } from "react";
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

  const handleCardClick = (rowIndex: number) => {
    if (revealedCards[rowIndex]) return;

    const canReveal = suits.every((suit) => cardPositions[suit] < rowIndex);

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
        return (
          <div
            key={reversedRowIndex}
            className={styles.cell}
            onClick={() => handleCardClick(reversedRowIndex)}
          >
            {reversedRowIndex === 0 ? null : revealedCards[reversedRowIndex] ? (
              <Image
                src={suitImages[revealedCards[reversedRowIndex]!]}
                alt="Revealed Card"
                width={80}
                height={60}
              />
            ) : (
              <div className={styles.cardBack} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default BackwardColumn;
