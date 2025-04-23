import { useEffect, useState } from "react";

export default function Result({ questions, answers, onRestart }) {
    const [scores, setScores] = useState([]);

    const score = questions.reduce((acc, q, i) => (
        acc + (answers[i] === q.correctAnswer ? 1 : 0)
    ), 0);

    const userName = localStorage.getItem("lastUserName");

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("scores")) || [];

        const alreadySaved = stored.some(s => s.name === userName && s.score === score);
        if (!alreadySaved) {
            const newEntry = { name: userName, score };
            const updated = [...stored, newEntry];
            localStorage.setItem("scores", JSON.stringify(updated));
            setScores(updated);
        } else {
            setScores(stored);
        }
    }, []);


    return (
        <div className="results">
            <h3>Scorul tau: {score} / {questions.length}</h3>

            <h4>Greseli:</h4>
            <ul>
                {questions.map((q, i) => (
                    answers[i] !== q.correctAnswer && (
                        <li key={i}>
                            <strong>{q.question}</strong><br />
                            Ai răspuns: {answers[i]} | Corect era: {q.correctAnswer}
                        </li>
                    )
                ))}
            </ul>

            <h4>Istoric scoruri:</h4>
            <ul>
                {scores.map((s, i) => (
                    <li key={i}>{s.name} — {s.score}</li>
                ))}
            </ul>

            <button onClick={onRestart}>Reseteaza</button>
            {/*<button onClick={() => localStorage.removeItem("scores")}>*/}
            {/*    Sterge scorurile salvate*/}
            {/*</button>*/}

        </div>
    );
}
