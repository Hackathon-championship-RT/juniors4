import "./PlaygroundView.css";
import CardView from "../CardView/CardView";
import cards from "../../../../public/config/cards_config.json";
import { calculateScore } from "../../../domain/calculate";
import { useState } from "react";

export default function PlaygroundView({ generatedPlayground, onFinish }) {
  console.log(generatedPlayground);
  const [side, setSide] = useState(generatedPlayground.length);

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
  var [error, setError] = useState(null);
  var [accepted, setAccepted] = useState(null);
  var [closed, setClosed] = useState(0);
  const [shownItems, setShownItems] = useState(Array(side * side).fill(true));

  return (
    <>
      <div className="playground-container" style={gridStyle}>
        {Array.from({ length: side * side }).map((_, index) => (
          <div
            onClick={() => {
              if (index == selected) {
                setIsSelected(null);
              } else if (selected != null) {
                const current =
                  generatedPlayground[Math.floor(index / side)][index % side];
                const selected2 =
                  generatedPlayground[Math.floor(selected / side)][
                    selected % side
                  ];

                if (current == selected2) {
                  setCorrectCount(correctCount + 1);
                  setAccepted(index);
                  setTimeout(() => {
                    setShownItems((prev) => {
                      const updated = [...prev];
                      updated[index] = false;
                      updated[selected] = false;
                      return updated;
                    });
                    setClosed(closed + 2);
                    setIsSelected(null);
                    setAccepted(null);
                    setError(null);
                    console.log(closed);
                    if (closed == side * side - 2) {
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
            <CardView
              key={index}
              card={
                cards[
                  generatedPlayground[Math.floor(index / side)][index % side]
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
