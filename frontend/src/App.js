import React, { useState } from "react";
import "./App.css";

function App() {
  const [teams, setTeams] = useState("");
  const [matches, setMatches] = useState("");
  const [grpARanking, setGrpARanking] = useState([]);
  const [grpBRanking, setGrpBRanking] = useState([]);
  const [hasRanking, setHasRanking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsProcessing(true);

    const tokenizedTeams = teams.trim().split("\n");
    const tokenizedMatches = matches.trim().split("\n");

    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rawTeams: tokenizedTeams,
        rawMatches: tokenizedMatches,
      }),
    };

    fetch("/teamRanking", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        setIsProcessing(false);
        setGrpARanking(data.groupARanking);
        setGrpBRanking(data.groupBRanking);
        setHasRanking(true);
      });
  };

  const reset = (event) => {
    event.preventDefault();
    setHasRanking(false);
    setTeams("");
    setMatches("");
  };

  return (
    <div className="wrapper">
      <h1>We are the Champions</h1>
      {isProcessing && <div>App is processing rankings</div>}
      {!isProcessing && hasRanking && (
        <div>
          Here are the rankings in order!
          <div>
            <p>Group A Ranking</p>
            <ul>
              {grpARanking.map((teamName, index) => (
                <li key={index + 1}>
                  <strong>{index + 1}</strong>: {teamName}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p>Group B Ranking</p>
            <ul>
              {grpBRanking.map((teamName, index) => (
                <li key={index + 1}>
                  <strong>{index + 1}</strong>: {teamName}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <form>
        <fieldset disabled={isProcessing}>
          <label>
            <p>Teams</p>
            <textarea
              value={teams || ""}
              onChange={(event) => {
                setTeams(event.target.value);
              }}
            />
          </label>
        </fieldset>
        <fieldset disabled={isProcessing}>
          <label>
            <p>Matches</p>
            <textarea
              value={matches || ""}
              onChange={(event) => {
                setMatches(event.target.value);
              }}
            />
          </label>
        </fieldset>
        <button type="submit" disabled={isProcessing} onClick={handleSubmit}>
          Submit
        </button>
        <button disabled={isProcessing} onClick={reset}>
          Reset
        </button>
      </form>
    </div>
  );
}

export default App;
