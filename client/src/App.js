import "./App.css";
import { useNavigate } from "react-router-dom";
import Search from "./Search";

function App() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <h1 className="mt-3">Home - Notes</h1>
      <br />
      <Search />
      <br />
      <button onClick={()=> navigate("create")} className="bg-sky-500 p-2 rounded-lg hover:bg-sky-600 hover:text-white transition-all ease-in-out mb-4">new note</button>
    </div>
  );
}

export default App;
