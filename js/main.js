var playerCount = 0
var players = []

function startGame(pIn) {
  pIn.forEach(p => players.push(p))
  console.log("Registered players:", players)
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
