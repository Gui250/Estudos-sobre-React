import styles from "./app.module.css";
import { WORDS, type Challenge } from "./utils/words";
import { Header } from "./components/Header";
import { Tip } from "./components/Tip";
import { Letter } from "./components/Letter";
import { Input } from "./components/Input";
import { Button } from "./components/Button";
import { LettersUsed, type LettersUsedProps } from "./components/LettersUsed";
import { useEffect, useState } from "react";

function App() {
  const [score, setScore] = useState(0);
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [letter, setLetter] = useState<string>("");
  const [lettersUsed, setLettersUsed] = useState<LettersUsedProps[]>([]);
  function handleRestartGame() {
    alert("Reniciar o jogo!");
  }

  function startGame() {
    const index = Math.floor(Math.random() * WORDS.length);
    const randomWord = WORDS[index];
    setChallenge(randomWord);

    setScore(0);
    setLetter("");
  }

  function handleConfirm() {
    if (!challenge) return;

    if (!letter.trim()) {
      return alert("Digite uma letra");
    }

    const value = letter.toUpperCase();
    const exists = lettersUsed.find(
      (used) => used.value.toUpperCase() === value
    );

    if (exists) {
      return alert("Letra já utilizada");
    }

    const hits = challenge.word
      .toUpperCase()
      .split("")
      .filter((char) => char === value).length;

    const correct = hits > 0;
    const currentScore = score + hits;

    setLettersUsed((prevState) => [...prevState, { value, correct }]);
    setScore(currentScore);
    setLetter("");
  }

  useEffect(() => {
    startGame();
  }, []);

  if (!challenge) return null;

  return (
    <div className={styles.container}>
      <main>
        <Header current={score} max={10} onRestart={handleRestartGame} />
        <Tip tip={challenge.tip} />
        <div className={styles.word}>
          {challenge.word.split("").map(() => {
            return <Letter value="" />;
          })}
        </div>

        <h4>Palpite</h4>

        <div>
          <Input
            autoFocus
            maxLength={1}
            onChange={(e) => setLetter(e.target.value)}
          />
          <Button title="Confirmar" onClick={handleConfirm} />
        </div>

        <LettersUsed data={lettersUsed} />
      </main>
    </div>
  );
}

export default App;
