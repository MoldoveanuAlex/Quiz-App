import { useState } from "react";
import Quiz from "./components/Quiz";

function App() {
  const endpoint = "http://localhost:3000/";
  const [formData, setFormData] = useState({
    username: "",
  });
  const [started, setIsStarted] = useState(false);
  const [id, setId] = useState(null);
  const [questions, setQuestions] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${endpoint}users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      handleStart();
    } catch (error) {
      console.error(error);
    }
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
  }

  return started ? (
    <Quiz id={id} questions={questions} />
  ) : (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username</label>
      <br />
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
      />
      <button type="submit">WOW</button>
    </form>
  );
}

export default App;
