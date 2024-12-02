import React, { useState } from "react";

const Input = (props) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const id = props.id;

  return (
    <>
      <label 
        className={`form-label ${isFocused ? "transformed" : ""}`}
        htmlFor={id}
      >
       {props.label}
      </label>

      <input {...props} onFocus={handleFocus}/>
    </>
  );
};

export default Input;
