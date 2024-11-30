import { useEffect, useState } from "react";
import "./MenuView.css";
import { getMinScore } from "../../../domain/calculate";

export default function MenuView({ onDifficultyChange, onStart }) {
  const [difficulty, setDifficulty] = useState(2);
  const minScore = getMinScore(difficulty);

  useEffect(() => {
    onDifficultyChange(difficulty);
  });

  return (
    <div className="menu-container">
      <div className="max-score-block">
        <span className="max-score-title">
          {minScore != null ? "МИНИМАЛЬНОЕ ВРЕМЯ" : "УРОВЕНЬ НЕ ПРОЙДЕН"}
        </span>
        <span
          className="max-score"
          style={{ visibility: minScore != null ? "visible" : "hidden" }}
        >
          {minScore}
        </span>
      </div>

      <div></div>

      <div className="difficulty-container" style={{ width: "100%" }}>
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
        <span className="start-button-text">Старт</span>
      </div>
    </div>
  );
}
