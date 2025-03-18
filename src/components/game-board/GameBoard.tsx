import { useEffect, useState } from "react";
import styles from "@/styles/GameBoard.module.css";
import Image from "next/image";
import BackwardColumn from "./BackwardColumn";

const suits = ["1", "2", "3", "4"];
const suitImages: Record<string, string> = {
  "1": "/images/clubs.svg",
  "2": "/images/hearts.svg",
  "3": "/images/diamonds.svg",
  "4": "/images/spades.svg",
};

interface GameBoardProps {
  drawnCard: string | null;
  cardDrawCount: number;
}

const GameBoard = ({ drawnCard, cardDrawCount }: GameBoardProps) => {
  const [positions, setPositions] = useState<Record<string, number>>({
    "1": 7,
    "2": 7,
    "3": 7,
    "4": 7,
  });

  useEffect(() => {
    if (!drawnCard || cardDrawCount === 0) return;

    setPositions((prev) => {
      const newPosition = prev[drawnCard] > 0 ? prev[drawnCard] - 1 : 0;

      return {
        ...prev,
        [drawnCard]: newPosition,
      };
    });
  }, [drawnCard, cardDrawCount]);

  const handleBackwardReveal = (suit: string) => {
    setPositions((prev) => ({
      ...prev,
      [suit]: Math.min(prev[suit] + 1, 7),
    }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {Array.from({ length: 8 }).map((_, rowIndex) => (
          <div key={rowIndex} className={styles.row}>
            {suits.map((suit) => (
              <div key={suit} className={styles.cell}>
                {positions[suit] === rowIndex && (
                  <Image
                    src={suitImages[suit]}
                    alt={suit}
                    width={80}
                    height={60}
                  />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      <BackwardColumn
        onCardReveal={handleBackwardReveal}
        cardPositions={positions}
      />
    </div>
  );
};

export default GameBoard;
