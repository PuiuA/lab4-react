import QuizDiv from "./components/QuizDiv.jsx";
import {useState} from "react";

function App() {
    const [theme, setTheme] = useState('light');

    function toggleTheme() {
        setTheme(theme === 'light' ? 'dark' : 'light');
    }

    return (
        <div className={`app ${theme}`}>
            <button onClick={toggleTheme}>Schimbă Tema</button>
            <QuizDiv />
        </div>
    );
}

export default App;
