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

export function updateMaxScore(score) {
  const currentMaxScore = getMaxScore();
  if (score > currentMaxScore) {
    localStorage.setItem("maxScore", score);
  }
}

export function getMaxScore() {
  return parseInt(localStorage.getItem("maxScore")) || 0;
}
