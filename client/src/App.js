import { CommonProvider } from "contexts/CommonProvider";
import { ThemeProvider } from "./contexts/ThemeProvider";
import Main from "./pages/Main";
function App() {
  return (
    <div className="App">
      <ThemeProvider>
        <CommonProvider>
          <Main />
        </CommonProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
