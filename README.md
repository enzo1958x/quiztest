# quiztest

A simple quiz application with a JavaScript test environment using [Jest](https://jestjs.io/).

## Setup

```bash
npm install
```

## Run Tests

```bash
npm test
```

## Project Structure

```
quiztest/
├── src/
│   ├── quiz.js         # Quiz application core logic
│   └── quiz.test.js    # Jest test suite
├── package.json
└── README.md
```

## Quiz API

```js
const { Quiz } = require('./src/quiz');

const questions = [
  {
    text: 'What is the capital of Italy?',
    options: ['Milan', 'Rome', 'Florence', 'Naples'],
    correctIndex: 1,
  },
];

const quiz = new Quiz(questions);

quiz.answerQuestion(1);   // returns true (correct)
quiz.getScore();          // { score: 1, total: 1, percentage: 100 }
quiz.isFinished();        // true
quiz.reset();             // restart the quiz
```