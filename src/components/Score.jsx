import History from "./History";
import "./Question.css";

function Score({ score, user_id }) {
  return (
    <>
    <div className=" w-full
    h-screen
    bg-gradient-to-r
    from-background
    via-question-back
    to-yellow-400
    background-animate-long
    pt-10">
      <div >
        <div className="truncate mx-auto rounded-tr-3xl rounded-br-lg text-center text-3xl text-white">Your score is:</div>
        <div className="floating" > {Math.floor(score)} points</div>
      </div>
      <div className="text-center overflow-hidden">
        <History user_id={user_id}></History>
      </div>
      </div>
    </>
  );
}

export default Score;
