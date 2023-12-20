import { useState, useEffect, useRef } from "react";

import Question from "./Question";
import Score from "./Score.jsx";
import "./Question.css";

const endpoint = "http://localhost:3000/quizzes";

function Quiz({ user_id, questions }) {
  const [score, setScore] = useState(0);
  const [ended, setEnded] = useState(false);
  const quizObject = useRef(null);

  const firstRenderTimestamp = useRef(null);
  const functionCallTimestamp = useRef(null);

  const getRandomQuestion = (arr) => {
    const randomIndex = Math.floor(Math.random() * arr.length);
    const randomQuestion = arr.splice(randomIndex, 1)[0];
    return randomQuestion;
  };

  useEffect(() => {
    if (!firstRenderTimestamp.current) {
      firstRenderTimestamp.current = new Date(Date.now());
    }
  }, []);

  const question = getRandomQuestion(questions);

  const handleAnswer = (correct) => {
    if (correct === 1) {
      setScore((score) => score + 1);
    } else {
      setScore((score) => score + 0.00001);
      // :))) for re-rendering purposes
    }
    if (questions.length === 0) {
      functionCallTimestamp.current = new Date(Date.now());
      setEnded(true);
      handleFinish();
    }
  };

  async function handleFinish() {
    try {
      const duration = Math.abs(functionCallTimestamp.current - firstRenderTimestamp.current);
      const hoursDifference = Math.floor(
        (duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutesDifference = Math.floor(
        (duration % (1000 * 60 * 60)) / (1000 * 60)
      );
      const secondsDifference = Math.floor((duration % (1000 * 60)) / 1000);

      quizObject.current = {
        user_id: user_id,
        score: Math.floor(score),
        startedAt: firstRenderTimestamp.current,
        finishedAt: functionCallTimestamp.current,
        duration: `${hoursDifference} hours, ${minutesDifference} minutes and ${secondsDifference} seconds`,
      };
      await fetch(`${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quizObject.current),
      });
    } catch (error) {
      console.error(error);
    }
  }

  return ended ? (
    <Score score={score} user_id={user_id} />
  ) : (
    <>
      <div
        className=" w-full
    h-screen
    bg-gradient-to-r
    from-background
    via-question-back
    to-buttons-back-color
    background-animate-long
    pt-10"
      >
        <h1 className="floating">Quiz App</h1>
        <Question
          index={20 - questions.length}
          question={question}
          onOptionSelect={handleAnswer}
        ></Question>
      </div>
    </>
  );
}

export default Quiz;
