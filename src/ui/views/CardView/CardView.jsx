import { useState } from "react";
import "./CardView.css";

export default function CardView({
  card,
  isSelected,
  isError,
  isAccepted,
  showItem,
}) {
  console.log(card);
  console.log(showItem);
  return (
    <>
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
        <img src={card.imagePath} className="card-logo-img" alt="card-logo" />
      </div>
    </>
  );
}
