import { useState } from "react";
import Quiz from "./Quiz";
const endpoint = "https://quiz-app-db.onrender.com/";

function LoginQuiz() {
  const [formData, setFormData] = useState({
    username: "",
  });
  const [started, setIsStarted] = useState(false);
  const [questions, setQuestions] = useState(null);
  const [id, setId] = useState(0);
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    const enteredUserId = await getId(formData.username);

    if (enteredUserId == undefined) {
      try {
        await fetch(`${endpoint}users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(formData),
        });
      } catch (error) {
        console.error(error);
      }
    } else console.log("User already exists!");
    handleStart();
  };

  const getId = async (username) => {
    try {
      const response = await fetch(`${endpoint}users/?username=${username}`);
      const data = await response.json();
      return data[0].id;
    } catch (error) {
      console.log(error);
    }
  };

  const getQuestions = async () => {
    try {
      const response = await fetch(`${endpoint}questions`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  async function handleStart() {
    const userId = await getId(formData.username);
    const allQuestions = await getQuestions();
    setId(userId);
    setQuestions(allQuestions);
    setIsStarted(true);
    setIsLoading(false)
  }
  return started ? (
    <Quiz user_id={id} questions={questions} />
  ) : (
    <div
      className="w-full
      h-screen
      bg-gradient-to-r
      from-background
      via-question-back
      to-yellow-400
      background-animate
      pt-20"
    >
      <h1 className="floating">Quiz App</h1>
      <form
        onSubmit={handleSubmit}
        className=" bg-column-back p-10 w-1/2 m-auto mt-40 rounded-full flex flex-col gap-5"
      >
        <div className="relative h-10 w-full min-w-[200px]">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder=""
            className=" peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
          />
          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Username
          </label>
        </div>

        <button
          type="submit"
          className="text-2xl text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Start quiz!
        </button>
        {isLoading && <p className="text-center">Building your test...</p>}
      </form>
    </div>
  );
}
export default LoginQuiz;
