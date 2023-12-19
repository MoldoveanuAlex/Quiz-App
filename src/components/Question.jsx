import { useState } from "react";

function Question({ question }) {
  const text = question.question;
  const options = question.options;

  const [answer, setAnswer] = useState("");
  

  const handleClick = (option) => {
    setAnswer(option);
    if (answer === question.answer) console.log("xddd");
  };


  return (
    <>
      <div>Question</div>
      <div>{text}</div>
      <br></br>
      <div>
        {Object.keys(options).map((option) => (
          <div>
            <button key={option} onClick={() => handleClick(option)}>
              {options[option]}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
export default Question;
