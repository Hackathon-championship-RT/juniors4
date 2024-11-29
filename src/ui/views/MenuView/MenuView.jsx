import { useState } from "react";
import "./MenuView.css";
import { getMinScore } from "../../../domain/calculate";

export default function MenuView({ onDifficultyChange, onStart }) {
  const minScore = getMinScore();
  const [difficulty, setDifficulty] = useState(5);

  return (
    <div className="menu-container">
      <div
        className="max-score-block"
        style={{ visibility: minScore != null ? "visible" : "hidden" }}
      >
        <span className="max-score-title">МИНИМАЛЬНОЕ ВРЕМЯ</span>
        <span className="max-score">{minScore}</span>
      </div>

      <div className="difficulty-container">
        <label htmlFor="difficulty" className="difficulty-label">
          Уровень сложности
        </label>
        <div className="levels-row">
          {[1, 2, 3, 4, 5].map((level) => (
            <span
              key={level}
              className="level-name"
              style={{
                backgroundColor: difficulty === level ? "var(--purple)" : "",
              }}
              onClick={() => {
                setDifficulty(level);
                onDifficultyChange(level);
              }}
            >
              {level}
            </span>
          ))}
        </div>
      </div>

      <div className="start-button-container" onClick={() => onStart()}>
        <span className="start-button-text">START</span>
      </div>
    </div>
  );
}
