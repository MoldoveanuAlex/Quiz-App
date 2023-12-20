import { useState } from "react";
import "./Question.css";

function Question({ index, question, onOptionSelect }) {
  const text = question.question;
  const options = question.options;

  const handleClick = (option) => {
    if (option === question.answer) {
      onOptionSelect(1);
    } else {
      onOptionSelect(0);
    }
  };

  function shuffleOptions(obj) {
    const keys = Object.keys(obj);
    const shuffledKeys = shuffleArray(keys); // Shuffling the keys

    const shuffledObject = {};
    shuffledKeys.forEach((key, index) => {
      shuffledObject[key] = obj[keys[index]]; // Assigning shuffled keys with original values
    });

    return shuffledObject;
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const shuffledOptions = shuffleOptions(options);

  return (
    <>
      <div className="pt-18" >
        <div className="truncate mx-auto rounded-tr-3xl rounded-br-lg text-center text-3xl text-white">
          <div className="text-4xl">Question {index} </div>
          <br></br>
          <div className="whitespace-normal text-5xl truncate">{text}</div>
          <br></br>
        </div>
        <br></br>
        <div className="mx-auto grid grid-cols-2 gap-4 left-mb-10 text-ceter" >
          {Object.keys(shuffledOptions).map((option) => (
            <button
              className="text-5xl px-20 mb-10  text-yellow-400 hover:text-white border border-yellow-400 hover:border-blue-800 hover:bg-blue-800  rounded-lg px-5 py-2.5 text-center me-2 mb-2 "
              key={option}
              onClick={() => handleClick(option)}
            >
              {options[option]}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
export default Question;
