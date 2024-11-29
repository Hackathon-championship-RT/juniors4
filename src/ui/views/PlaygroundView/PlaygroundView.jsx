import "./PlaygroundView.css";
import CardView from "../CardView/CardView";
import cards from "../../../../public/config/cards_config.json";
import { calculateScore } from "../../../domain/calculate";
import { useState } from "react";

export default function PlaygroundView({ generatedPlayground, onFinish }) {
  console.log(generatedPlayground);
  const [side, setSide] = useState(generatedPlayground[0].length);

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${side}, 1fr)`,
    gridTemplateRows: `repeat(${side}, 1fr)`,
    gap: "10px",
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
    <>
      <div className="playground-container" style={gridStyle}>
        {Array.from({ length: side * side }).map((_, index) => (
          <div
            onClick={() => {
              if (pairFound != null) {
                return;
              }
              if (index == selected) {
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

                if (current == selected2) {
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
                    console.log(closed);
                    if (
                      closed ==
                      side * side * generatedPlayground.length - 2
                    ) {
                      onFinish(currentScore);
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
            {() => {
              console.log("pos " + positions[index]);
            }}
            <CardView
              key={index}
              card={
                cards[
                  generatedPlayground[positions[index]][
                    Math.floor(index / side)
                  ][index % side]
                ]
              }
              isSelected={selected == index}
              isError={error == index}
              isAccepted={accepted == index}
              showItem={shownItems[index]}
            />
          </div>
        ))}
      </div>
    </>
  );
}
