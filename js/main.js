var playerCount = 0
var players = []
var currentPlayer = 0


function changeCard() {
  let card = Math.floor(Math.random() * cards.length)

  document.getElementById("userId").innerHTML = `${players[currentPlayer]}, it's your round!`
  document.getElementById("cardName").innerHTML = `Card name: ${cards[card].title}`
  document.getElementById("cardValue").innerHTML = `${cards[card].description}`

  currentPlayer += 1
  currentPlayer %= playerCount
}


function startGame(pIn) {
  pIn.forEach(p => players.push(p))
  console.log("Registered players:", players)

  document.getElementById("userId").innerHTML = `${players[currentPlayer]}, it's your round!`
  changeCard()
}


function addNewPlayer() {
  Swal.fire({
    title: 'How many players?',
    input: 'text',
    showCancelButton: false,
    confirmButtonText: 'Continue',
    preConfirm: n => {
      playerCount = parseInt(n)
      if (!isNumeric(playerCount)) playerCount = 1
      console.log(`Added intent for ${playerCount} players!`)
    },
    inputValidator: n => {
      return new Promise(resolve => {
        if (isNumeric(n)) resolve()
        else resolve('You need to input a numeric value')
      })
    },
    allowOutsideClick: false
  })
  .then(_ => {
    Swal.mixin({
      input: 'text',
      confirmButtonText: 'Add',
      allowOutsideClick: false,
      showCancelButton: false,
    })
    .queue(createPlayerTitle())
    .then(pName => {
      if (pName.value) {
        Swal.fire({
          title : `All done! Confirm Players.`,
          html  : `<code>${JSON.stringify(pName.value, null, 2)}</code>`,
          confirmButtonText : `Play!`,
          allowOutsideClick: false,
          showCancelButton: false,
          preConfirm: _ => { startGame(pName.value) }
        })
      }
    })
  })
}


function createPlayerTitle() {
  let arr = []
  for (let i = 0; i < playerCount; i++)
    arr.push(`Name of player ${i+1}`)

  return arr
}


function isNumeric(n) {
  return ! (isNaN(n) || n == null || n == undefined)
}
