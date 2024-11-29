import { useState } from "react";
import "./MenuView.css";

export default function MenuView({ onDifficultyChange, onStart }) {
  const [maxScore, setMaxScore] = useState(1000);
  const [difficulty, setDifficulty] = useState(5);

  return (
    <div className="menu-container">
      <div className="max-score-block">
        <span className="max-score-title">МАКСИМАЛЬНЫЙ СЧЕТ</span>
        <span className="max-score">{maxScore}</span>
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
