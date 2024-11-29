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
