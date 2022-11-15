import { useState } from "react";
import "./App.scss";

function App() {
  const [total, setTotal] = useState("0");

  function handleNumber(event) {
    const number = event.target.innerHTML;
    console.log(number);

    if (total === "0") {
      setTotal(number);
    } else {
      setTotal(total + number);
    }
  }

  function handleOperator(event) {
    const operator = event.target.innerHTML;
    setTotal(total + " " + operator + " ");
  }

  function handleDecimal() {
    const arr = total.split(" ");
    const lastElem = arr[arr.length - 1];
    if (!lastElem.includes(".") && typeof parseInt(lastElem) == "number") {
      setTotal(total + ".");
    }
  }

  function handleEqual() {
    setTotal(eval(total));
  }

  return (
    <div className="calculator">
      <div id="keypad">
        <div id="display" className="row">
          {total}
        </div>
        <button
          className="row"
          id="clear"
          onClick={() => {
            setTotal("0");
          }}
        >
          AC
        </button>
        <button id="seven" onClick={handleNumber}>
          7
        </button>
        <button id="eight" onClick={handleNumber}>
          8
        </button>
        <button id="nine" onClick={handleNumber}>
          9
        </button>
        <button id="multiply" onClick={handleOperator}>
          *
        </button>
        <button id="four" onClick={handleNumber}>
          4
        </button>
        <button id="five" onClick={handleNumber}>
          5
        </button>
        <button id="six" onClick={handleNumber}>
          6
        </button>
        <button id="divide" onClick={handleOperator}>
          /
        </button>
        <button id="one" onClick={handleNumber}>
          1
        </button>
        <button id="two" onClick={handleNumber}>
          2
        </button>
        <button id="three" onClick={handleNumber}>
          3
        </button>
        <button id="add" onClick={handleOperator}>
          +
        </button>
        <button id="zero" onClick={handleNumber}>
          0
        </button>
        <button id="decimal" onClick={handleDecimal}>
          .
        </button>
        <button id="equals" onClick={handleEqual}>
          =
        </button>
        <button id="subtract" onClick={handleOperator}>
          -
        </button>
      </div>
    </div>
  );
}

export default App;
