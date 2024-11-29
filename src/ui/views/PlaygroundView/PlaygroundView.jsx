import "./PlaygroundView.css";
import CardView from "../CardView/CardView";
import cards from "../../../../public/config/cards_config.json";
import { useState } from "react";

export default function PlaygroundView({ generatedPlayground }) {
  const [side, setSide] = useState(generatedPlayground.length);
  console.log(generatedPlayground);

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${side}, 1fr)`,
    gridTemplateRows: `repeat(${side}, 1fr)`,
    gap: "10px",
  };

  var [selected, setIsSelected] = useState(null);
  var [error, setError] = useState(null);
  var [accepted, setAccepted] = useState(null);
  const [shownItems, setShownItems] = useState(
    Array(side * side).fill(true) // Изначально все элементы скрыты
  );

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
                  setAccepted(index);
                  setTimeout(() => {
                    setShownItems((prev) => {
                      const updated = [...prev];
                      updated[index] = false;
                      updated[selected] = false;
                      console.log(updated);
                      return updated;
                    });
                    setIsSelected(null);
                    setAccepted(null);
                    setError(null);
                  }, 300);
                } else {
                  setError(index);
                  setTimeout(() => {
                    setAccepted(null);
                    setError(null);
                  }, 300);
                }
              } else {
                setIsSelected(index);
              }
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
