import { createContext, useState } from 'react';

export const QuizContext = createContext();

export function QuizProvider({ children }) {
    const [user, setUser] = useState({ name: '', score: 0, history: [] });
    return (
        <QuizContext.Provider value={{ user, setUser }}>
            {children}
        </QuizContext.Provider>
    );
}