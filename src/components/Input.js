import { useState } from "react";
import { getHash } from "../services/api/hash";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/input.css";
import axios from "axios";

function Input() {
  const [hexValue, setHexValue] = useState("");
  const [error, setError] = useState("");

  const validateInput = () => {
    const input = hexValue;
    const hexaPattern = /^[0-9a-fA-F]+$/;

    if (input === "") {
      setError("Input field cannot be empty");
      return false;
    } else if (!input.match(hexaPattern)) {
      setError("Input value should be in hexadecimal form");
      return false;
    } else {
      setError("");
      return true;
    }
  };

  const getIpaddress = () => {
    const ip = axios.get("https://api.ipify.org/?format=json");
    return ip;
  };

  const handleChange = (event) => {
    const { value } = event.target;

    setHexValue(value);
    setError("");
  };

  const handleSubmit = async (event) => {
    const { data } = await getIpaddress();
    let ipAddress = data.ip;

    const isValidInput = validateInput();

    if (isValidInput) {
      const posts = await getHash(hexValue, ipAddress);
      toast.success("Successfully submitted", { position: "top-center" });
      setHexValue("");
    }
  };

  const statusHandler = () => {
    console.log("Hello");
  };
  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <div id="container">
          <label>
            <div id="inputLabel">Enter Hexadecimal Value Here:</div>
            <input
              type="text"
              value={hexValue}
              onChange={(e) => {
                handleChange(e);
              }}
              id="input"
            />
          </label>
          {error ? (
            <div id="showError">
              <small>{error}</small>
            </div>
          ) : null}
          <div>
            <button
              type="submit"
              value="Submit"
              id="submitBtn"
              onClick={() => {
                handleSubmit();
              }}
            >
              submit
            </button>
          </div>
        </div>
      </form>

      <div id="statusDiv">
        <label>Wanna know your status?click here</label>

        <button
          id="checkStatus"
          onClick={() => {
            statusHandler();
          }}
        >
          Status
        </button>
      </div>
    </>
  );
}

export default Input;
