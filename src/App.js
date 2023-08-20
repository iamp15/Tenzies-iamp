import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import "./App.css";
import Die from "./Die";

function App() {
  function allNewDice() {
    let array = [];
    for (let i = 0; i < 10; i++) {
      array.push({
        value: Math.floor(Math.random() * 6) + 1,
        isHeld: false,
        id: nanoid(),
      });
    }
    return array;
  }

  const [diceNumbers, setDiceNumbers] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [changeLang, setChangeLang] = useState(false);

  useEffect(() => {
    for (let i = 0; i < 10; i++) {
      if (diceNumbers[i].isHeld === false) return;
    }
    let valor = diceNumbers[0].value;
    for (let i = 1; i < 10; i++) {
      if (diceNumbers[i].value !== valor) return;
    }
    setTenzies(true);

    /*
    ******Manera alternativa**********
    const allHeld = diceNumber.every(die => die.isHeld) //si existe un elemento que no cumpla la condición la función every() devolverá false
        const firstValue = dice[0].value //se fija un valor de referencia al cual comparar
        const allSameValue = dice.every(die => die.value === firstValue) // si existe un elemento que no cumpla la condición la función every() devolverá false
        if (allHeld && allSameValue) { //se comprueba si ambas banderas son ciertas
            setTenzies(true)
            console.log("You won!")
        }
    */
  }, [diceNumbers]);

  const dice = diceNumbers.map((x) => (
    <Die
      value={x.value}
      key={x.id}
      isHeld={x.isHeld}
      holdDice={() => holdDice(x.id)}
    />
  ));

  function roll() {
    setDiceNumbers((oldDiceNumbers) =>
      oldDiceNumbers.map((x) =>
        x.isHeld ? x : { ...x, value: Math.floor(Math.random() * 6) + 1 }
      )
    );
  }

  function newGame() {
    setDiceNumbers(allNewDice());
    setTenzies(false);
  }

  function holdDice(id, event) {
    setDiceNumbers((oldDiceNumbers) =>
      oldDiceNumbers.map((x) => (x.id === id ? { ...x, isHeld: !x.isHeld } : x))
    );
  }

  function toSpanish() {
    setChangeLang(true);
  }

  function toEnglish() {
    setChangeLang(false);
  }

  return (
    <div className="App">
      <main>
        <div className="frame">
          <div className="innerFrame">
            {tenzies && <Confetti />}

            <header>
              <span>
                <p>{changeLang ? "Idioma:" : "Language:"} </p>
                <span
                  className="fi fi-us"
                  onClick={toEnglish}
                  style={{ boxShadow: !changeLang ? "0 2px 0 0 blue" : "none" }}
                ></span>
                <span
                  className="fi fi-es"
                  onClick={toSpanish}
                  style={{ boxShadow: changeLang ? "0 2px 0 0 blue" : "none" }}
                ></span>
              </span>
            </header>

            <h1 className="title">Tenzies</h1>
            {!changeLang && (
              <p className="instructions">
                Roll until all dice are the same. Click each die to freeze it at
                its current value between rolls.
              </p>
            )}
            {changeLang && (
              <p className="instructions">
                Lanza los dados hasta que los números sean iguales. Haz click en
                ellos para mantener su valor.
              </p>
            )}
            <div className="dice-cont">{dice}</div>
            {tenzies && (
              <h2 className="win-text">
                {changeLang ? "¡¡VICTORIA!!" : "YOU WON!!"}
              </h2>
            )}
            <button className="button" onClick={tenzies ? newGame : roll}>
              {changeLang
                ? tenzies
                  ? "Juego Nuevo"
                  : "Lanzar"
                : tenzies
                ? "New Game"
                : "Roll"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
