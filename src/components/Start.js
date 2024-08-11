import React from "react";

const Start = ({ onQuizStart }) => {
  return (
    <div className="card" style={{ backgroundColor: "#F1F1F2" }}>
      <div className="card-content">
        <div className="content">
          <h1 style={{ color: "red" }}>Start the quiz</h1>
          <p>Good luck!</p>
          <button className="button is-info is-medium" onClick={onQuizStart}>
            Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default Start;
