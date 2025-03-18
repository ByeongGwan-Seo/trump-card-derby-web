import Image from "next/image";
import { useState } from "react";
import styles from "@/styles/Card.module.css";

const suits: string[] = ["1", "2", "3", "4"];
const suitImages: Record<string, string> = {
  "1": "/images/hearts.svg",
  "2": "/images/spades.svg",
  "3": "/images/diamonds.svg",
  "4": "/images/clubs.svg",
};

interface CardsProps {
  onCardClick: () => void;
}

const Cards = ({ onCardClick }: CardsProps) => {
  const [rotation, setRotation] = useState(0);
  const [randomSuit, setRandomSuit] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleClick = () => {
    if (randomSuit === null) {
      setRandomSuit(suits[Math.floor(Math.random() * suits.length)]);
      setRotation(180);
      return;
    }

    setIsTransitioning(true);
    setRotation((prev) => prev + 180);

    setTimeout(() => {
      setRandomSuit(suits[Math.floor(Math.random() * suits.length)]);
      setIsTransitioning(false);
    }, 500);

    onCardClick();
  };

  return (
    <div className={styles.cardContainer} onClick={handleClick}>
      <div
        className={styles.card}
        style={{ transform: `rotateY(${rotation}deg)` }}
      >
        <div
          className={`${styles.cardFace} ${styles.cardFront}`}
          style={{
            display: isTransitioning || randomSuit === null ? "block" : "none",
          }}
        >
          <Image
            src="/images/card_back.svg"
            alt="Card Front"
            width={200}
            height={150}
          />
        </div>

        <div
          className={`${styles.cardFace} ${styles.cardBack}`}
          style={{
            display: isTransitioning || randomSuit === null ? "none" : "block",
          }}
        >
          {randomSuit && (
            <Image
              src={suitImages[randomSuit]}
              alt={`${randomSuit} Card`}
              width={200}
              height={150}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Cards;
