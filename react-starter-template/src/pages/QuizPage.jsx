import React, { useState, useEffect, useRef } from 'react';
import './Quiz.css';

// Helper functions to generate questions
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getOperation = () => ['+', '-', '*', '/'][getRandomInt(0, 3)];
const getOptions = (correctAnswer) => {
  const options = new Set([correctAnswer]);
  while (options.size < 4) {
    const randomOption = getRandomInt(Number(correctAnswer) - 10, Number(correctAnswer) + 10);
    if (randomOption.toString() !== correctAnswer) {
      options.add(randomOption.toString());
    }
  }
  return Array.from(options).sort(() => Math.random() - 0.5);
};

const createQuestion = () => {
  const num1 = getRandomInt(0, 9);
  const num2 = getRandomInt(0, 9);
  const operation = getOperation();
  let correctAnswer;

  switch (operation) {
    case '+': correctAnswer = num1 + num2; break;
    case '-': correctAnswer = num1 - num2; break;
    case '*': correctAnswer = num1 * num2; break;
    case '/': correctAnswer = num2 !== 0 ? (num1 / num2).toFixed(2) : num1; break;
    default: correctAnswer = num1 + num2;
  }

  return {
    num1: num1.toString(),       
    num2: num2.toString(),     
    operation,
    correctAnswer: correctAnswer.toString(), 
    options: getOptions(correctAnswer.toString())
  };
};

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const timerRef = useRef(null);

  // Start timer for each question
  useEffect(() => {
    if (isQuizStarted && currentQuestionIndex < 10) {
      startTimer();
    }
  }, [currentQuestionIndex, isQuizStarted]);

  // Timer handling
  const startTimer = () => {
    clearInterval(timerRef.current);
    setTimeLeft(30);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev === 1) {
          clearInterval(timerRef.current);
          handleNext();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Generate next question when quiz starts or when time runs out
  useEffect(() => {
    if (isQuizStarted && currentQuestionIndex < 10) {
      if (questions.length < 10) {
        generateQuestion();
      }
    }
  }, [isQuizStarted, currentQuestionIndex]);

  const generateQuestion = () => {
    const newQuestion = createQuestion();
    setQuestions(prev => [...prev, newQuestion]);
    setAnswers(prev => [...prev, null]);
  };

  const handleOptionChange = (option) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = option;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < 9) { 
      setCurrentQuestionIndex(prev => prev + 1);
      setTimeLeft(30);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = (e) => {
    e && e.preventDefault();
    clearInterval(timerRef.current);

    // Calculate results
    const correctAnswers = questions.map(q => q.correctAnswer);
    const userAnswers = answers;

    const correct = userAnswers.filter((ans, index) => ans === correctAnswers[index]).length;
    const wrong = userAnswers.filter((ans, index) => ans != null && ans !== correctAnswers[index]).length;
    const notAnswered = userAnswers.filter(ans => ans == null).length;

    setResult({
      correct,
      wrong,
      notAnswered,
      questions: questions.map((
        question,
        index
      ) => ({
        ...question,
        userAnswer: answers[index]
      }))
    });
  };

  const startQuiz = () => {
    setIsQuizStarted(true);
    generateQuestion();
  };

  return (
    <div className="quiz-container">
      {!isQuizStarted ? (
        <>
          <h2>Are You Ready For the Quiz?</h2>
          <button onClick={startQuiz} className="start-button">Start Quiz</button>
        </>
      ) : (
        <>
          <h2>Quiz</h2>
          {currentQuestionIndex < 10 && result === null && ( // Do not display last question if results are being shown
            <form onSubmit={handleSubmit}>
              <div key={currentQuestionIndex} >
                <div className="question-statement d-flex" style={{alignItems: 'center', gap:"15px" ,padding:"20px"}}>
                <strong style={{fontSize:"18px"}}>Question {currentQuestionIndex + 1}:</strong>
                <div className="question-fields">
                  <input
                    type="text"
                    value={questions[currentQuestionIndex]?.num1}
                    readOnly
                    className="question-field"
                  />
                  <input
                    type="text"
                    value={questions[currentQuestionIndex]?.operation}
                    readOnly
                    className="question-field"
                  />
                  <input
                    type="text"
                    value={questions[currentQuestionIndex]?.num2}
                    readOnly
                    className="question-field"
                  />
                </div>
                </div>
                
                {questions[currentQuestionIndex]?.options.map(option => (
                  <label key={option} className={`option ${answers[currentQuestionIndex] === option
                    ? (option === questions[currentQuestionIndex].correctAnswer ? 'selected-correct' : 'selected-incorrect')
                    : ''}`}>
                    <input
                      type="radio"
                      name={`question-${currentQuestionIndex}`}
                      value={option}
                      checked={answers[currentQuestionIndex] === option}
                      onChange={() => handleOptionChange(option)}
                    />
                    {option}
                  </label>
                ))}
              </div>
              <div className="timer">Time left: {timeLeft} seconds</div>
              <button type="button" onClick={handleNext}>
                {currentQuestionIndex === 9 ? 'Submit' : 'Next'}
              </button>
            </form>
          )}
        </>
      )}
      {result && (
        <div className="results">
          <h2>Results</h2>
          <p>Correct: <span className="correct">{result.correct}</span></p>
          <p>Wrong: <span className="incorrect">{result.wrong}</span></p>
          <p>Not Answered: <span className="not-answered">{result.notAnswered}</span></p>
          <h3>Review Your Answers:</h3>
          <ul>
            {result.questions.map((question, index) => (
              <li key={index}>
                <p>Question {index + 1}: {question.num1} {question.operation} {question.num2}</p>
                <ul>
                  {question.options.map(option => (
                    <li key={option} className={`option ${option === question.correctAnswer
                      ? 'correct-answer'
                      : (option === question.userAnswer ? 'user-answer' : '')}`}>
                      {option}
                    </li>
                  ))}
                </ul>
                <p>Your Answer: {question.userAnswer || "Not answered"}</p>
                {question.userAnswer !== question.correctAnswer && (
                  <p>Correct Answer: {question.correctAnswer}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Quiz;
