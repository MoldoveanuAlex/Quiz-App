import { useState, useEffect, useRef } from "react";
function History({ user_id }) {
  const endpoint = "https://fxlqdtxk-3000.euw.devtunnels.ms/quizzes";
  const [elements, setElemets] = useState(<></>);

  const response = useRef(null);

  const getQuizzes = async (user_id) => {
    try {
      const response = await fetch(`${endpoint}/?user_id=${user_id}`, {
        headers: { "Access-Control-Allow-Origin": "*" },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  };

  async function handleDisplay() {
    response.current = await getQuizzes(user_id);
    console.log(response.current);
    if (response.current.length != 0) {
      setElemets(
        <>
          <br></br>
          <h2 className="truncate mx-auto rounded-tr-3xl rounded-br-lg text-center text-2xl text-white">
            Previous Quiz Results
          </h2>
          <br></br>
          <div
            className="overflow-auto  max-h-80 no-scrollbar"
            // className="relative max-h-md overflow-scroll max-h-auto"
          >
            <ul className="text-white list-disc list-inside text-xl">
              {response.current.map((result) => (
                <li key={result.id}>
                  <div>Score: {result.score}</div>
                  <div>
                    Started At:{" "}
                    {new Date(result.startedAt).toLocaleDateString(
                      "en-GB",
                      options
                    )}
                  </div>
                  <div>Completed in: {result.duration}</div>
                </li>
              ))}
            </ul>
          </div>
        </>
      );
    } else
      setElemets(
        <div>
          <br></br>
          <div className="truncate mx-auto rounded-tr-3xl rounded-br-lg text-center text-2xl text-white">
            No history
          </div>
        </div>
      );
  }

  useEffect(() => {
    handleDisplay();
  }, [response]);
  //   handleDisplay()

  return (
    <>
      <div>{elements}</div>
    </>
  );
}
export default History;
