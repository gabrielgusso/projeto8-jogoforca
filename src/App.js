import { useState } from "react";
import forca from "./assets/forca0.png"
import palavras from "./Palavras.js"

function Letters(props) {
    return (
        <button className={"letterBox " + props.color}>
            {props.element.toUpperCase()}
        </button>
    )
}

function comparador() {
    return Math.random() - 0.5;
}

function chanceWord() {
    let word = ''
    for(let i = 0; i < palavras[0].length; i++){
        word += '_ '
    }
    return word
}


function Main() {
    const [color, setColor] = useState('color0')
    const [width, setWidth] = useState('')
    const alfabeto = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

    return (
        <main>
            <div className="container">
                <img src={forca} alt='forca' />
                <div className="buttonDiv">
                    <button onClick={() => {
                        palavras.sort(comparador)
                        console.log(palavras[0])
                        setWidth(chanceWord)
                        setColor('color1')
                    }}
                    >Escolher Palavra</button>
                    <p>{width}</p>
                </div>
            </div>
            <div className='allLetters'>
                {alfabeto.map((e, index) => (<Letters key={index} element={e} color={color}/>))}
            </div>
            <div className='answer'>
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
