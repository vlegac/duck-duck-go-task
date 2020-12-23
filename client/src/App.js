import "./App.css";
import { Topics } from "./components/Topics/Topics";

function App() {
  return (
    <div className="App">
      <h2>Search</h2>
      <input type="text" id="search" name="search" />
      <button>Search</button>
      <Topics />
    </div>
  );
}

export default App;
