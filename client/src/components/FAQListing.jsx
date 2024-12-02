import { useState } from "react";

const FAQListing = ({ isOpen, onToggle, question, answer }) => {
  const rotationStyle = {
    transform: isOpen ? "rotate(45deg)" : "rotate(0deg)", // Conditionally apply the transform
  };

  return (
    <>
      <button onClick={onToggle} className="question">
        <p>{question}</p>

        <svg
          style={rotationStyle}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          role="img"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          data-icon="PlusStandard"
          aria-hidden="true"
          class="elj7tfr3 default-ltr-cache-jh13go-Icon-StyledAccordionIcon e164gv2o5"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M11 11V2H13V11H22V13H13V22H11V13H2V11H11Z"
            fill="currentColor"
          ></path>
        </svg>
      </button>
      {isOpen ? (
        <div className={"answer"}>
          {" "}
          <span>{answer}</span>{" "}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default FAQListing;
