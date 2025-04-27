import { useEffect, useState } from "react";

export default function Result({ questions, answers, onRestart }) {
    const [scores, setScores] = useState([]);

    const score = questions.reduce((acc, q, i) => (
        acc + (answers[i] === q.correctAnswer ? 1 : 0)
    ), 0);

    const userName = localStorage.getItem("lastUserName");

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("scores")) || [];

        const existingUser = stored.find((s) => s.name === userName);

        let updatedScores;

        if (existingUser) {
            if (score > existingUser.score) {
                updatedScores = stored.map((s) =>
                    s.name === userName ? { ...s, score: score } : s
                );
            } else {
                updatedScores = stored;
            }
        } else {
            updatedScores = [...stored, { name: userName, score }];
        }

        localStorage.setItem("scores", JSON.stringify(updatedScores));
        setScores(updatedScores);
    }, []);

    return (
        <div className="results">
            <h3>Scorul tău: {score} / {questions.length}</h3>

            <h4>Întrebări greșite:</h4>
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

            <h4>Scoruri maxime utilizatori:</h4>
            <ul>
                {scores.map((s, i) => (
                    <li key={i}>{s.name} — {s.score}</li>
                ))}
            </ul>

            <button onClick={onRestart}>Resetează</button>
        </div>
    );
}
