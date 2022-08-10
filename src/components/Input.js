import { useState } from "react";
import { getHash, getStatus } from "../services/api/hash";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/input.css";
import axios from "axios";

function Input() {
  const [hexValue, setHexValue] = useState("");
  const [error, setError] = useState("");
  const [statusValue, setStatusValue] = useState("");
  const [statusError, setStatusError] = useState("");

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

  const validateStatusInput = () => {
    const input = statusValue;
    const hexaPattern = /^[0-9a-fA-F]+$/;

    if (input === "") {
      setStatusError("Input field cannot be empty");
      return false;
    } else if (!input.match(hexaPattern)) {
      setStatusError("Input value should be in hexadecimal form");
      return false;
    } else {
      setStatusError("");
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

  const handleStatusValue = (event) => {
    const { value } = event.target;

    setStatusValue(value);
    setStatusError("");
  };

  const handleSubmit = async (event) => {
    const { data } = await getIpaddress();
    let ipAddress = data.ip;

    const isValidInput = validateInput();

    if (isValidInput) {
      try {
        const hexadecimal = await getHash(hexValue, ipAddress);
        if (hexadecimal && hexadecimal?.success) {
          toast.success("Successfully submitted", { position: "top-center" });
        }
      } catch (error) {
        if (error?.message === "Request failed with status code 401") {
          toast.error("Request with same IP has already processed", {
            position: "top-center",
          });
        } else toast.error("Something went wrong", { position: "top-center" });
      }
    }
  };

  const statusHandler = async () => {
    const isValidInput = validateStatusInput();
    const hex = statusValue;
    console.log(hex);

    if (isValidInput) {
      const hexPost = await getStatus(hex);
      console.log("hexPost", hexPost);
    }
  };
  return (
    <div>
      <div className="mt-[48px] mb-[80px]">
        <form
          autoComplete="off"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <div id="container">
            <label>
              <div className="font-[600] text-[20px]" id="inputLabel">
                Enter hexadecimal value here:
              </div>
              <input
                className="md:w-[350px] h-[40px] rounded-lg px-[16px] mt-[32px]"
                type="text"
                value={hexValue}
                placeholder="Enter value here..."
                onChange={(e) => {
                  handleChange(e);
                }}
                id="input"
              />
            </label>
            {error ? (
              <div id="showError">
                <small className="text-red-500">{error}</small>
              </div>
            ) : null}
            <div>
              <button
                className="py-2 w-[160px] bg-[#2F2DB3] font-[500] text-[16px] text-[#FFFFFF] mt-[24px] rounded-full"
                type="submit"
                value="Submit"
                id="submitBtn"
                onClick={() => {
                  handleSubmit();
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="mt-[80px] mb-[48px]" id="statusDiv">
        <label className="font-[600] text-[20px]">
          Wanna know the status of your request?
        </label>
        <br />
        <label className="text-[#4A4A4A] text-[16px]">
          Enter your request hexadecimal number below
        </label>

        <div>
          <input
            className="md:w-[350px] h-[40px] rounded-lg px-[16px] mt-[32px]"
            type="text"
            autoComplete="off"
            value={statusValue}
            placeholder="Enter value here..."
            onChange={(e) => {
              handleStatusValue(e);
            }}
            id="statusInput"
          />
        </div>

        <div id="statusErrContainer">
          <small className="text-red-500" id="statusError">
            {statusError}
          </small>
        </div>
        <button
          className="py-2 w-[160px] bg-[#090417] font-[500] text-[16px] text-[#FFFFFF] mt-[24px] rounded-full"
          id="checkStatus"
          onClick={() => {
            statusHandler();
          }}
        >
          Check Status
        </button>
      </div>
    </div>
  );
}

export default Input;
