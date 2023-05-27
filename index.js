let player = {
  name: 'Jayson',
  chips: 145,
}
let cards = []
let dealerCards = []
let hasBlackJack = false
let isAlive = false
let sum = 0
let dealerSum = 0
let message = ''
let messageEl = document.querySelector('#message-el')
let cardsEl = document.querySelector('#cards-el')
let sumEl = document.querySelector('#sum-el')
let newCardBtnEl = document.querySelector('#new-card')
let dealerCardEl = document.querySelector('#dealer-cards')
let dealerSumEl = document.querySelector('#dealer-sum')

let playerEl = document.querySelector('#player-el')

playerEl.textContent = player.name + ': $' + player.chips

function genRandomCard() {
  let randomCard = Math.floor(Math.random() * 13) + 1
  if (randomCard === 1) {
    return 11
  } else if (randomCard > 10) {
    return 10
  }
  return randomCard
}

function startGame() {
  isAlive = true
  let firstCard = genRandomCard()
  let secondCard = genRandomCard()
  cards = [firstCard, secondCard]
  sum = firstCard + secondCard
  renderGame()
  hideResetBtn()
  getDealerHand()
}

function renderGame() {
  cardsEl.textContent = 'Cards: '

  for (let i = 0; i < cards.length; i++) {
    cardsEl.textContent += cards[i] + ' '
  }

  sumEl.textContent = 'Sum: ' + sum
  if (sum <= 20) {
    message = 'Would you like another card?'
    showNewCardBtn()
    showStayBtn()
    hideStartBtn()
  } else if (sum === 21) {
    message = 'BLACKJACK, YOU WIN!!!'
    hasBlackJack = true
    hideNewCardBtn()
    hideStayBtn()
    showResetBtn()
    hideStartBtn()
  } else {
    message = 'Sorry, you lose. Better luck next time asshole!'
    isAlive = false
    hideNewCardBtn()
    hideStayBtn()
    showResetBtn()
    hideStartBtn()
  }
  messageEl.textContent = message
}

function newCard() {
  if (hasBlackJack === false && isAlive === true) {
    let addCard = genRandomCard()
    cards.push(addCard)
    sum += addCard
    renderGame()
  }
}

function newDealerCard() {
  if (hasBlackJack === false && isAlive === true) {
    let addDealerCard = genRandomCard()
    dealerCards.push(addDealerCard)
    dealerSum += addCard
    renderGame()
  }
}

function resetGame() {
  message = 'Would you like another card?'
  startGame()
}

function getDealerHand() {
  let firstCard = genRandomCard()
  let secondCard = genRandomCard()
  dealerCards = [firstCard, secondCard]
  dealerSum = firstCard + secondCard
  dealerCardEl.textContent = ' ' + firstCard
  dealerSumEl.textContent = "Dealer's total: " + firstCard
  if (dealerSum === 21) {
    message = 'Sorry, you lose. Better luck next time asshole!'
    isAlive = false
    dealerCardEl.textContent = ' ' + firstCard + ' ' + secondCard
    dealerSumEl.textContent = "Dealer's total: " + dealerSum
    hideNewCardBtn()
    hideStayBtn()
    showResetBtn()
    hideStartBtn()
  }
  messageEl.textContent = message
}

function stay() {
  messageEl.textContent = ''
  console.log(dealerSum)
  console.log(dealerCards)
  dealerCardEl.textContent += ' ' + dealerCards[1]
  dealerSumEl.textContent = "Dealer's total: " + dealerSum
  hideNewCardBtn()
  hideStartBtn()
  if (dealerSum <= 16) {
    dealerCardEl.textContent += ' ' + dealerCards[1]
    newDealerCard()
  }
}

///// Button Functions

function showStartBtn() {
  let btnEl = document.querySelector('#start-game')
  if (!btnEl.classList.contains('show')) {
    return (btnEl.className += 'show')
  }
}

function hideStartBtn() {
  let btnEl = document.querySelector('#start-game')
  if (btnEl.classList.contains('show')) {
    return btnEl.classList.remove('show')
  }
}

function showNewCardBtn() {
  let btnEl = document.querySelector('#new-card')
  if (!btnEl.classList.contains('show')) {
    return (btnEl.className += 'show')
  }
}

function hideNewCardBtn() {
  let btnEl = document.querySelector('#new-card')
  if (btnEl.classList.contains('show')) {
    return btnEl.classList.remove('show')
  }
}
function showStayBtn() {
  let btnEl = document.querySelector('#stay')
  if (!btnEl.classList.contains('show')) {
    return (btnEl.className += 'show')
  }
}

function hideStayBtn() {
  let btnEl = document.querySelector('#stay')
  if (btnEl.classList.contains('show')) {
    return btnEl.classList.remove('show')
  }
}
function showResetBtn() {
  let btnEl = document.querySelector('#reset-game')
  if (!btnEl.classList.contains('show')) {
    return (btnEl.className += 'show')
  }
}

function hideResetBtn() {
  let btnEl = document.querySelector('#reset-game')
  if (btnEl.classList.contains('show')) {
    return btnEl.classList.remove('show')
  }
}
