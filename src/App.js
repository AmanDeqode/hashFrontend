import "./App.css";
import Input from "./components/Input";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      <div className="m-0 p-0 h-screen w-screen bg-[#CEE5D0] flex items-center justify-center">
        <div className="h-[60%] w-[85%] md:w-[40%] flex  items-center justify-center border-2 border-[#FFFFFF] rounded-lg">
          <Input />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
