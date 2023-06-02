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
const messageEl = document.querySelector('#message-el')
const cardsEl = document.querySelector('#cards-el')
const sumEl = document.querySelector('#sum-el')
const newCardBtnEl = document.querySelector('#new-card')
const dealerCardEl = document.querySelector('#dealer-cards')
const dealerSumEl = document.querySelector('#dealer-sum')
const playerEl = document.querySelector('#player-el')

playerEl.textContent = player.name + ': $' + player.chips

const genRandomCard = () => {
  let randomCard = Math.floor(Math.random() * 13) + 1
  if (randomCard === 1) {
    return 11
  } else if (randomCard > 10) {
    return 10
  }
  return randomCard
}

const startGame = () => {
  isAlive = true
  let firstCard = genRandomCard()
  let secondCard = genRandomCard()
  cards = [firstCard, secondCard]
  sum = firstCard + secondCard
  renderGame()
  hideBtn('reset-game')
  getDealerHand()
}

const renderGame = () => {
  cardsEl.textContent = 'Cards: '

  for (let i = 0; i < cards.length; i++) {
    cardsEl.textContent += cards[i] + ' '
  }

  sumEl.textContent = 'Sum: ' + sum
  if (sum <= 20) {
    message = 'Would you like another card?'
    showBtn('new-card')
    showBtn('stay')
    hideBtn('start-game')
  } else if (sum === 21) {
    message = 'BLACKJACK, YOU WIN!!!'
    hasBlackJack = true
    hideBtn('new-card')
    hideBtn('stay')
    hideBtn('start-game')
    showBtn('reset-game')
  } else {
    message = 'Sorry, you lose. Better luck next time asshole!'
    isAlive = false
    hideBtn('new-card')
    hideBtn('stay')
    hideBtn('start-game')
    showBtn('reset-game')
  }
  messageEl.textContent = message
}

const newCard = () => {
  if (hasBlackJack === false && isAlive === true) {
    let addCard = genRandomCard()
    cards.push(addCard)
    sum += addCard
    renderGame()
  }
}

const newDealerCard = () => {
  if (hasBlackJack === false && isAlive === true) {
    let addDealerCard = genRandomCard()
    dealerCards.push(addDealerCard)
    dealerSum += addCard
    renderGame()
  }
}

const resetGame = () => {
  message = 'Would you like another card?'
  startGame()
}

const getDealerHand = () => {
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
    hideBtn('new-card')
    hideBtn('stay')
    hideBtn('start-game')
    showBtn('reset')
  }
  messageEl.textContent = message
}

const stay = () => {
  messageEl.textContent = ''
  dealerCardEl.textContent += ' ' + dealerCards[1]
  dealerSumEl.textContent = "Dealer's total: " + dealerSum
    hideBtn('new-card')
    hideBtn('start-game')
  
  if (dealerSum <= 16) {
    dealerCardEl.textContent += ' ' + dealerCards[1]
    newDealerCard()
  }
}

///// Button Functions

const showBtn = elId => {
  let btnEl = document.querySelector(`#${elId}`)
    if (!btnEl.classList.contains('show')) {
    return (btnEl.className += 'show')
  }
}

const hideBtn = elId => {
  let btnEl = document.querySelector(`#${elId}`)
  if (btnEl.classList.contains('show')) {
    return btnEl.classList.remove('show')
  }
}
