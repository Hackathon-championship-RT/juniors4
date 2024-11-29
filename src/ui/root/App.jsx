import "./App.css";
import { generatePlacement } from "../../domain/generator";
import PlaygroundView from "../views/PlaygroundView/PlaygroundView";

export default function App() {
  const generatedPlayground = generatePlacement(2);
  console.log(generatedPlayground);

  return (
    <>
      <PlaygroundView generatedPlayground={generatedPlayground} />
    </>
  );
}
