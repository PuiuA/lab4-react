export default function Quiz({ questions, answers, onAnswer, onFinish }) {
    return (
        <div className="quiz">
            {questions.map((q, i) => (
                <div key={i}>
                    <p><strong>{q.question}</strong></p>
                    {q.options.map((opt) => (
                        <label key={opt}>
                            <input
                                type="radio"
                                name={`q${i}`}
                                value={opt}
                                checked={answers[i] === opt}
                                onChange={() => onAnswer(i, opt)}
                            />
                            {opt}
                        </label>
                    ))}
                </div>
            ))}
            <button onClick={onFinish}>Finalizare Quiz</button>
        </div>
    );
}
