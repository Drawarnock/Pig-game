class Game {
    constructor() {

        this.dice1Element = document.querySelector('.dice1');
        this.dice2Element = document.querySelector('.dice2');
        this.rollBtn = document.querySelector('.btn-roll');
        this.holdBtn = document.querySelector('.btn-hold');
        this.newGameBtn = document.querySelector('.btn-new');

        this.rollBtn.addEventListener('click', this.rollDices.bind(this));
        this.holdBtn.addEventListener('click', this.holdRoundScore.bind(this));
        this.newGameBtn.addEventListener('click', this.startNewGame.bind(this));

        this.init();
    }

    init() {
        this.isGamePlaying = true;
        this.currentActivePlayer = 0;
        this.roundScore = 0;

        this.hideDices();

        this.players = [new Player('Player 1', 0), new Player('Player 2', 1)];

        this.rollBtn.classList.remove('disabled')
        this.rollBtn.disabled = false;
        this.holdBtn.classList.remove('disabled');
        this.holdBtn.disabled = false;

        this.players.forEach((player,index) => {
            player.temporalScoreElement.textContent = 0;
            player.holdScoreElement.textContent = 0;
            player.nameElement.textContent = `Player ${index+1}`;
            player.panel.classList.remove('winner');
            player.panel.classList.remove('active');
        });
        this.players[0].panel.classList.add('active');
    }

    rollDices() {
        if(this.isGamePlaying) {
            const rollDice1Result = Math.ceil(Math.random()*6);
            const rollDice2Result = Math.ceil(Math.random()*6);
            this.showDices();
            this.dice1Element.src = `dice-${rollDice1Result}.png`;
            this.dice2Element.src = `dice-${rollDice2Result}.png`;

            if(rollDice1Result === 1 && rollDice2Result === 1) {
                this.players[this.currentActivePlayer].score = 0;
                this.players[this.currentActivePlayer].holdScoreElement.textContent = 0;
                this.changePlayer();
            } else if(rollDice1Result !== 1 && rollDice2Result !==1 ) {
                this.roundScore += rollDice1Result + rollDice2Result;
                this.players[this.currentActivePlayer].temporalScoreElement.textContent = this.roundScore;
                this.checkScoreOnRoll();
            } else {
                this.changePlayer();
            }
        }
    }

    hideDices() {
        this.dice1Element.style.display = "none";
        this.dice2Element.style.display = "none";
    }
    
    showDices() {
        this.dice1Element.style.display = "block";
        this.dice2Element.style.display = "block";
    } 

    changePlayer() {
        this.currentActivePlayer = this.currentActivePlayer === 0 ? 1 : 0;
        this.roundScore = 0;

        this.players.forEach(player => {
            player.temporalScoreElement.textContent = 0;
            player.panel.classList.toggle('active');
        });
    }

    holdRoundScore() {
        if(this.isGamePlaying) {
            this.players[this.currentActivePlayer].score += this.roundScore;
            this.players[this.currentActivePlayer].holdScoreElement.textContent = this.players[this.currentActivePlayer].score;
            this.checkScoreOnHold();
        }
    }

    checkScoreOnHold() {
        if(this.players[this.currentActivePlayer].score>=20) {
            this.showWinner();
            
        } else {
            this.changePlayer();
        }
    }

    checkScoreOnRoll() {
        if((this.players[this.currentActivePlayer].score + this.roundScore) >=20) {
            this.players[this.currentActivePlayer].score+=this.roundScore;
            this.players[this.currentActivePlayer].holdScoreElement.textContent = this.players[this.currentActivePlayer].score;
            this.showWinner();            
        }
    }

    showWinner() {
        this.players[this.currentActivePlayer].nameElement.textContent = "WINNER!";
        this.players[this.currentActivePlayer].panel.classList.add('winner');
        this.players[this.currentActivePlayer].panel.classList.remove('active');
        this.isGamePlaying = false;
        this.disableButtons();
    }

    disableButtons() {
        this.rollBtn.classList.add('disabled');
        this.holdBtn.classList.add('disabled');
        this.rollBtn.disabled = true;
        this.holdBtn.disabled = true;
    }

    startNewGame() {
        this.init();
    }
};

class Player {
    constructor(name, index) {
        this.temporalScoreElement = document.getElementById(`current-${index}`);
        this.holdScoreElement = document.getElementById(`score-${index}`);
        this.panel = document.querySelector(`.player-${index}-panel`);
        this.nameElement = document.querySelector(`#name-${index}`);
        this.name = name;
        this.score = 0;
    }
};

new Game();