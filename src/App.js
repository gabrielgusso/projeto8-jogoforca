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
  const map = [forca0, forca1,forca2,forca3,forca4,forca5,forca6]
  const [indice, setIndice] = useState(0)
  function Letters(props) {
    return (
      <button
        disabled={arrNotClicked.includes(props.element) ? false : true}
        className={`letterBox ${
          arrNotClicked.includes(props.element) ? "color1" : "color0"
        } `}
        onClick={() => {
          const verifyIfExistsVar = arrWord.map((e, index) =>
            props.element === e
            ? (setArrUnd(LetterInUnd(props.element, index)), false)
            : true//(arrClicked.includes(props.element) ? null : setArrCliked([...arrClicked, props.element]), console.log(arrClicked))//(setIndice(indice + 1), console.log(`errou${indice}`))
          )
          const NewArrNotClicked = arrNotClicked.filter(
            (e) => e !== props.element
          )
          setArrNotClicked(NewArrNotClicked)
          console.log(NewArrNotClicked)
          verifyIfExists(verifyIfExistsVar)
          console.log(verifyIfExistsVar)
        }}
      >
        {props.element}
      </button>
    )
  }

  function verifyIfExists(arr) {
    if(arr.every(Boolean)){
      setIndice(indice + 1)
    }
  }

  function LetterInUnd(e, index) {
    console.log(index)
    for (let i = 0; i < arrUnderline.length; i++) {
      if (i === index) {
        newArr[i] = e
      }
    }
    console.log(newArr)
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

  return (
    <main>
      <div className="container">
        <img src={map[indice]} alt="forca" />
        <div className="buttonDiv">
          <button
            onClick={() => {
              palavras.sort(comparador)
              const caracter = palavras[0]
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "", "ç", "c")
              console.log(palavras[0])
              setArrNotClicked([...alfabeto])
              arrWord = [...caracter]
              console.log(arrWord)
              setArrUnd(changeUnderline)
            }}
          >
            Escolher Palavra
          </button>
          <p>{arrUnderline}</p>
        </div>
      </div>
      <div className="allLetters">
        {alfabeto.map((e, index) => (
          <Letters key={index} element={e} index={index} />
        ))}
      </div>
      <div className="answer">
        <p>Já sei a palavra!</p>
        <input type="text" />
        <button>Chutar</button>
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
