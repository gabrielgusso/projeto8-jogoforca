import { useState } from "react"
import forca0 from "./assets/forca0.png"
import forca1 from "./assets/forca1.png"
import forca2 from "./assets/forca2.png"
import forca3 from "./assets/forca3.png"
import forca4 from "./assets/forca4.png"
import forca5 from "./assets/forca5.png"
import forca6 from "./assets/forca6.png"
import palavras from "./Palavras.js"
import alfabeto from "./Alfabeto.js"
let arrWord

function Main() {
  const [arrUnderline, setArrUnd] = useState([])
  const newArr = [...arrUnderline]
  const [arrNotClicked, setArrNotClicked] = useState([])
  const map = [forca0, forca1, forca2, forca3, forca4, forca5, forca6]
  const [indexForca, setindexForca] = useState(0)
  const [color, setColor] = useState("")
  const [chute, setChute] = useState("")
  const [palavraSemAcento, setPalvaraSemAcento] = useState("")

  function Letters(props) {
    return (
      <button
        data-identifier="letter"
        disabled={arrNotClicked.includes(props.element) ? false : true}
        className={`letterBox ${
          arrNotClicked.includes(props.element) ? "color1" : "color0"} `}
        onClick={() => {
          const verifyIfExistsVar = arrWord.map(
            (e, index) =>
              props.element === e
                ? (setArrUnd(LetterInUnd(props.element, index)), false)
                : true
          )
          const NewArrNotClicked = arrNotClicked.filter(
            (e) => e !== props.element
          )
          setArrNotClicked(NewArrNotClicked)
          verifyIfExists(verifyIfExistsVar)
          loseWinGame()
        }}
      >
        {props.element}
      </button>
    )
  }

  function verifyIfExists(arr) {
    if (arr.every(Boolean)) {
      setindexForca(indexForca + 1)
    }
  }

  function loseWinGame() {
    if (indexForca === 5) {
      setColor("colorRed")
      setArrUnd(arrWord)
    }
    if (!newArr.includes("_")) {
      setColor("colorGreen")
      setArrNotClicked([])
    }
  }

  function LetterInUnd(e, index) {
    for (let i = 0; i < arrUnderline.length; i++) {
      if (i === index) {
        newArr[i] = e
      }
    }
    return newArr
  }

  function comparador() {
    return Math.random() - 0.5
  }

  function changeUnderline() {
    let underline = ""
    for (let i = 0; i < palavras[0].length; i++) {
      underline += "_"
    }
    setArrUnd([...underline])
    return arrUnderline
  }

  function chutar(){
    const chuteCaixaAlta = chute.toUpperCase()
    if(chuteCaixaAlta === palavraSemAcento || chuteCaixaAlta === palavras[0]){
      setColor("colorGreen")
      setArrUnd(chuteCaixaAlta)
      setArrNotClicked([])     
    } else {
      setindexForca(6)
      setColor("colorRed")
      setArrUnd(palavraSemAcento)
    }
    setChute("")
  }

  return (
    <main>
      <div className="container">
        <img 
        data-identifier="game-image"
        src={map[indexForca]} alt="forca" />
        <div className="buttonDiv">
          <button
            data-identifier="choose-word"
            onClick={() => {
              palavras.sort(comparador)
              const novaPalavra = palavras[0]
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "", "ç", "c")
              setPalvaraSemAcento(novaPalavra)
              setColor("")
              setindexForca(0)
              setArrNotClicked([...alfabeto])
              arrWord = [...novaPalavra]
              setArrUnd(changeUnderline)
            }}
          >
            Escolher Palavra
          </button>
          <p 
          data-identifier="word"
          className={color}>{arrUnderline}</p>
        </div>
      </div>
      <div className="allLetters">
        {alfabeto.map((e, index) => (
          <Letters key={index} element={e} index={index} />
        ))}
      </div>
      <div className="answer">
        <p>Já sei a palavra!</p>
        <input 
        data-identifier="type-guess"
        type="text"
        value={chute}
        onChange={(e) => setChute(e.target.value)} 
        />
        <button 
        data-identifier="guess-button"
        onClick={chutar}
        >Chutar</button>
      </div>
    </main>
  )
}

export default function App() {
  return (
    <>
      <Main />
    </>
  )
}
