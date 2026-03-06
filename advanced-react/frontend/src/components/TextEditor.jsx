import React, { useEffect, useRef, useState } from "react";

const TextEditor = () => {
  const [text, setText] = useState("");
  const [lastSavedTime, setLastSavedTime] = useState("");
  const textareaRef = useRef(null);
  const intervalRef = useRef(null);
  const prevTextRef = useRef("");
  const latestTextRef = useRef(text);
  const charCountRef = useRef(0);

  const focusEditor = () => textareaRef.current.focus();
  const hasChanged = text !== prevTextRef.current;

  const handleChange = (event) => {
    const value = event.target.value;
    charCountRef.current = value.length;
    setText(value);
  };

  useEffect(() => {
    latestTextRef.current = text;
  }, [text]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      localStorage.setItem("autosave", latestTextRef.current);

      prevTextRef.current = latestTextRef.current;

      const now = new Date().toLocaleTimeString();
      setLastSavedTime(now);
    }, 5000);

    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <>
      <h2>Text Editor</h2>
      <textarea
        rows={5}
        cols={30}
        value={text}
        ref={textareaRef}
        onChange={handleChange}
        placeholder="Enter your feedback..."
      ></textarea>
      <br />
      <button type="button" onClick={focusEditor} style={{ marginTop: "5px" }}>
        Focus
      </button>
      <button
        type="button"
        onClick={() => {
          setText("");
          focusEditor();
        }}
        style={{ marginTop: "5px", marginLeft: "5px" }}
      >
        Clear
      </button>
      {hasChanged && (
        <p
          style={{
            color: "white",
            backgroundColor: "tomato",
            padding: "3px",
            maxWidth: "fit-content",
          }}
        >
          Content Changed
        </p>
      )}
      <p>Characters Count : {charCountRef.current}</p>
      <p>Previous Text: {prevTextRef.current}</p>
      <p>Last Saved At: {lastSavedTime}</p>
    </>
  );
};

export default TextEditor;
