import { ThemeProvider } from "./contexts/ThemeProvider";
import Main from "./pages/Main";
function App() {
    return (
        <div className="App">
            <ThemeProvider>
                <Main />
            </ThemeProvider>
        </div>
    );
}

export default App;
