import './Star.css';
type StarProps = {
  fillPercentage: number; // 0 to 1
};

const Star = ({ fillPercentage }: StarProps) => {
  const fill = Math.round(Math.min(1, Math.max(0, fillPercentage)) * 100);

  return (
    <span className="ratings">
      <span className="empty-stars" aria-hidden="true" />
      <span className="full-stars" style={{ width: `${fill}%` }} aria-hidden="true" />
    </span>
  );
};

export default Star;
