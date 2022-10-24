// Setting values and suits
const SUITS = ["♥", "♦", "♣", "♠"];
const VALUES = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
];

// Deck class for all cards
// Encapsulates anything that deals with a pile of cards
export default class Deck {

    // initialize the cards (objects)
    // Gets cards from fresh deck function output
    // Set them with constructor so other functions in the class can use them
    constructor(cards = freshDeck()) {
        // Cards from freshDeck() = cards that can be used in class
        this.cards = cards;
    }

    // Makes it so we dont need to type "this.cards.length"
    // function is a getter(get) for the length property. (binds the object property to the function_)
    get numberOfCards() {
        return this.cards.length;
    }

    // Takes first card in array, takes off and returns it (shift)
    pop() {
        return this.cards.shift();
    }

    // Adds card to the bottom of array
    push(card) {
        this.cards.push(card);
    }

    shuffle() {
        // Will randomize but not perfectly
        // this.cards.sort((a, b) => Math.random() - .5)
        // Going from back of list(- 1) to the front
        for (let i = this.numberOfCards - 1; i > 0; i--) {

            // Gives placement in index that is somewhere else (Math.random)
            // Makes sure it is an integer (Math.floor)
            // newIndex will be a card we haven't accessed
            const newIndex = Math.floor(Math.random() * (i + 1));

            // Swap the card we are currently on with new card from i
            // Need access to old value before we override it
            const oldValue = this.cards[newIndex];
            this.cards[newIndex] = this.cards[i];
            this.cards[i] = oldValue;
        }
    }
}

// Class for the individual cards
export class Card {
    // Allows for suit and value to be used inside the class
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
    }

    get color() {
        // If it is those suits set to black, if not set to red
        return this.suit === "♣" || this.suit === "♠" ? "black" : "red";
    }

    getHTML() {
        // Creates card div as const
        const card = document.createElement("div");

        //Sets inner html to the suit
        card.innerHTML = this.suit;

        // add the card's color that cards div class
        card.classList.add("card", this.color);

        // add the card's value and suit that cards div class
        card.classList.add(this.value + this.suit);

        // set its data-value to its value and suit
        card.dataset.value = `${this.value}${this.suit}`;

        return card;
    }
}

// Create the Tableau class
class Tableau {

    // Allows for the cards to be used inside the class
    constructor(cards) {
        this.cards = cards;

        // Gets each cardslot from element with tableaus class
        this.cardSlots = document.querySelector(".tableaus");
    }

    // Function to push card to slot based on the id
    pushToSlot(slotId, card) {

        // Set slot based on the slots id
        const slot = document.querySelector(`#slot-${slotId}`);

        // Fill slot with card
        slot.appendChild(card.getHTML());
    }

    // Function to initialize the tableau slots
    initSlots() {
        // For each slot with id
        for (let id in [0, 1, 2, 3, 4, 5, 6]) {
            // Create a slot with div
            const slot = document.createElement("div");
            // Add a class to each slot
            slot.classList.add("tableau", "card-slot");
            // Set the id prop of each slot to the id of
            slot.id = `slot-${id}`;
            // Creat slot in this cardslot
            this.cardSlots.appendChild(slot);
        }
    }

    init() {
        this.initSlots();
        // Makes each column (i++)
        for (let i = 0, k = 0; i < 7; i++) {
            // Each column gets 1 more slot/card than the one prior
            // k is the card / I is the column / k is the slot in the column 
            // (k++) means do it until you un out of cards
            // (j <= i) means if the amount of slots is the same as the column number (column 1 gets 1 card)
            for (let j = 0; j <= i; j++, k++) {
                // the card is the current one being cycled through
                const card = this.cards[k];

                // If it is the last card it is facing the front
                if (i === j) card.front = true;

                // Push this card to the row in question(i)
                this.pushToSlot(i, card);
            }
        }
    }
}

function freshDeck() {
    //flatMap condensenses the array to all 52 cards
    return SUITS.flatMap((suit) => {
        return VALUES.map((value) => {
            // Use the suit in value of each card and push the values through Card class to make each card
            return new Card(suit, value);
        });
    });
}

/* ---------------------------- Solitaire New ---------------- */

const board = document.querySelector(".board");

// Gives the values to cards
const CARD_VALUE_MAP = {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    J: 11,
    Q: 12,
    K: 13,
    A: 1,
};

const stockDeckElement = document.querySelector(".stock-deck");
const stockDeckBase = document.querySelector(".stock");
let tableauDeck, stockDeck;

// Start the game
function startGame() {
    // Creating a brand new deck
    const deck = new Deck();

    // Shuffeling cards in deck
    deck.shuffle();

    const solitaireMidpoint = Math.ceil(deck.numberOfCards - 24);

    tableauDeck = new Deck(deck.cards.slice(0, solitaireMidpoint));

    const a = new Tableau(tableauDeck.cards);
    a.init();

    stockDeck = new Deck(
        deck.cards.slice(solitaireMidpoint, deck.numberOfCards),
    );
}

stockDeckBase.addEventListener("click", () => {
    flipCards();
});

function flipCards() {
    const stockCard = stockDeck.pop();
    stockDeckElement.appendChild(stockCard.getHTML());
}

startGame();


