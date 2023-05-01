//https://www.youtube.com/watch?v=QoA_qDW5FyQ tutorial used
import React, {useState, useRef, useEffect} from "react"
import GameBtn from "./GameBtn"

const colors = ["green", "red", "yellow", "blue"]

function SimonGame(){
    //states
    const[sequence, setSequence] = useState([]);
    const[playing, setPlaying] = useState(false);
    const[playingIdx, setPlayingIdx] = useState(0);

    

    //refs

    const greenRef = useRef(null);
    const redRef = useRef(null);
    const yellowRef = useRef(null);
    const blueRef = useRef(null);

    //functions

    const resetGame = () => {
        setSequence([])
        setPlaying(false)
        setPlayingIdx(0)
    }
    //add random color
    const addNewColor = () => {
        const color = colors[Math.floor(Math.random() * 4)]
        const newSequence = [...sequence, color]
        setSequence(newSequence)
    }

    //if not playing add new color to sequence
    const handleNextLevel = () => {
        if(!playing){
            setPlaying(true)
            addNewColor();
        }
    }

    const handleColorClick = (e) => {
        if (playing) {
          e.target.classList.add("opacity-50");
    
          setTimeout(() => {
            e.target.classList.remove("opacity-50");
    
            const clickColor = e.target.getAttribute("color");
    
            // clicked the correct color of the sequence
            if (sequence[playingIdx] === clickColor) {
              // clicked the last color of the sequence
              if (playingIdx === sequence.length - 1) {
                setTimeout(() => {
                  setPlayingIdx(0);
                  addNewColor();
                }, 250);
              }
    
              // missing some colors of the sequence to be clicked
              else {
                setPlayingIdx(playingIdx + 1);
              }
            }
    
            // clicked the incorrect color of the sequence
            else {
              resetGame();
              // alert("You Lost!");
            }
          }, 250);
        }
      };

    //use effect hook, sequence state changes executes show sequence
    useEffect(() => {
        //show sequence
        if(sequence.length > 0){
        const showSequence = (idx = 0) => {
            let ref = null;
            if(sequence[idx] === "green") ref = greenRef
            if(sequence[idx] === "red") ref = redRef
            if(sequence[idx] === "yellow") ref = yellowRef
            if(sequence[idx] === "blue") ref = blueRef
            //Show Ref

            setTimeout(() => {
                ref.current.classList.add("brightness-[2.5]")
                setTimeout(() => {
                    ref.current.classList.remove("brightness-[2.5]")
                    if(idx < sequence.length - 1) showSequence(idx + 1)
                }, 250)
                
            }, 250)
        }
        showSequence()
    }
    }, [sequence])
    
    return (
        //main container for the game
        <div className = "flex justify-center items-center bg-neutral-800 text-white w-screen h-screen">
            {/* game container */}
            <div className = "relative flex flex-col justify-center items-center">
                {/* Green and red container*/}
                <div>
                    {/*green button*/}
                    <GameBtn color = "green" border = "rounded-tl-full" bg="bg-green-500" ref = {greenRef} onClick = {handleColorClick}/>
                    {/*red button*/}
                    <GameBtn color = "red" border = "rounded-tr-full" bg="bg-red-500" ref = {redRef} onClick = {handleColorClick}/>
                </div>
                {/* Yellow and Blue container*/}
                <div>
                    {/*yellow button*/}
                    <GameBtn color = "yellow" border = "rounded-bl-full" bg="bg-yellow-400" ref = {yellowRef} onClick = {handleColorClick}/>
                    {/*blue button*/}
                    <GameBtn color = "blue" border = "rounded-br-full" bg="bg-blue-500" ref = {blueRef} onClick = {handleColorClick}/>
                </div>
                {/*yellow button*/}
                <button className= "absolute bg-neutral-900 text-white text-xl sm:text-2xl font-bold rounded-full w-[150px] sm:w-[175px] h-[150px] sm:h-[175px] duration-200 hover:scale-105" onClick = {handleNextLevel}>
                    {sequence.length === 0 ? "play" : sequence.length}
                </button>
            </div>    
        </div>
    )
}

export default SimonGame