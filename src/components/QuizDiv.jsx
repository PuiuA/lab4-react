import { useState } from "react";
import Form from "./Form";
import Quiz from "./Quiz";
import Result from "./Result";
import questionsData from "../data/questions.json";

export default function QuizDiv() {
    const [randomOrder, setRandomOrder] = useState('yes');
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [quizStarted, setQuizStarted] = useState(false);
    const [quizFinished, setQuizFinished] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);

    const startQuiz = () => {
        if (!name || !category || !difficulty) {
            alert("Completeaza totul!");
            return;
        }


        let filtered = [...questionsData];
        if (category !== "mix-category")
            filtered = filtered.filter((q) => q.category === category);
        if (difficulty !== "mix-difficulty")
            filtered = filtered.filter((q) => q.difficulty === difficulty);

        let selected = [];

        if (category === "mix-category") {
            const categories = [...new Set(questionsData.map((q) => q.category))];
            for (let cat of categories) {
                const catQs = questionsData.filter((q) => q.category === cat);
                selected.push(catQs[Math.floor(Math.random() * catQs.length)]);
            }
        } else {
            const count = difficulty === "mix-difficulty" ? 10 : 5;
            selected = filtered.sort(() => 0.5 - Math.random()).slice(0, count);
        }
        if (randomOrder === "yes") {
            selected = selected.sort(() => 0.5 - Math.random());
        }


        localStorage.setItem("lastUserName", name);
        setQuestions(selected);
        setAnswers(new Array(selected.length).fill(null));
        setQuizStarted(true);
        setQuizFinished(false);
    };

    const handleAnswer = (index, selected) => {
        const updated = [...answers];
        updated[index] = selected;
        setAnswers(updated);
    };

    const finishQuiz = () => {
        if (answers.includes(null)) {
            alert("Raspunde la toate intrebarile!");
            return;
        }
        setQuizFinished(true);
    };

    const resetAll = () => {
        setName("");
        setCategory("");
        setDifficulty("");
        setQuizStarted(false);
        setQuizFinished(false);
        setQuestions([]);
        setAnswers([]);
    };

    return (
        <div className="quiz-app">
            <h1>Quiz App</h1>
            {!quizStarted && (
                <Form
                    name={name}
                    setName={setName}
                    category={category}
                    setCategory={setCategory}
                    difficulty={difficulty}
                    setDifficulty={setDifficulty}
                    randomOrder={randomOrder}
                    setRandomOrder={setRandomOrder}
                    onStart={startQuiz}
                />
            )}
            {quizStarted && !quizFinished && (
                <Quiz
                    questions={questions}
                    answers={answers}
                    onAnswer={handleAnswer}
                    onFinish={finishQuiz}
                />
            )}
            {quizFinished && (
                <Result
                    questions={questions}
                    answers={answers}
                    onRestart={resetAll}
                />
            )}
        </div>
    );
}
