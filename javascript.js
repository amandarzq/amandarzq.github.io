const box = document.getElementsByClassName('box')
const mouse = document.getElementsByClassName('mouse')
let score = document.getElementById('score')
const playGame = document.getElementById('playScreen')
const finalScore = document.getElementById('finalScore')

let gameOverSound = document.getElementById('gameover')
let smackSound = document.getElementById('smacksound')
let scoreSound = document.getElementById('tambahscore')
let catScream = document.getElementById('catscream')
let catMeow = document.getElementById('catmeow')

let gameOver;
let skor = 0
let prevBox
let picked;

function boxRandomizer(box) {
  let idx = Math.floor(Math.random() * box.length)
  picked = box[idx]
  if (picked === prevBox) {
    return boxRandomizer(box)
  }
  prevBox = picked
  return picked
}


function mousePopUp() {
  let picked = boxRandomizer(box)
  picked.classList.add('appear')
  setTimeout(() => { 
    picked.classList.remove('appear') 
    if(!gameOver) {
      mousePopUp()
    }
  }, 700)
}

function play() {
  playGame.classList.remove('show')
  playGame.classList.add('hide')
  skor = 0
  gameOver = false
  gameOverSound.currentTime = 0
  mousePopUp()

  setTimeout(() => {
    gameOver = true
    gameOverSound.play()
    
    if(skor > 0) {
      playGame.classList.remove('hide')
      playGame.classList.add('show')
      score.innerText = 0
    }
  }, 10000)
}

function smack(e) {
  smackSound.currentTime = 0
  scoreSound.currentTime = 0
  
  if (!gameOver) {
    smackSound.play()
    skor += 55
    scoreSound.play()
    score.classList.add('add')
    score.innerText = skor
    finalScore.innerText = skor
    if (score.innerText % 3 === 0 ) {
      catScream.play()
      catScream.currentTime = 0
    } else {
      catMeow.play()
      catMeow.currentTime = 0
    }
  }
}

box.forEach(mouse => {
  mouse.addEventListener('click', smack)
})







