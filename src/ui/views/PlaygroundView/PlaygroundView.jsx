import "./PlaygroundView.css";
import CardView from "../CardView/CardView";
import cards from "../../../../public/config/cards_config.json";
import { calculateScore } from "../../../domain/calculate";
import { useState, useEffect } from "react";

export default function PlaygroundView({ generatedPlayground, onFinish }) {
  const [side, setSide] = useState(generatedPlayground[0].length);
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    const id = setInterval(
      () => setTimer((prev) => Math.round((prev + 0.1) * 10) / 10),
      100
    );
    setIntervalId(id);

    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (closed === side * side * generatedPlayground.length) {
      clearInterval(intervalId);
    }
  }, [closed, side, generatedPlayground.length, intervalId]);

  const screenHeight = window.innerHeight;
  const screenWidth = window.innerWidth;

  const timerHeight = 60;
  const playgroundSize = Math.min(screenWidth, screenHeight - timerHeight);

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${side}, 1fr)`,
    gridTemplateRows: `repeat(${side}, 1fr)`,
    gap: "10px",
    width: `${playgroundSize}px`,
    height: `${playgroundSize}px`,
  };

  var [incorrectCount, setIncorrectCount] = useState(0);
  var [correctCount, setCorrectCount] = useState(0);
  var [currentScore, setCurrentScore] = useState(0);

  var [selected, setIsSelected] = useState(null);
  var [pairFound, setPairFound] = useState(null);
  var [error, setError] = useState(null);
  var [accepted, setAccepted] = useState(null);
  var [closed, setClosed] = useState(0);
  const [positions, setPositions] = useState(
    Array(side * side).fill(generatedPlayground.length - 1)
  );
  const [shownItems, setShownItems] = useState(Array(side * side).fill(true));

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <div className="timer">
        <h2 className="time">{timer.toFixed(1)}</h2>
      </div>

      <div className="playground-container" style={gridStyle}>
        {Array.from({ length: side * side }).map((_, index) => (
          <div
            key={index}
            onClick={() => {
              if (pairFound != null || !shownItems[index]) {
                return;
              }
              if (index === selected) {
                setIsSelected(null);
              } else if (selected != null) {
                const current =
                  generatedPlayground[positions[index]][
                    Math.floor(index / side)
                  ][index % side];
                const selected2 =
                  generatedPlayground[positions[selected]][
                    Math.floor(selected / side)
                  ][selected % side];

                if (current === selected2) {
                  setCorrectCount(correctCount + 1);
                  setAccepted(index);
                  setPairFound(true);
                  setTimeout(() => {
                    setPositions((prev) => {
                      const updated = [...prev];
                      if (updated[index] > 0) {
                        updated[index]--;
                      } else {
                        setShownItems((prev) => {
                          const updated = [...prev];
                          updated[index] = false;
                          return updated;
                        });
                      }
                      if (updated[selected] > 0) {
                        updated[selected]--;
                      } else {
                        setShownItems((prev) => {
                          const updated = [...prev];
                          updated[selected] = false;
                          return updated;
                        });
                      }
                      return updated;
                    });
                    setClosed(closed + 2);
                    setPairFound(null);
                    setIsSelected(null);
                    setAccepted(null);
                    setError(null);
                    if (
                      closed ===
                      side * side * generatedPlayground.length - 2
                    ) {
                      onFinish(timer);
                    }
                  }, 300);
                } else {
                  setIncorrectCount(incorrectCount + 1);
                  setError(index);
                  setTimeout(() => {
                    setAccepted(null);
                    setError(null);
                  }, 300);
                }
              } else {
                setIsSelected(index);
              }
              setCurrentScore(calculateScore(correctCount, incorrectCount));
            }}
          >
            <CardView
              card={
                cards[
                  generatedPlayground[positions[index]][
                    Math.floor(index / side)
                  ][index % side]
                ]
              }
              isSelected={selected === index}
              isError={error === index}
              isAccepted={accepted === index}
              showItem={shownItems[index]}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
