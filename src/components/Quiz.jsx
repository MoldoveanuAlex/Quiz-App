import { useState } from "react";
import Question from "./Question";
function Quiz({user_id, questions}) {
  const numberOfQuesitons = questions.length;
  
  const question = questions[1]

  const shuffleArray = (array) => {
    const shuffledArray = [...array]; 
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[i]];
    }
    return shuffledArray;
  };

  let shuffledQuestions = shuffleArray(questions)

  const date = new Date();
  const timestampString = date.toISOString();


  return (
    <>
      <div>Quiz</div>
      <br></br>
      <Question question={question}></Question>
    </>
  )
}

export default Quiz;