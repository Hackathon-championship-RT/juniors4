import "./App.css";
import { generatePlacement } from "../../domain/generator";
import { updateMinScore } from "../../domain/calculate";
import MenuView from "../views/MenuView/MenuView";
import PlaygroundView from "../views/PlaygroundView/PlaygroundView";
import FinishView from "../views/finishView/FinishView";
import { useEffect, useState } from "react";

export default function App() {
  const [difficulty, setDifficulty] = useState(2);

  const [finalScore, setFinalScore] = useState(0);

  const [stage, setStage] = useState(0);
  const [generatedPlayground, setGneratedPlayground] = useState(
    generatePlacement(difficulty * 2)
  );

  return (
    <>
      {stage === 0 ? (
        <MenuView
          onDifficultyChange={(value) => setDifficulty(value)}
          onStart={() => {
            setGneratedPlayground(generatePlacement(difficulty * 2));
            setStage(1);
          }}
        />
      ) : stage === 1 ? (
        <PlaygroundView
          generatedPlayground={generatedPlayground}
          onFinish={(score) => {
            updateMinScore(score, difficulty);
            setFinalScore(score);
            setStage(2);
          }}
          onGeneratedPlaydoundUpdate={(it) => {
            setGneratedPlayground(it);
          }}
        />
      ) : (
        <FinishView
          score={finalScore}
          restart={() => {
            setGneratedPlayground(generatePlacement(difficulty * 2));
            setStage(1);
          }}
          openMenu={() => {
            setStage(0);
          }}
          level={difficulty}
        />
      )}
    </>
  );
}
