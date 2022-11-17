import { useState, useEffect } from "react";
import "./App.scss";

// Calculator Values
const calc = [
  { id: "clear", value: "AC" },
  { id: "divide", value: "/" },
  { id: "multiply", value: "x" },
  { id: "seven", value: 7 },
  { id: "eight", value: 8 },
  { id: "nine", value: 9 },
  { id: "subtract", value: "-" },
  { id: "four", value: 4 },
  { id: "five", value: 5 },
  { id: "six", value: 6 },
  { id: "add", value: "+" },
  { id: "one", value: 1 },
  { id: "two", value: 2 },
  { id: "three", value: 3 },
  { id: "equals", value: "=" },
  { id: "zero", value: 0 },
  { id: "decimal", value: "." },
];
const operators = ["AC", "/", "x", "+", "-", "="];
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

// Calculator Display
const Display = ({ input, output }) => (
  <div className="output">
    <span className="result">{output}</span>
    <span id="display" className="input">
      {input}
    </span>
  </div>
);

// Calculator Buttons
const Key = ({ keyData: { id, value }, handleInput }) => (
  <button id={id} onClick={() => handleInput(value)}>
    {value}
  </button>
);

// Calculator Keypad
const Keyboard = ({ handleInput }) => (
  <div className="keypad">
    {calc.map((key) => (
      <Key key={key.id} keyData={key} handleInput={handleInput} />
    ))}
  </div>
);

function App() {
  const [input, setInput] = useState("0");
  const [output, setOutput] = useState("");
  const [calcData, setCalcData] = useState("");

  // Calculator Output
  const handleOutput = () => {
    setOutput(calcData);
  };

  useEffect(() => {
    handleOutput();
  }, [calcData]);

  // Calculator Input
  const handleInput = (value) => {
    const number = numbers.find((num) => num === value);
    const operator = operators.find((op) => op === value);

    switch (value) {
      case "=":
        handleSubmit();
        break;
      case "AC":
        handleClear();
        break;
      case number:
        handleNumbers(value);
        break;
      case ".":
        dotOperator(value);
        break;
      case operator:
        handleOperators(value);
        break;
      default:
        break;
    }
  };

  // Submit Calculator Data
  const handleSubmit = () => {
    console.log({ calcData });

    const total = eval(calcData);
    setInput(total);
    setOutput(`${total} = ${total}`);
    setCalcData(`${total}`);
  };

  // Reset Calcultor
  const handleClear = () => {
    setInput("0");
    setCalcData("");
  };

  // Handle Numbers
  const handleNumbers = (value) => {
    if (!calcData.length) {
      setInput(`${value}`);
      setCalcData(`${value}`);
    } else {
      if (value === 0 && (calcData === "0" || input === "0")) {
        setCalcData(`${calcData}`);
      } else {
        const lastChat = calcData.charAt(calcData.length - 1);
        const isLastChatOperator =
          lastChat === "*" || operators.includes(lastChat);

        setInput(isLastChatOperator ? `${value}` : `${input}${value}`);
        setCalcData(`${calcData}${value}`);
      }
    }
  };

  // Handle Decimal
  const dotOperator = () => {
    const lastChat = calcData.charAt(calcData.length - 1);
    if (!calcData.length) {
      setInput("0.");
      setCalcData("0.");
    } else {
      if (lastChat === "*" || operators.includes(lastChat)) {
        setInput("0.");
        setCalcData(`${calcData} 0.`);
      } else {
        setInput(
          lastChat === "." || input.includes(".") ? `${input}` : `${input}.`
        );
        const formattedValue =
          lastChat === "." || input.includes(".")
            ? `${calcData}`
            : `${calcData}.`;
        setCalcData(formattedValue);
      }
    }
  };

  // Handle Operators
  const handleOperators = (value) => {
    if (calcData.length) {
      setInput(`${value}`);
      const beforeLastChat = calcData.charAt(calcData.length - 2);

      const beforeLastChatIsOperator =
        operators.includes(beforeLastChat) || beforeLastChat === "*";

      const lastChat = calcData.charAt(calcData.length - 1);

      const lastChatIsOperator =
        operators.includes(lastChat) || lastChat === "*";

      const validOp = value === "x" ? "*" : value;
      if (
        (lastChatIsOperator && value !== "-") ||
        (beforeLastChatIsOperator && lastChatIsOperator)
      ) {
        if (beforeLastChatIsOperator) {
          const updatedValue = `${calcData.substring(
            0,
            calcData.length - 2
          )}${value}`;
          setCalcData(updatedValue);
        } else {
          setCalcData(
            `${calcData.substring(0, calcData.length - 1)}${validOp}`
          );
        }
      } else {
        setCalcData(`${calcData}${validOp}`);
      }
    }
  };

  // function handleOperator(event) {
  //   const operator = event.target.innerHTML;
  //   setOutput(operator);
  //   setInput(input + " " + operator + " ");
  // }

  return (
    <div className="container">
      <div className="calculator">
        <Display input={input} output={output} />
        <Keyboard handleInput={handleInput} />
      </div>
    </div>
  );
}

export default App;
