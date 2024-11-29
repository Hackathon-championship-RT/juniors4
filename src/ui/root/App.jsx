import "./App.css";
import { generatePlacement } from "../../domain/generator";
import MenuView from "../views/MenuView/MenuView";
import PlaygroundView from "../views/PlaygroundView/PlaygroundView";
import { useState } from "react";

export default function App() {
  const [difficulty, setDifficulty] = useState(1);
  const [stage, setStage] = useState(0);
  const [generatedPlayground, setGneratedPlayground] = useState(
    generatePlacement(2)
  );

  return (
    <>
      {stage === 0 ? (
        <MenuView
          onDifficultyChange={(value) => setDifficulty(value)}
          onStart={() => {
            setGneratedPlayground(generatePlacement(2));
            setStage(1);
          }}
        />
      ) : (
        <PlaygroundView generatedPlayground={generatedPlayground} />
      )}
    </>
  );
}
