const { Quiz } = require('./quiz');

const sampleQuestions = [
  {
    text: 'What is the capital of Italy?',
    options: ['Milan', 'Rome', 'Florence', 'Naples'],
    correctIndex: 1,
  },
  {
    text: 'What is 2 + 2?',
    options: ['3', '4', '5', '6'],
    correctIndex: 1,
  },
  {
    text: 'Which planet is closest to the Sun?',
    options: ['Venus', 'Earth', 'Mercury', 'Mars'],
    correctIndex: 2,
  },
];

describe('Quiz', () => {
  let quiz;

  beforeEach(() => {
    quiz = new Quiz([...sampleQuestions]);
  });

  test('should start at the first question', () => {
    expect(quiz.getCurrentQuestion()).toEqual(sampleQuestions[0]);
  });

  test('should advance to the next question after answering', () => {
    quiz.answerQuestion(1);
    expect(quiz.getCurrentQuestion()).toEqual(sampleQuestions[1]);
  });

  test('should increment score on correct answer', () => {
    quiz.answerQuestion(sampleQuestions[0].correctIndex);
    expect(quiz.getScore().score).toBe(1);
  });

  test('should not increment score on wrong answer', () => {
    quiz.answerQuestion(0);
    expect(quiz.getScore().score).toBe(0);
  });

  test('should report finished when all questions are answered', () => {
    sampleQuestions.forEach((q) => quiz.answerQuestion(q.correctIndex));
    expect(quiz.isFinished()).toBe(true);
  });

  test('should not be finished at start', () => {
    expect(quiz.isFinished()).toBe(false);
  });

  test('should calculate score percentage correctly', () => {
    quiz.answerQuestion(sampleQuestions[0].correctIndex); // correct
    quiz.answerQuestion(0); // wrong
    quiz.answerQuestion(sampleQuestions[2].correctIndex); // correct
    expect(quiz.getScore()).toEqual({ score: 2, total: 3, percentage: 67 });
  });

  test('should return null when no questions remain', () => {
    sampleQuestions.forEach((q) => quiz.answerQuestion(q.correctIndex));
    expect(quiz.getCurrentQuestion()).toBeNull();
  });

  test('should reset the quiz state', () => {
    quiz.answerQuestion(sampleQuestions[0].correctIndex);
    quiz.reset();
    expect(quiz.getCurrentQuestion()).toEqual(sampleQuestions[0]);
    expect(quiz.getScore().score).toBe(0);
  });

  test('should handle an empty quiz gracefully', () => {
    const emptyQuiz = new Quiz([]);
    expect(emptyQuiz.isFinished()).toBe(true);
    expect(emptyQuiz.getCurrentQuestion()).toBeNull();
    expect(emptyQuiz.getScore()).toEqual({ score: 0, total: 0, percentage: 0 });
  });
});
