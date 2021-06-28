import { BrowserRouter as Router } from "react-router-dom";
import Pages from "./components/pages/Pages";
import { DataProvider } from "./GlobalState";
function App() {
  return (
    <DataProvider>
      <Router>
        <div className="app">
          <Pages />
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
