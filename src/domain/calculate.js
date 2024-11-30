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

export function updateMinScore(score, level) {
  const currentMinScore = getMinScore(level);
  if (currentMinScore === null || score < currentMinScore) {
    localStorage.setItem("minScore" + level, score.toString());
  }
}

export function getMinScore(level) {
  const storedScore = localStorage.getItem("minScore" + level);
  return storedScore !== null ? parseFloat(storedScore) : null;
}
