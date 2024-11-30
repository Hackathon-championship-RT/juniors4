import { useEffect } from "react";
import "./CardView.css";

export default function CardView({
  card,
  level,
  isSelected,
  isError,
  isAccepted,
  showItem,
}) {
  return (
    <div
      className={`card-root ${
        !showItem
          ? "hidden"
          : isSelected
          ? "selected"
          : isError
          ? "error"
          : isAccepted
          ? "accepted"
          : ""
      }`}
    >
      <img
        src={card.imagePath}
        className="card-logo-img"
        alt="card-logo"
        draggable="false"
        onContextMenu={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
        onDrag={(e) => e.preventDefault()}
      />
    </div>
  );
}
