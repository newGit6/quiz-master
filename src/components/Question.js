import React, { useState, useEffect, useRef } from "react";

const Question = ({
  data,
  onAnswerUpdate,
  numberOfQuestions,
  activeQuestion,
  onSetActiveQuestion,
  onSetStep,
}) => {
  const [selected, setSelected] = useState("");
  const [error, setError] = useState("");
  const radiosWrapper = useRef();

  useEffect(() => {
    const findCheckedInput =
      radiosWrapper.current.querySelector("input:checked");
    if (findCheckedInput) {
      findCheckedInput.checked = false;
    }
  }, [data]);

  const changeHandler = (e) => {
    setSelected(e.target.value);
    if (error) {
      setError("");
    }
  };

  const nextClickHandler = () => {
    if (selected === "") {
      return setError("Please select one option!");
    }
    onAnswerUpdate((prevState) => [
      ...prevState,
      { q: data.question, a: selected },
    ]);
    setSelected("");
    if (activeQuestion < numberOfQuestions - 1) {
      onSetActiveQuestion(activeQuestion + 1);
    } else {
      onSetStep(3); // Assuming onSetStep handles moving to the next step or finishing the quiz
    }
  };

  const previousClickHandler = () => {
    if (activeQuestion > 0) {
      onSetActiveQuestion(activeQuestion - 1);
    }
  };

  return (
    <div className="card">
      <div className="card-content">
        <div className="content">
          <h2 className="mb-5">{data.question}</h2>
          <div className="control" ref={radiosWrapper}>
            {data.choices.map((choice, i) => (
              <label className="radio has-background-light" key={i}>
                <input
                  type="radio"
                  name="answer"
                  value={choice}
                  onChange={changeHandler}
                />
                {choice}
              </label>
            ))}
          </div>
          {error && <div className="has-text-danger">{error}</div>}
          <div className="mt-4">
            <button
              className="button is-link is-medium mr-2"
              onClick={previousClickHandler}
              disabled={activeQuestion === 0}
            >
              Previous
            </button>
            <button
              className="button is-link is-medium"
              onClick={nextClickHandler}
              disabled={selected === ""}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question;
