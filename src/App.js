import { useState } from "react";
import forca from "./assets/forca0.png";
import palavras from "./Palavras.js";
import alfabeto from "./Alfabeto.js"
// let arrUnderline
let arrWord;

function Main() {
  const [color, setColor] = useState("color0");
  // const [width, setWidth] = useState('')
  
  const [arrUnderline, setArrUnd] = useState([]);
  const newArr = [...arrUnderline];

  //USAR UM STATE E FAZER A VERIFICACAO NA CLASSE
  function Letters(props) {
    // const color1 = color
    const [newColor, setNewColor] = useState(color); //TIRAR ISSO DEIXAR UM STATE
    return (
      <button
        className={"letterBox " + newColor}
        onClick={() => {
          arrWord.map((e, index) =>
            props.element === e
              ? (setArrUnd(LetterInUnd(props.element, index)),
                setNewColor("color0"))
              : setNewColor("color0")
          );
        }}
      >
        {props.element.toUpperCase()}
      </button>
    );
  }

  function LetterInUnd(e, index) {
    console.log(index);
    for (let i = 0; i < arrUnderline.length; i++) {
      if (i === index) {
        newArr[i] = e;
      }
    }
    console.log(newArr);
    return newArr;
  }

  function comparador() {
    return Math.random() - 0.5;
  }

  function changeUnderline() {
    let underline = "";
    for (let i = 0; i < palavras[0].length; i++) {
      underline += "_";
    }
    setArrUnd([...underline]);
    return arrUnderline;
  }

  return (
    <main>
      <div className="container">
        <img src={forca} alt="forca" />
        <div className="buttonDiv">
          <button
            onClick={() => {
              palavras.sort(comparador);
              const caracter = palavras[0]
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "", "ç", "c");
              console.log(palavras[0]);

              arrWord = [...caracter];
              console.log(arrWord);
              setArrUnd(changeUnderline);
              setColor("color1");
            }}
          >
            Escolher Palavra
          </button>
          <p>{arrUnderline}</p>
        </div>
      </div>
      <div className="allLetters">
        {alfabeto.map((e, index) => (
          <Letters key={index} element={e} />
        ))}
      </div>
      <div className="answer">
        <p>Já sei a palavra!</p>
        <input type="text" />
        <button>Chutar</button>
      </div>
    </main>
  );
}

export default function App() {
  return (
    <>
      <Main />
    </>
  );
}
