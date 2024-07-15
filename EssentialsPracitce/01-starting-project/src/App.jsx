import { useState } from "react";
import Header from "./components/Header";
import Result from "./components/Result";
import UserInput from "./components/User";

function App() {

  const [userInput, setUserInput] = useState({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10,
  });

  function handleChange(inputIdentifier, newValue) {
    setUserInput((prevUserInput) => {
      return {
        ...prevUserInput,
        // [inputIdentifier]: Number(newValue),
        [inputIdentifier]: +newValue,
      };
    });
  };

  const inputIsValid = userInput.duration >= 1;

  return (
    <>
      <Header />
      <UserInput userInput ={userInput} handleChange={handleChange} />
      {!inputIsValid && <p className="center">Please enter a duration than 0</p>}
      {inputIsValid && <Result userInput ={userInput} />}
    </>
  );
}

export default App;
