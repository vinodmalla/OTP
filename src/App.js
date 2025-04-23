import "./styles.css";
import { useState, useEffect, useRef } from "react";

const OTP_SIZE = 7;

export default function App() {
  const [inputArr, setInputArr] = useState(new Array(OTP_SIZE).fill(""));
  const reff = useRef([]);
  function handleEnter(value, index) {
    if (isNaN(value)) return;
    const val = value.trim();
    const newArr = [...inputArr];
    newArr[index] = value.slice(-1);
    setInputArr(newArr);
    value && reff.current[index + 1]?.focus();
  }
  useEffect(() => {
    reff.current[0]?.focus();
  }, []);
  function handlekey(e, index) {
    if (!e.target.value && e.code === "Backspace") {
      reff.current[index - 1]?.focus();
    }
  }

  return (
    <div className="App">
      <h1>OTP Validation</h1>
      {inputArr.map((input, index) => {
        return (
          <input
            className="opt"
            key={index}
            value={inputArr[index]}
            type="text"
            ref={(input) => (reff.current[index] = input)}
            onChange={(e) => handleEnter(e.target.value, index)}
            onKeyDown={(e) => handlekey(e, index)}
          />
        );
      })}
    </div>
  );
}
