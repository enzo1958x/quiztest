/**
 * Quiz application core logic
 */

class Quiz {
  constructor(questions) {
    this.questions = questions;
    this.currentIndex = 0;
    this.score = 0;
    this.answers = [];
  }

  getCurrentQuestion() {
    return this.questions[this.currentIndex] || null;
  }

  answerQuestion(answerIndex) {
    const question = this.getCurrentQuestion();
    if (!question) return false;

    const isCorrect = answerIndex === question.correctIndex;
    this.answers.push({ question, answerIndex, isCorrect });
    if (isCorrect) this.score++;
    this.currentIndex++;
    return isCorrect;
  }

  isFinished() {
    return this.currentIndex >= this.questions.length;
  }

  getScore() {
    return {
      score: this.score,
      total: this.questions.length,
      percentage: this.questions.length > 0
        ? Math.round((this.score / this.questions.length) * 100)
        : 0,
    };
  }

  reset() {
    this.currentIndex = 0;
    this.score = 0;
    this.answers = [];
  }
}

module.exports = { Quiz };
