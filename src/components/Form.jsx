export default function Form({ name, setName, category, setCategory, difficulty, setDifficulty, onStart }) {
    return (
        <div className="form">
            <input
                type="text"
                placeholder="Nume"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Categorie</option>
                <option value="matematica">Matematica</option>
                <option value="istorie">Istorie</option>
                <option value="informatica">Informatica</option>
                <option value="mix-category">Mix</option>
            </select>
            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                <option value="">Dificultate</option>
                <option value="usor">Usor</option>
                <option value="greu">Greu</option>
                <option value="mix-difficulty">Mix</option>
            </select>
            <button onClick={onStart}>Start</button>
        </div>
    );
}
