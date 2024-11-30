import { useEffect, useState } from "react";
import "./MenuView.css";
import { getMinScore } from "../../../domain/calculate";
import { createUser } from "../../../domain/resultManager";
import { getLeaderboard } from "../../../data/source/network/apiService";

// localStorage.clear();
export default function MenuView({ onDifficultyChange, onStart }) {
  const [difficulty, setDifficulty] = useState(2);
  const minScore = getMinScore(difficulty);
  const [username, setUsername] = useState("");
  const [leaderboard, setLeaderboard] = useState(null);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  async function fetchLeaderboard() {
    setLeaderboard(await getLeaderboard(difficulty));
  }

  useEffect(() => {
    onDifficultyChange(difficulty);
    async function fetchUsername() {
      setUsername(localStorage.getItem("username"));
      if (!localStorage.getItem("username")) {
        const res = await createUser();
        localStorage.setItem("username", res.username);
        localStorage.setItem("token", res.token);
        await setUsername(res.username);
        console.log(res);
      }
    }
    fetchUsername();
  }, [1]);

  useEffect(() => {
    fetchLeaderboard();
  }, [difficulty]);

  return (
    <div className="menu-container">
      {showLeaderboard && (
        <div
          className="modal-overlay"
          onClick={() => setShowLeaderboard(false)}
        >
          <div className="modal-window" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">Таблица лидеров</h2>

            {leaderboard === null ? (
              <div className="loader">Загрузка...</div>
            ) : leaderboard.length === 0 ? (
              <span>Никто не прошел этот уровень</span>
            ) : (
              <div className="leaderboard-list">
                {leaderboard.map((player, index) => (
                  <div
                    className="leaderboard-item"
                    key={index}
                    style={{
                      backgroundColor:
                        player.username === username
                          ? "var(--purple)"
                          : "transparent",
                    }}
                  >
                    <span className="leaderboard-rank">{index + 1}</span>
                    <span className="leaderboard-username">
                      {player.username}
                    </span>
                    <span className="leaderboard-score">{player.score}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

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

      <div
        className="difficulty-container"
        style={{ width: "100%", gap: "10px" }}
      >
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
        <div
          className="leaderboard-button-container"
          onClick={() => setShowLeaderboard(true)}
        >
          <span className="leaderboard-button-text">
            Посмотреть рейтинг уровня
          </span>
        </div>
      </div>

      <div className="start-button-container" onClick={() => onStart()}>
        <span className="start-button-text">Старт</span>
      </div>
    </div>
  );
}
