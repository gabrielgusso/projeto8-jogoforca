import { useState } from "react"
import styled from "styled-components"
import GlobalStyle from './globalStyles'
import forca0 from "./assets/forca0.png"
import forca1 from "./assets/forca1.png"
import forca2 from "./assets/forca2.png"
import forca3 from "./assets/forca3.png"
import forca4 from "./assets/forca4.png"
import forca5 from "./assets/forca5.png"
import forca6 from "./assets/forca6.png"
import words from "./Words.js"
import alphabet from "./Alphabet.js"
let arrWord

function Main() {
  const [arrUnderline, setArrUnd] = useState([])
  const newArr = [...arrUnderline]
  const [arrNotClicked, setArrNotClicked] = useState([])
  const mapImg = [forca0, forca1, forca2, forca3, forca4, forca5, forca6]
  const [indexForca, setindexForca] = useState(0)
  const [color, setColor] = useState("")
  const [guess, setGuess] = useState("")
  const [wordWithoutAccent, setwordWithoutGuess] = useState("")

  function Letters(props) {
    return (
      <LetterBox
        color={arrNotClicked.includes(props.element) ? true : false}
        data-identifier="letter"
        disabled={arrNotClicked.includes(props.element) ? false : true}
        onClick={() => {
          const verifyIfExistsVar = arrWord.map((e, index) =>
            props.element === e
              ? (setArrUnd(LetterInUnd(props.element, index)), false)
              : true
          )
          const NewArrNotClicked = arrNotClicked.filter(
            (e) => e !== props.element
          )
          setArrNotClicked(NewArrNotClicked)
          verifyIfExists(verifyIfExistsVar)
          loseOrWinGame()
        }}
      >
        {props.element}
      </LetterBox>
    )
  }

  function verifyIfExists(arr) {
    if (arr.every(Boolean)) {
      setindexForca(indexForca + 1)
    }
  }

  function loseOrWinGame() {
    if (indexForca === 5) {
      setColor("red")
      setArrUnd(arrWord)
      setArrNotClicked([])
    }
    if (!newArr.includes("_")) {
      setColor("rgb(11, 168, 11)")
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

  function sortWord() {
    return Math.random() - 0.5
  }

  function changeUnderline() {
    let underline = ""
    for (let i = 0; i < words[0].length; i++) {
      underline += "_"
    }
    setArrUnd([...underline])
    return arrUnderline
  }

  function guessTheWord() {
    const guessCapsLock = guess.toUpperCase()
    if (guessCapsLock === wordWithoutAccent || guessCapsLock === words[0]) {
      setColor("rgb(11, 168, 11)")
      setArrUnd(guessCapsLock)
      setArrNotClicked([])
    } else {
      setindexForca(6)
      setColor("red")
      setArrUnd(wordWithoutAccent)
    }
    setGuess("")
  }

  return (
    <>

    <Container>
    <GlobalStyle />
      <Forca>
        <img data-identifier="game-image" src={mapImg[indexForca]} alt="forca" />
        <ButtonDiv color={color}>
          <button
            data-identifier="choose-word"
            onClick={() => {
              words.sort(sortWord)
              const novaPalavra = words[0]
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "", "ç", "c")
              setwordWithoutGuess(novaPalavra)
              setColor("")
              setindexForca(0)
              setArrNotClicked([...alphabet])
              arrWord = [...novaPalavra]
              setArrUnd(changeUnderline)
            }}
          >
            Escolher Palavra
          </button>
          <p data-identifier="word" className={color}>
            {arrUnderline}
          </p>
        </ButtonDiv>
      </Forca>
      <AllLetters>
        {alphabet.map((e, index) => (
          <Letters key={index} element={e} index={index} />
        ))}
      </AllLetters>
      <Asnwer>
        <p>Já sei a palavra!</p>
        <input
          data-identifier="type-guess"
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
        />
        <button data-identifier="guess-button" onClick={guessTheWord}>
          Chutar
        </button>
      </Asnwer>
    </Container>
    </>
  )
}

export default function App() {
  return (
    <>
      <Main />
    </>
  )
}

const Container = styled.div`
  margin: auto;
  width: 900px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 50px;
  input {
    border-radius: 5px;
    width: 350px;
    height: 35px;
    outline: none;
    border: 1px solid gray;
  }
`

const Forca = styled.div`
  display: flex;
  width: 900px;

  img {
    width: 450px;
    margin-left: 100px;
  }

  button {
    background-color: rgb(11, 168, 11);
    color: white;
    cursor: pointer;
    border: none;
    height: 50px;
    width: 170px;
    border-radius: 5px;
    font-size: 16px;
    font-weight: 700;
    margin-top: 35px;
    margin-left: 100px;
  }
`

const LetterBox = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 12px;
  margin-bottom: 12px;
  cursor: pointer;
  font-weight: 700;
  border: ${(props) => (props.color === true ? "1px solid #3973B3" : "none")};
  color: ${(props) => (props.color === true ? "#3973B3" : "#79818A")};
  background-color: ${(props) => props.color === true ? "#C2DFF4" : "#9FAAB5"};
`

const Asnwer = styled.div`
  margin-top: 30px;
  display: flex;
  width: 650px;
  justify-content: space-around;
  align-items: center;
  button {
    height: 40px;
    width: 65px;
    background-color: #c2dff4;
    color: #3973b3;
    border: 1px solid #3973b3;
    cursor: pointer;
    font-weight: 700;
    font-size: 15px;
    border-radius: 5px;
  }
`

const ButtonDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 80px;
  font-size: 40px;
  p {
    margin-left: 40px;
    letter-spacing: 10px;
    color: ${(props) => props.color};
  }
`

const AllLetters = styled.div`
    width: 700px;
    display: flex;
    flex-wrap: wrap;
    margin-top: 30px;
    margin-left: 60px;
    `
