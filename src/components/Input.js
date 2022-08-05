import { useState } from "react";
import { getPosts } from "../services/api/posts";

function Input() {
  const [hexValue, setHexValue] = useState("");
  const [error, setError] = useState("");

  const validateInput = (input) => {
    const pattern = "[0-9a-fA-F]+";
    console.log("input", input);
    if (!input) {
      setError("Input field cannot be empty");
      return false;
    }
    // if (!input.match(pattern)) {
    //   setError("Input value is not an Hexadecimal Value");
    //   return false;
    // }
    return true;
  };

  const handleChange = (event) => {
    const { value } = event.target;
    console.log("value", value);
    setHexValue(value);
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValidInput = validateInput(hexValue);
    if (isValidInput) {
      console.log("api called");
      const posts = await getPosts();
      console.log("postData", posts);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          <div>Enter Hexadecimal Value Here:</div>
          <input type="text" value={hexValue} onChange={handleChange} />
        </label>
        {error ? <div> {error}</div> : null}
        <div>
          <input type="submit" value="Submit" />
        </div>
      </form>
    </>
  );
}

export default Input;
