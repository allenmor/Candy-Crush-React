import { useState, useEffect } from "react"
function App() {

  const [currentColorArrangement, setCurrentColorArrangement] = useState([])
  const [sqaureBeingDragged, setSqaureBeingDragged] = useState(null)
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null)

  const width = 8
  const candyColors = [
    'blue',
    'green',
    'orange',
    'purple',
    'red',
    'yellow'
  ]

function checkForColumOfThree() {
  for(let i = 0; i <= 47; i++){
    const columnOfThree = [i, i + width, i + width * 2]
    const decidedColor = currentColorArrangement[i]
    if(columnOfThree.every(sqaure => currentColorArrangement[sqaure] === decidedColor)) {
      columnOfThree.forEach((el, i) => {
        return currentColorArrangement[el] = ''
      })
    }
  }
}
function checkRowOfThree() {
  for(let i = 0; i < 64; i++){
    const rowOfThree = [i, i + 1, i + 2]
    const decidedColor = currentColorArrangement[i]
    const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64]
    if(notValid.includes(i)) continue
    if(rowOfThree.every(sqaure => currentColorArrangement[sqaure] === decidedColor)) {
      rowOfThree.forEach((el, i) => {
        return currentColorArrangement[el] = ''
      })
    }
  }
}
function checkRowOfFour() {
  for(let i = 0; i < 64; i++){
    const rowOfFour = [i, i + 1, i + 2, i + 3]
    const decidedColor = currentColorArrangement[i]
    const notValid = [5, 6, 7, 13, 14, 15, 21,  22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64]
    if(notValid.includes(i)) continue
    if(rowOfFour.every(sqaure => currentColorArrangement[sqaure] === decidedColor)) {
      rowOfFour.forEach((el, i) => {
        return currentColorArrangement[el] = ''
      })
    }
  }
}
function checkForColumOfFour() {
  for(let i = 0; i <= 39; i++){
    const columnOfFour = [i, i + width, i + width * 2, i + width * 3]
    const decidedColor = currentColorArrangement[i]
    if(columnOfFour.every(sqaure => currentColorArrangement[sqaure] === decidedColor)) {
      columnOfFour.forEach((el, i) => {
        return currentColorArrangement[el] = ''
      })
    }
  }
}

function moveIntoSquareBelow() {
  for(let i = 0; i <= 55 - width; i ++){
    const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
    const isFirstRow = firstRow.includes(i)
    if(isFirstRow && currentColorArrangement[i] === ''){
      let randomColor = Math.floor(Math.random() * candyColors.length)
      currentColorArrangement[i] = candyColors[randomColor]
    }
    if(currentColorArrangement[i + width] === '') {
      currentColorArrangement[i + width] = currentColorArrangement[i]
      currentColorArrangement[i] = ''
    }
  }
}

function dragStart(e){
  console.log('start')
  console.log(e.target)
  setSqaureBeingDragged(e.target)
}

function dragDrop(e){
  console.log(e.target);
  console.log('drop')
  setSquareBeingReplaced(e.target)
}
function dragEnd(e){
  console.log('end')
  console.log(e.target)
  const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute('data-id'))
  const squareBeingDraggedId = parseInt(sqaureBeingDragged.getAttribute('data-id'))
  currentColorArrangement[squareBeingReplacedId] = sqaureBeingDragged.style.backgroundColor
  currentColorArrangement[squareBeingDraggedId] = squareBeingReplaced.style.backgroundColor
  console.log(squareBeingReplacedId)
  console.log(squareBeingDraggedId)

}

  function createBoard(){
    const randomColorArrangement = []
    for(let i = 0; i < width * width; i ++) {
      const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)]
      randomColorArrangement.push(randomColor)
    }
    setCurrentColorArrangement(randomColorArrangement)
  }
  useEffect(()=>{
    createBoard()
  },[])

useEffect(()=>{
  const timer = setInterval(() => {
    checkForColumOfFour()
    checkForColumOfThree()
    checkRowOfFour()
    checkRowOfThree()
    moveIntoSquareBelow()
    setCurrentColorArrangement([...currentColorArrangement])
  }, 100)
  return () => clearInterval(timer)
},[currentColorArrangement, moveIntoSquareBelow, checkRowOfFour, checkForColumOfThree, checkRowOfThree, checkForColumOfFour])

  return (
    <div className="app">
      <div className="game">
        {currentColorArrangement.map((el, i) => {
          return <img 
          alt={el} 
          style={{backgroundColor: el}} 
          key={i}
          data-id={i}
          draggable={true}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={(e) => e.preventDefault()}
          onDragLeave={(e) => e.preventDefault()}
          onDrop={dragDrop}
          onDragEnd={dragEnd}
          onDragStart={dragStart}
          />
        })}
      </div>
    </div>
  );
}

export default App;
