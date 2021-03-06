/**
 * Don't change these constants!
 */
const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const ROCKS = []
const START = document.getElementById('start')

var gameInterval = null

/**
 * Be aware of what's above this line,
 * but all of your work should happen below.
 */

function checkCollision(rock) {
 const top = positionToInteger(rock.style.top)

 // rocks are 20px high
 // DODGER is 20px high
 // GAME_HEIGHT - 20 - 20 = 360px;
 if (top > 360) {
   const dodgerLeftEdge = positionToInteger(DODGER.style.left)
   const dodgerRightEdge = dodgerLeftEdge + 40;
   const rockLeftEdge = positionToInteger(rock.style.left)
   const rockRightEdge = rockLeftEdge + 20;

   return (
     (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) ||
     (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) ||
     (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge)
   )
 }
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`
  rock.style.borderRadius = '50%'

  var top = rock.style.top = 0

  /**
   * Now that we have a rock, we'll need to append
   * it to GAME and move it downwards.
   */
   GAME.appendChild(rock)

  /**
   * This function moves the rock. (2 pixels at a time
   * seems like a good pace.)
   */
   function moveRock() {
     rock.style.top = `${top += 2}px`;

     if (checkCollision(rock)) {
       return endGame()
     }

     if (top < GAME_HEIGHT) {
       window.requestAnimationFrame(moveRock)
     } else {
       rock.remove()
     }
   }

  // We should kick of the animation of the rock around here
  window.requestAnimationFrame(moveRock)

  // Add the rock to ROCKS so that we can remove all rocks
  // when there's a collision
  ROCKS.push(rock)

  // Finally, return the rock element you've created
  return rock
}

/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
  clearInterval(gameInterval)
  ROCKS.forEach(rock => rock.remove())

  document.removeEventListener('keydown', moveDodger)

  START.innerHTML = 'Play again?'
  START.style.display = 'inline'
}

function moveDodger(e) {
  // implement me!
  /**
   * This function should call `moveDodgerLeft()`
   * if the left arrow is pressed and `moveDodgerRight()`
   * if the right arrow is pressed. (Check the constants
   * we've declared for you above.)
   * And be sure to use the functions declared below!
   */
   if (e.which === LEFT_ARROW) {
     moveDodgerLeft()
     e.preventDefault()
     e.stopPropagation()
   } else if (e.which === RIGHT_ARROW) {
     moveDodgerRight()
     e.preventDefault()
     e.stopPropagation()
   }
}

function moveDodgerLeft() {
  // implement me!
  /**
   * This function should move DODGER to the left
   * (maybe 4 pixels?). Use window.requestAnimationFrame()!
   */
   let dodgerLeftEdge = positionToInteger(DODGER.style.left)

   if (dodgerLeftEdge !== 0) {
     window.requestAnimationFrame(function () {
       DODGER.style.left = `${dodgerLeftEdge - 4}px`
     })
   }
}

function moveDodgerRight() {
  // implement me!
  /**
   * This function should move DODGER to the right
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
  let dodgerLeftEdge = positionToInteger(DODGER.style.left)

  if (dodgerLeftEdge !== 360) {
    window.requestAnimationFrame(function () {
      DODGER.style.left = `${dodgerLeftEdge + 4}px`
    })
  }
}

/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}

function start() {
  window.addEventListener('keydown', moveDodger)

  START.style.display = 'none'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
