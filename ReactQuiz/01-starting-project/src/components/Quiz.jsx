import { useState } from "react";
import QUESTION from "../question.js";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  
  const activeQuestionIndex = userAnswers.length;
  const shuffledAnswers = [...QUESTION[activeQuestionIndex].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);
  const quizIsComplete = QUESTION === activeQuestionIndex;
  console.log(quizIsComplete, QUESTION, activeQuestionIndex);

  function handleSelectAnswer(selectedAnswer) {
    setUserAnswers((prevAnswers) => {
      return [...prevAnswers, selectedAnswer];
    });
  }

  return (
    <div id="quiz">
      <div id="question">
        <h2>{QUESTION[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {!quizIsComplete && shuffledAnswers.map((answer) => (
            <li key={answer} className="answer">
              <button onClick={() => handleSelectAnswer(answer)}>
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
