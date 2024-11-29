export function calculateScore(correctAnswers, wrongAnswers) {
  const pointsForCorrect = 10;
  const pointsForWrong = -5;

  let totalScore =
    correctAnswers * pointsForCorrect + wrongAnswers * pointsForWrong;

  if (correctAnswers > 5) {
    totalScore += 20;
  }

  return totalScore;
}

export function updateMinScore(score) {
  const currentMinScore = getMinScore();
  if (currentMinScore === null || score < currentMinScore) {
    localStorage.setItem("minScore", score.toString());
  }
}

export function getMinScore() {
  const storedScore = localStorage.getItem("minScore");
  return storedScore !== null ? parseFloat(storedScore) : null;
}
