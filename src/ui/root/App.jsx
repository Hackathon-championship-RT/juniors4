import "./App.css";
import CardView from "../views/CardView/CardView";
import cards from "../../../public/config/cards_config.json";
import { useState } from "react";
import { generatePlacement } from "../../domain/generator";

function App() {
  const [side, setSide] = useState(4);
  const generatedPlayground = generatePlacement(side);

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${side}, 1fr)`,
    gridTemplateRows: `repeat(${side}, 1fr)`,
    gap: "10px",
  };

  return (
    <>
      <div className="playground-container" style={gridStyle}>
        {Array.from({ length: side * side }).map((_, index) => (
          <CardView
            key={index}
            card={
              cards[generatedPlayground[Math.floor(index / side)][index % side]]
            }
          />
        ))}
      </div>
    </>
  );
}

export default App;
