import { useState } from "react";
import "./FinishView.css";
import { getMinScore } from "../../../domain/calculate";

export default function FinishView({ score, restart, openMenu }) {
  const minScore = getMinScore();
  return (
    <div className="finish-container">
      <div className="max-score-block">
        <span className="max-score-title">МИНИМАЛЬНОЕ ВРЕМЯ</span>
        <span className="max-score">{minScore}</span>
      </div>

      <div className="score-block">
        <span className="score-title">СЧЕТ</span>
        <span className="score">{score}</span>
      </div>

      <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
        <div className="again-button-container" onClick={() => restart()}>
          <span className="start-button-text">Заново</span>
        </div>
        <div className="menu-button-container" onClick={() => openMenu()}>
          <span className="start-button-text">На главную</span>
        </div>
      </div>
    </div>
  );
}
