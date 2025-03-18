interface CommentaryTextProps {
  text: string;
  commentator: string;
}

export default function CommentaryText({
  text,
  commentator,
}: CommentaryTextProps) {
  return (
    <>
      <p>[{commentator}]</p>
      <p> {text}</p>
    </>
  );
}
