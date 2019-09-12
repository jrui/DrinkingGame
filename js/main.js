var playerCountIntent = 0
var players = 0
var playersUser = []

function startGame() {
  confirm('Not Implemented!')
}


function addNewPlayer() {
  Swal.fire({
    title: 'How many players?',
    input: 'text',
    showCancelButton: false,
    confirmButtonText: 'Continue',
    preConfirm: n => {
      playerCountIntent = parseInt(n)
      if (!isNumeric(playerCountIntent)) playerCountIntent = 1
      console.log(`Added intent for ${playerCountIntent} players!`)
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
          preConfirm: _ => { startGame() }
        })
      }
    })
  })
}


function createPlayerTitle() {
  let arr = []
  for (let i = 0; i < playerCountIntent; i++)
    arr.push(`Name of player ${i+1}`)

  return arr
}


function isNumeric(n) {
  return ! (isNaN(n) || n == null || n == undefined)
}
