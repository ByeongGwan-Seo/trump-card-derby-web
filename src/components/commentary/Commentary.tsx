import { useEffect, useRef } from "react";
import CommentaryText from "./CommentaryText";

interface CommentaryProps {
  comments: string[];
  commentator: string;
}

const Commentary = ({ comments, commentator }: CommentaryProps) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [comments]);

  return (
    <div className="commentaryContainer">
      {comments.map((comment, index) => (
        <CommentaryText key={index} text={comment} commentator={commentator} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
};
export default Commentary;
